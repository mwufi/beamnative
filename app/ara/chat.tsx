import { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    Animated,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Audio, AVPlaybackStatus } from 'expo-av';

// Custom hook for haptic feedback that checks platform
const useHaptics = () => {
    const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

    const triggerHaptic = (type: 'success' | 'warning' | 'error' | 'light' | 'medium' | 'heavy') => {
        if (!isMobile) return;

        switch (type) {
            case 'success':
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                break;
            case 'warning':
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                break;
            case 'error':
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                break;
            case 'light':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                break;
            case 'medium':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                break;
            case 'heavy':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                break;
        }
    };

    return { triggerHaptic };
};

// Message types
type MessageType = 'text' | 'image' | 'file' | 'audio';

interface Message {
    id: string;
    type: MessageType;
    content: string;
    sender: string;
    timestamp: Date;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    uri?: string;
    duration?: number; // For audio messages
}

// Mock data for Ara
const ara = {
    id: 'ara',
    name: 'Ara',
    isAra: true,
    avatar: null,
};

// Initial messages
const initialMessages: Message[] = [
    {
        id: '1',
        type: 'text',
        content: "Hello! I'm Ara, your AI assistant. How can I help you today?",
        sender: 'ara',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
];

export default function AraChat() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showMediaOptions, setShowMediaOptions] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
    const [waveformAnimation] = useState(new Animated.Value(0));
    const [isPickerActive, setIsPickerActive] = useState(false);

    const scrollViewRef = useRef<ScrollView>(null);
    const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();
    const { triggerHaptic } = useHaptics();

    useEffect(() => {
        // Scroll to bottom when component mounts
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: false });
        }, 100);

        // Request permissions on native platforms
        if (Platform.OS !== 'web') {
            (async () => {
                try {
                    // Request camera roll permissions
                    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (mediaLibraryStatus !== 'granted') {
                        console.log('Media library permission not granted');
                    }

                    // Request audio recording permissions
                    await Audio.requestPermissionsAsync();
                    await Audio.setAudioModeAsync({
                        allowsRecordingIOS: true,
                        playsInSilentModeIOS: true,
                    });
                } catch (error) {
                    console.error('Error setting up permissions:', error);
                }
            })();
        }

        // Clean up on unmount
        return () => {
            if (recordingTimerRef.current) {
                clearInterval(recordingTimerRef.current);
            }
            if (recording) {
                recording.stopAndUnloadAsync();
            }
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    // Animate waveform when recording
    useEffect(() => {
        if (isRecording) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(waveformAnimation, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(waveformAnimation, {
                        toValue: 0.3,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            waveformAnimation.setValue(0);
        }
    }, [isRecording]);

    const handleSendText = () => {
        if (inputText.trim() === '') return;

        // Prevent sending if we're already loading
        if (isLoading) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'text',
            content: inputText,
            sender: 'user',
            timestamp: new Date(),
        };

        // Store the input text before clearing it
        const textToRespond = inputText;

        // Update UI
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        // Scroll to bottom
        setTimeout(() => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: true });
            }
        }, 100);

        // Simulate response after a delay
        setTimeout(() => {
            try {
                const response: Message = {
                    id: (Date.now() + 1).toString(),
                    type: 'text',
                    content: getResponse(textToRespond),
                    sender: 'ara',
                    timestamp: new Date(),
                };

                setMessages(prev => [...prev, response]);
                setIsLoading(false);

                // Scroll to bottom again after response
                setTimeout(() => {
                    if (scrollViewRef.current) {
                        scrollViewRef.current.scrollToEnd({ animated: true });
                    }
                }, 100);

                // Haptic feedback when response arrives
                triggerHaptic('success');
            } catch (error) {
                console.error('Error generating response:', error);
                setIsLoading(false);
            }
        }, 1500);
    };

    const handleImagePicker = async () => {
        // Prevent multiple picker sessions
        if (isPickerActive) {
            console.log('A picker is already active');
            return;
        }

        setShowMediaOptions(false);
        setIsPickerActive(true);

        try {
            // Check permissions first on iOS
            if (Platform.OS === 'ios') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert(
                        'Permission Required',
                        'We need camera roll permissions to access your photos.',
                        [{ text: 'OK' }]
                    );
                    setIsPickerActive(false);
                    return;
                }
            }

            // Add a small delay to ensure the media options modal is fully closed
            await new Promise(resolve => setTimeout(resolve, 300));

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8,
                // Ensure we don't lose focus on iOS
                presentationStyle: Platform.OS === 'ios' ? ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN : undefined,
            });

            // Reset picker state
            setIsPickerActive(false);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const asset = result.assets[0];
                let fileSize: number | undefined = undefined;

                // Platform-specific file info handling
                if (Platform.OS !== 'web') {
                    try {
                        const fileInfo = await FileSystem.getInfoAsync(asset.uri);
                        fileSize = fileInfo.exists ? fileInfo.size : undefined;
                    } catch (error) {
                        console.error('Error getting file info:', error);
                    }
                } else {
                    // For web, we can use the asset's fileSize if available
                    fileSize = asset.fileSize;
                }

                // Add image message
                const imageMessage: Message = {
                    id: Date.now().toString(),
                    type: 'image',
                    content: 'Image',
                    uri: asset.uri,
                    sender: 'user',
                    timestamp: new Date(),
                    fileSize: fileSize,
                    fileType: 'image',
                };

                setMessages(prev => [...prev, imageMessage]);

                // Scroll to bottom
                setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 100);

                // Simulate response
                setIsLoading(true);
                setTimeout(() => {
                    const response: Message = {
                        id: (Date.now() + 1).toString(),
                        type: 'text',
                        content: "I've received your image. It looks great!",
                        sender: 'ara',
                        timestamp: new Date(),
                    };

                    setMessages(prev => [...prev, response]);
                    setIsLoading(false);

                    // Scroll to bottom again after response
                    setTimeout(() => {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                    }, 100);

                    triggerHaptic('success');
                }, 1500);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert(
                'Error',
                'There was an error selecting the image. Please try again.',
                [{ text: 'OK' }]
            );
            setIsPickerActive(false);
        }
    };

    const handleFilePicker = async () => {
        // Prevent multiple picker sessions
        if (isPickerActive) {
            console.log('A picker is already active');
            return;
        }

        setShowMediaOptions(false);
        setIsPickerActive(true);

        try {
            // Add a small delay to ensure the media options modal is fully closed
            await new Promise(resolve => setTimeout(resolve, 300));

            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
            });

            // Reset picker state
            setIsPickerActive(false);

            if (result.canceled === false && result.assets && result.assets.length > 0) {
                const asset = result.assets[0];
                let fileSize = asset.size;

                // Add file message
                const fileMessage: Message = {
                    id: Date.now().toString(),
                    type: 'file',
                    content: 'File',
                    uri: asset.uri,
                    fileName: asset.name,
                    fileSize: fileSize,
                    fileType: asset.mimeType,
                    sender: 'user',
                    timestamp: new Date(),
                };

                setMessages(prev => [...prev, fileMessage]);

                // Scroll to bottom
                setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 100);

                // Simulate response
                setIsLoading(true);
                setTimeout(() => {
                    const response: Message = {
                        id: (Date.now() + 1).toString(),
                        type: 'text',
                        content: `I've received your file: ${asset.name}`,
                        sender: 'ara',
                        timestamp: new Date(),
                    };

                    setMessages(prev => [...prev, response]);
                    setIsLoading(false);

                    // Scroll to bottom again after response
                    setTimeout(() => {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                    }, 100);

                    triggerHaptic('success');
                }, 1500);
            }
        } catch (error) {
            console.error('Error picking file:', error);
            Alert.alert(
                'Error',
                'There was an error selecting the file. Please try again.',
                [{ text: 'OK' }]
            );
            setIsPickerActive(false);
        }
    };

    const startRecording = async () => {
        // Check if we're on web - audio recording not supported
        if (Platform.OS === 'web') {
            alert('Audio recording is not supported on web. Please use a mobile device for this feature.');
            return;
        }

        try {
            setIsRecording(true);
            setRecordingDuration(0);

            // Start timer for recording duration
            recordingTimerRef.current = setInterval(() => {
                setRecordingDuration(prev => prev + 1);
            }, 1000);

            // Configure recording
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // Create and start recording
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);

            // Haptic feedback when recording starts
            triggerHaptic('medium');

        } catch (err) {
            console.error('Failed to start recording', err);
            setIsRecording(false);
            if (recordingTimerRef.current) {
                clearInterval(recordingTimerRef.current);
            }
        }
    };

    const stopRecording = async () => {
        if (!recording) return;

        try {
            // Stop recording
            await recording.stopAndUnloadAsync();

            // Stop timer
            if (recordingTimerRef.current) {
                clearInterval(recordingTimerRef.current);
            }

            // Get recording URI
            const uri = recording.getURI();
            setAudioUri(uri);

            // Reset recording state
            setRecording(null);
            setIsRecording(false);

            // If we have a URI, send the audio message
            if (uri) {
                const fileInfo = await FileSystem.getInfoAsync(uri);

                // Create audio message
                const audioMessage: Message = {
                    id: Date.now().toString(),
                    type: 'audio',
                    content: 'Audio Message',
                    uri: uri,
                    sender: 'user',
                    timestamp: new Date(),
                    fileSize: fileInfo.exists ? fileInfo.size : undefined,
                    fileType: 'audio',
                    duration: recordingDuration,
                };

                setMessages(prev => [...prev, audioMessage]);

                // Scroll to bottom
                setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 100);

                // Simulate response
                setIsLoading(true);
                setTimeout(() => {
                    const response: Message = {
                        id: (Date.now() + 1).toString(),
                        type: 'text',
                        content: "I've received your voice message. Let me listen to it.",
                        sender: 'ara',
                        timestamp: new Date(),
                    };

                    setMessages(prev => [...prev, response]);
                    setIsLoading(false);

                    // Scroll to bottom again after response
                    setTimeout(() => {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                    }, 100);

                    triggerHaptic('success');
                }, 1500);
            }

        } catch (err) {
            console.error('Failed to stop recording', err);
        }
    };

    const cancelRecording = async () => {
        if (!recording) return;

        try {
            // Stop recording without saving
            await recording.stopAndUnloadAsync();

            // Stop timer
            if (recordingTimerRef.current) {
                clearInterval(recordingTimerRef.current);
            }

            // Reset recording state
            setRecording(null);
            setIsRecording(false);
            setRecordingDuration(0);

            // Haptic feedback for cancellation
            triggerHaptic('warning');

        } catch (err) {
            console.error('Failed to cancel recording', err);
        }
    };

    const playAudio = async (uri: string, messageId: string) => {
        // Check if we're on web - some audio formats might not be supported
        if (Platform.OS === 'web') {
            try {
                // For web, we can use the HTML audio element
                const audioElement = new window.Audio(uri);
                audioElement.play();
                setIsPlaying(prev => ({ ...prev, [messageId]: true }));

                audioElement.onended = () => {
                    setIsPlaying(prev => ({ ...prev, [messageId]: false }));
                };

                return;
            } catch (error) {
                console.error('Error playing audio on web:', error);
                return;
            }
        }

        // Native platforms use Expo AV
        try {
            // Stop any currently playing audio
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
                setSound(null);
            }

            // Load the audio
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: true }
            );
            setSound(newSound);

            // Update playing state
            setIsPlaying(prev => ({ ...prev, [messageId]: true }));

            // Listen for playback status updates
            newSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
                if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
                    // Audio finished playing
                    setIsPlaying(prev => ({ ...prev, [messageId]: false }));
                }
            });

            // Start playing
            await newSound.playAsync();

        } catch (err) {
            console.error('Failed to play audio', err);
            setIsPlaying(prev => ({ ...prev, [messageId]: false }));
        }
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Simple mock response function
    const getResponse = (input: string) => {
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return "Hello there! How can I assist you today?";
        } else if (lowerInput.includes('how are you')) {
            return "I'm doing well, thank you for asking! I'm here to help you with whatever you need.";
        } else if (lowerInput.includes('weather')) {
            return "I don't have real-time weather data, but I can help you find a weather app or website to check the forecast.";
        } else if (lowerInput.includes('recommend') || lowerInput.includes('suggestion')) {
            return "Based on your interests, I'd recommend checking out 'The Midnight Library' by Matt Haig. It's a thought-provoking novel about the choices we make in life.";
        } else if (lowerInput.includes('thank')) {
            return "You're welcome! Feel free to ask if you need anything else.";
        } else {
            return "That's an interesting question. While I don't have all the information right now, I'm designed to learn and help you connect with the world. Is there something specific you'd like to know more about?";
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatFileSize = (bytes?: number) => {
        if (!bytes) return '';

        if (bytes < 1024) {
            return bytes + ' B';
        } else if (bytes < 1024 * 1024) {
            return (bytes / 1024).toFixed(1) + ' KB';
        } else {
            return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        }
    };

    const renderMessage = (message: Message) => {
        const isUser = message.sender === 'user';

        return (
            <View
                key={message.id}
                style={[
                    styles.messageBubble,
                    isUser ? styles.userBubble : styles.otherBubble
                ]}
            >
                {!isUser && (
                    <LinearGradient
                        colors={['#8e44ad', '#3498db']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.messageAvatar}
                    >
                        <Text style={styles.messageAvatarText}>A</Text>
                    </LinearGradient>
                )}
                <View
                    style={[
                        styles.messageContent,
                        isUser ? styles.userMessageContent : styles.otherMessageContent,
                        message.type === 'image' && styles.imageMessageContent
                    ]}
                >
                    {message.type === 'text' && (
                        <Text style={styles.messageText}>{message.content}</Text>
                    )}

                    {message.type === 'image' && message.uri && (
                        <Image
                            source={{ uri: message.uri }}
                            style={styles.imageMessage}
                            resizeMode="cover"
                        />
                    )}

                    {message.type === 'file' && (
                        <View style={styles.fileContainer}>
                            <Ionicons name="document-outline" size={24} color="white" />
                            <View style={styles.fileInfo}>
                                <Text style={styles.fileName} numberOfLines={1}>{message.fileName}</Text>
                                <Text style={styles.fileSize}>{formatFileSize(message.fileSize)}</Text>
                            </View>
                        </View>
                    )}

                    {message.type === 'audio' && message.uri && (
                        <TouchableOpacity
                            style={styles.audioContainer}
                            onPress={() => playAudio(message.uri!, message.id)}
                        >
                            <View style={styles.audioControls}>
                                <Ionicons
                                    name={isPlaying[message.id] ? "pause" : "play"}
                                    size={20}
                                    color="white"
                                />
                                <View style={styles.audioWaveform}>
                                    {[...Array(8)].map((_, i) => (
                                        <View
                                            key={i}
                                            style={[
                                                styles.waveformBar,
                                                { height: 5 + Math.random() * 15 }
                                            ]}
                                        />
                                    ))}
                                </View>
                            </View>
                            <Text style={styles.audioDuration}>
                                {message.duration ? formatDuration(message.duration) : '0:00'}
                            </Text>
                        </TouchableOpacity>
                    )}

                    <Text style={styles.messageTime}>{formatTime(message.timestamp)}</Text>
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <View style={styles.header}>
                <LinearGradient
                    colors={['#8e44ad', '#3498db']}
                    style={styles.avatar}
                >
                    <Text style={styles.avatarText}>A</Text>
                </LinearGradient>
                <View style={styles.headerInfo}>
                    <Text style={styles.headerName}>{ara.name}</Text>
                    <Text style={styles.headerSubtitle}>AI Assistant</Text>
                </View>
                <Pressable
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="close" size={24} color="white" />
                </Pressable>
            </View>

            <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
            >
                {messages.map(renderMessage)}

                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <LinearGradient
                            colors={['#8e44ad', '#3498db']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.messageAvatar}
                        >
                            <Text style={styles.messageAvatarText}>A</Text>
                        </LinearGradient>
                        <View style={styles.loadingBubble}>
                            <ActivityIndicator size="small" color="#8e44ad" />
                        </View>
                    </View>
                )}
            </ScrollView>

            {isRecording ? (
                <BlurView intensity={30} tint="dark" style={styles.recordingContainer}>
                    <View style={styles.recordingContent}>
                        <Animated.View
                            style={[
                                styles.recordingWaveform,
                                { opacity: waveformAnimation }
                            ]}
                        >
                            {[...Array(10)].map((_, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.recordingBar,
                                        {
                                            height: 10 + Math.random() * 20,
                                            marginHorizontal: 2
                                        }
                                    ]}
                                />
                            ))}
                        </Animated.View>
                        <Text style={styles.recordingTimer}>
                            {formatDuration(recordingDuration)}
                        </Text>
                        <View style={styles.recordingButtons}>
                            <TouchableOpacity
                                style={[styles.recordingButton, styles.cancelButton]}
                                onPress={cancelRecording}
                            >
                                <Ionicons name="close" size={24} color="white" />
                                <Text style={styles.recordingButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.recordingButton, styles.sendButton]}
                                onPress={stopRecording}
                            >
                                <Ionicons name="send" size={24} color="white" />
                                <Text style={styles.recordingButtonText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
            ) : (
                <BlurView intensity={30} tint="dark" style={styles.inputContainer}>
                    <TouchableOpacity
                        style={styles.mediaButton}
                        onPress={() => setShowMediaOptions(true)}
                    >
                        <Ionicons name="add" size={24} color="white" />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Message Ara..."
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                        maxLength={1000}
                        returnKeyType="default"
                    />

                    {inputText.trim() === '' ? (
                        <TouchableOpacity
                            style={styles.micButton}
                            onPress={startRecording}
                        >
                            <Ionicons name="mic" size={20} color="white" />
                        </TouchableOpacity>
                    ) : (
                        <Pressable
                            style={({ pressed }) => [
                                styles.sendButton,
                                { opacity: pressed ? 0.8 : 1 }
                            ]}
                            onPress={handleSendText}
                            disabled={isLoading}
                        >
                            <Ionicons
                                name="send"
                                size={20}
                                color={isLoading ? 'rgba(255, 255, 255, 0.4)' : 'white'}
                            />
                        </Pressable>
                    )}
                </BlurView>
            )}

            {/* Media options modal */}
            <Modal
                visible={showMediaOptions}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowMediaOptions(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowMediaOptions(false)}
                >
                    <BlurView intensity={30} tint="dark" style={styles.mediaOptionsContainer}>
                        <TouchableOpacity
                            style={styles.mediaOption}
                            onPress={() => {
                                // Close modal first, then handle with delay
                                setShowMediaOptions(false);
                                setTimeout(() => {
                                    handleImagePicker();
                                }, 300);
                            }}
                        >
                            <Ionicons name="image-outline" size={24} color="white" />
                            <Text style={styles.mediaOptionText}>Photos/Videos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.mediaOption}
                            onPress={() => {
                                // Close modal first, then handle with delay
                                setShowMediaOptions(false);
                                setTimeout(() => {
                                    handleFilePicker();
                                }, 300);
                            }}
                        >
                            <Ionicons name="document-outline" size={24} color="white" />
                            <Text style={styles.mediaOptionText}>Files</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.mediaOption}
                            onPress={() => {
                                setShowMediaOptions(false);
                                // Camera functionality would go here
                                setTimeout(() => {
                                    Alert.alert(
                                        'Coming Soon',
                                        'Camera functionality will be available in a future update.',
                                        [{ text: 'OK' }]
                                    );
                                }, 300);
                            }}
                        >
                            <Ionicons name="camera-outline" size={24} color="white" />
                            <Text style={styles.mediaOptionText}>Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.mediaOption}
                            onPress={() => {
                                setShowMediaOptions(false);
                                setTimeout(() => {
                                    if (Platform.OS === 'web') {
                                        Alert.alert(
                                            'Not Supported',
                                            'Voice messages are not supported on web. Please use a mobile device for this feature.',
                                            [{ text: 'OK' }]
                                        );
                                    } else {
                                        startRecording();
                                    }
                                }, 300);
                            }}
                        >
                            <Ionicons name="mic-outline" size={24} color="white" />
                            <Text style={styles.mediaOptionText}>Voice Message</Text>
                        </TouchableOpacity>
                    </BlurView>
                </TouchableOpacity>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerInfo: {
        flex: 1,
    },
    headerName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContent: {
        padding: 16,
        paddingBottom: 32,
    },
    messageBubble: {
        flexDirection: 'row',
        marginBottom: 16,
        maxWidth: '80%',
    },
    userBubble: {
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
    },
    otherBubble: {
        alignSelf: 'flex-start',
    },
    messageAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    messageAvatarText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    messageContent: {
        borderRadius: 16,
        padding: 12,
        paddingBottom: 8,
    },
    userMessageContent: {
        backgroundColor: '#8e44ad',
    },
    otherMessageContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    imageMessageContent: {
        padding: 4,
        overflow: 'hidden',
    },
    messageText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 4,
    },
    messageTime: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 12,
        alignSelf: 'flex-end',
    },
    imageMessage: {
        width: 200,
        height: 200,
        borderRadius: 12,
        marginBottom: 4,
    },
    fileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    fileInfo: {
        marginLeft: 8,
        flex: 1,
    },
    fileName: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    fileSize: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    loadingBubble: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        padding: 12,
        height: 40,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
    },
    mediaButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    input: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        color: 'white',
        maxHeight: 100,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#8e44ad',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    mediaOptionsContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    mediaOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    mediaOptionText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 12,
    },
    audioContainer: {
        flexDirection: 'column',
        marginBottom: 4,
        width: 200,
    },
    audioControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    audioWaveform: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        height: 20,
    },
    waveformBar: {
        width: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 1,
        borderRadius: 1,
    },
    audioDuration: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
        marginTop: 4,
    },
    micButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#8e44ad',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    recordingContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    recordingContent: {
        alignItems: 'center',
    },
    recordingWaveform: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginBottom: 8,
    },
    recordingBar: {
        width: 4,
        backgroundColor: '#8e44ad',
        borderRadius: 2,
    },
    recordingTimer: {
        color: 'white',
        fontSize: 16,
        marginBottom: 16,
    },
    recordingButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    recordingButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        minWidth: 120,
    },
    cancelButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    recordingButtonText: {
        color: 'white',
        marginLeft: 8,
        fontSize: 16,
    },
}); 