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
    ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Mock data for users
const users = {
    'ara': {
        id: 'ara',
        name: 'Ara',
        isAra: true,
        avatar: null,
    },
    'user1': {
        id: 'user1',
        name: 'Emma Watson',
        isAra: false,
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    'user2': {
        id: 'user2',
        name: 'John Smith',
        isAra: false,
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    'user3': {
        id: 'user3',
        name: 'Elon Musk',
        isAra: false,
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    'todos': {
        id: 'todos',
        name: 'Todos',
        isAra: true,
        avatar: null,
    },
    'followup': {
        id: 'followup',
        name: 'Lord of the Rings',
        isAra: true,
        avatar: null,
    },
    '1': {
        id: '1',
        name: 'The Hobbit: An Unexpected Journey',
        isAra: true,
        avatar: null,
    },
    '2': {
        id: '2',
        name: 'The Fellowship of the Ring',
        isAra: true,
        avatar: null,
    },
};

// Mock initial messages for different chats
const initialMessages = {
    'ara': [
        {
            id: '1',
            text: "Hello! I'm Ara, your AI assistant. How can I help you today?",
            sender: 'ara',
            timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        },
    ],
    'user1': [
        {
            id: '1',
            text: "Hi! I just watched your latest movie. It was amazing!",
            sender: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        },
        {
            id: '2',
            text: "Thank you so much! I'm glad you enjoyed it. What was your favorite part?",
            sender: 'user1',
            timestamp: new Date(Date.now() - 1000 * 60 * 55), // 55 minutes ago
        },
    ],
    'user3': [
        {
            id: '1',
            text: "I've been following your work on AI. It's fascinating!",
            sender: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
        },
        {
            id: '2',
            text: "The future of AI is going to be fascinating. We're just scratching the surface of what's possible.",
            sender: 'user3',
            timestamp: new Date(Date.now() - 1000 * 60 * 175), // 2 hours 55 minutes ago
        },
    ],
    'todos': [
        {
            id: '1',
            text: "I see you have some todos to complete. Would you like me to help you organize them?",
            sender: 'ara',
            timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
        },
    ],
    'followup': [
        {
            id: '1',
            text: "\"Not all those who wander are lost.\" - J.R.R. Tolkien. I noticed you were interested in Lord of the Rings. Would you like more quotes or book recommendations?",
            sender: 'ara',
            timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
        },
    ],
    '1': [
        {
            id: '1',
            text: "I see you're interested in 'The Hobbit: An Unexpected Journey'. It's a great movie! Would you like to know more about it or get similar recommendations?",
            sender: 'ara',
            timestamp: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
        },
    ],
    '2': [
        {
            id: '1',
            text: "I see you're interested in 'The Fellowship of the Ring'. It's a classic book! Would you like to discuss it or get similar book recommendations?",
            sender: 'ara',
            timestamp: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
        },
    ],
};

export default function ChatScreen() {
    const { id } = useLocalSearchParams();
    const chatId = Array.isArray(id) ? id[0] : id;
    const user = users[chatId as keyof typeof users] || users['ara'];

    const [messages, setMessages] = useState(initialMessages[chatId as keyof typeof initialMessages] || []);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const router = useRouter();

    useEffect(() => {
        // Scroll to bottom when component mounts
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: false });
        }, 100);
    }, []);

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

        // Simulate response after a delay
        setTimeout(() => {
            const response = {
                id: (Date.now() + 1).toString(),
                text: getResponse(inputText, user),
                sender: user.id,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, response]);
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
    const getResponse = (input: string, user: typeof users[keyof typeof users]) => {
        const lowerInput = input.toLowerCase();

        if (user.isAra) {
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
            } else if (user.id === 'todos' && (lowerInput.includes('todo') || lowerInput.includes('task'))) {
                return "I can help you manage your todos. Would you like me to remind you about your upcoming tasks or help you create new ones?";
            } else if (user.id === 'followup' && (lowerInput.includes('lord') || lowerInput.includes('tolkien') || lowerInput.includes('ring'))) {
                return "The Lord of the Rings is a masterpiece! Another great quote is: \"All we have to decide is what to do with the time that is given us.\" Would you like more quotes or book recommendations?";
            } else {
                return "That's an interesting question. While I don't have all the information right now, I'm designed to learn and help you connect with the world. Is there something specific you'd like to know more about?";
            }
        } else {
            // For non-Ara users, generate a simple response
            if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                return `Hi there! Nice to chat with you.`;
            } else if (lowerInput.includes('how are you')) {
                return `I'm doing great, thanks for asking! How about you?`;
            } else if (lowerInput.includes('thank')) {
                return `You're welcome! 😊`;
            } else {
                return `That's interesting! I'd love to chat more about that.`;
            }
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
            <View style={styles.header}>
                {user.isAra ? (
                    <LinearGradient
                        colors={['#8e44ad', '#3498db']}
                        style={styles.avatar}
                    >
                        <Text style={styles.avatarText}>A</Text>
                    </LinearGradient>
                ) : (
                    <Image
                        source={{ uri: user.avatar }}
                        style={styles.avatar}
                    />
                )}
                <View style={styles.headerInfo}>
                    <Text style={styles.headerName}>{user.name}</Text>
                    {user.isAra && <Text style={styles.headerSubtitle}>AI Assistant</Text>}
                </View>
                <Pressable
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </Pressable>
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
                            message.sender === 'user' ? styles.userBubble : styles.otherBubble
                        ]}
                    >
                        {message.sender !== 'user' && (
                            user.isAra ? (
                                <LinearGradient
                                    colors={['#8e44ad', '#3498db']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.messageAvatar}
                                >
                                    <Text style={styles.messageAvatarText}>A</Text>
                                </LinearGradient>
                            ) : (
                                <Image
                                    source={{ uri: user.avatar }}
                                    style={styles.messageAvatar}
                                />
                            )
                        )}
                        <View
                            style={[
                                styles.messageContent,
                                message.sender === 'user' ? styles.userMessageContent : styles.otherMessageContent
                            ]}
                        >
                            <Text style={styles.messageText}>{message.text}</Text>
                            <Text style={styles.messageTime}>{formatTime(message.timestamp)}</Text>
                        </View>
                    </View>
                ))}

                {isLoading && (
                    <View style={styles.loadingContainer}>
                        {user.isAra ? (
                            <LinearGradient
                                colors={['#8e44ad', '#3498db']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.messageAvatar}
                            >
                                <Text style={styles.messageAvatarText}>A</Text>
                            </LinearGradient>
                        ) : (
                            <Image
                                source={{ uri: user.avatar }}
                                style={styles.messageAvatar}
                            />
                        )}
                        <View style={styles.loadingBubble}>
                            <ActivityIndicator size="small" color="#8e44ad" />
                        </View>
                    </View>
                )}
            </ScrollView>

            <BlurView intensity={30} tint="dark" style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={`Message ${user.name}...`}
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
}); 