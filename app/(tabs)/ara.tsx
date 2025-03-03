import { useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';

// Mock chat data
const initialMessages = [
    {
        id: '1',
        text: "Hello! I'm Ara, your AI assistant. How can I help you today?",
        sender: 'ara',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
];

export default function AraScreen() {
    const router = useRouter();
    const [messages, setMessages] = useState(initialMessages);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleSend = () => {
        if (inputText.trim() === '') return;

        // Add user message
        const userMessage = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        // Scroll to bottom
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);

        // Simulate Ara's response after a delay
        setTimeout(() => {
            const araResponse = {
                id: (Date.now() + 1).toString(),
                text: getAraResponse(inputText),
                sender: 'ara',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, araResponse]);
            setIsLoading(false);

            // Scroll to bottom again after response
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);

            // Haptic feedback when response arrives
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }, 1500);
    };

    // Simple mock response function
    const getAraResponse = (input: string) => {
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

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <LinearGradient
                colors={['#121212', '#1a1a2e']}
                style={styles.gradient}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Ara</Text>
                    <Text style={styles.headerSubtitle}>Your AI Assistant</Text>
                </View>

                <ScrollView
                    ref={scrollViewRef}
                    style={styles.messagesContainer}
                    contentContainerStyle={styles.messagesContent}
                >
                    {messages.map((message) => (
                        <View
                            key={message.id}
                            style={[
                                styles.messageBubble,
                                message.sender === 'user' ? styles.userBubble : styles.araBubble
                            ]}
                        >
                            {message.sender === 'ara' && (
                                <LinearGradient
                                    colors={['#8e44ad', '#3498db']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.araGradient}
                                >
                                    <Text style={styles.araInitial}>A</Text>
                                </LinearGradient>
                            )}
                            <View style={styles.messageContent}>
                                <Text style={styles.messageText}>{message.text}</Text>
                                <Text style={styles.messageTime}>{formatTime(message.timestamp)}</Text>
                            </View>
                        </View>
                    ))}

                    {isLoading && (
                        <View style={styles.loadingContainer}>
                            <LinearGradient
                                colors={['#8e44ad', '#3498db']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.araGradient}
                            >
                                <Text style={styles.araInitial}>A</Text>
                            </LinearGradient>
                            <View style={styles.loadingBubble}>
                                <ActivityIndicator size="small" color="#8e44ad" />
                            </View>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.toolbarContainer}>
                    <Pressable
                        style={styles.toolbarButton}
                        onPress={() => router.push('/ara/labs' as any)}
                    >
                        <Ionicons name="flask" size={20} color="white" />
                        <Text style={styles.toolbarButtonText}>Labs</Text>
                    </Pressable>

                    <Pressable
                        style={styles.toolbarButton}
                        onPress={() => router.push('/ara/create' as any)}
                    >
                        <Ionicons name="create" size={20} color="white" />
                        <Text style={styles.toolbarButtonText}>Create</Text>
                    </Pressable>
                </View>

                <BlurView intensity={30} tint="dark" style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ask Ara anything..."
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                        maxLength={1000}
                        returnKeyType="default"
                    />
                    <Pressable
                        style={({ pressed }) => [
                            styles.sendButton,
                            { opacity: pressed ? 0.8 : 1 }
                        ]}
                        onPress={handleSend}
                        disabled={inputText.trim() === '' || isLoading}
                    >
                        <Ionicons
                            name="send"
                            size={20}
                            color={inputText.trim() === '' || isLoading ? 'rgba(255, 255, 255, 0.4)' : 'white'}
                        />
                    </Pressable>
                </BlurView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    header: {
        paddingTop: 16,
        paddingBottom: 16,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
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
    araBubble: {
        alignSelf: 'flex-start',
    },
    araGradient: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    araInitial: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    messageContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        padding: 12,
        paddingBottom: 8,
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
    toolbarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    toolbarButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginHorizontal: 8,
    },
    toolbarButtonText: {
        color: 'white',
        marginLeft: 8,
        fontWeight: '500',
    },
}); 