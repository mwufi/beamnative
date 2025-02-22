import { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import ChatHeader from '@/components/ChatHeader';

type Message = {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
};

export default function ChatScreen() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm Ara, your AI companion. How can I help you today?",
            isUser: false,
            timestamp: new Date(),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();

    const handleSend = () => {
        if (!message.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: message.trim(),
            isUser: true,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setMessage('');
        setIsTyping(true);

        // Simulate AI response (replace with actual AI integration)
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "I understand you're interested in that. Let me help you explore this topic further. What specific aspects would you like to know more about?",
                isUser: false,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleCallPress = () => {
        // Handle voice call
        console.log('Voice call pressed');
    };

    const handleVideoPress = () => {
        // Handle video call
        console.log('Video call pressed');
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[
            styles.messageContainer,
            item.isUser ? styles.userMessageContainer : styles.aiMessageContainer
        ]}>
            {!item.isUser && (
                <View style={styles.avatar}>
                    <Ionicons name="person-circle" size={32} color="#6366f1" />
                </View>
            )}
            <View style={[
                styles.messageBubble,
                item.isUser ? styles.userMessage : styles.aiMessage
            ]}>
                <Text style={[
                    styles.messageText,
                    item.isUser ? styles.userMessageText : styles.aiMessageText
                ]}>
                    {item.text}
                </Text>
                <Text style={styles.timestamp}>
                    {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </View>
        </View>
    );

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom', 'top']}>
                <ChatHeader
                    profile={{
                        name: "Ara",
                        subtitle: isTyping ? "typing..." : undefined
                    }}
                    onProfilePress={() => console.log('Profile pressed')}
                >
                    <ChatHeader.RightButtons>
                        <TouchableOpacity onPress={handleCallPress}>
                            <Ionicons name="call-outline" size={24} color="#6b7280" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleVideoPress}>
                            <Ionicons name="videocam-outline" size={24} color="#6b7280" />
                        </TouchableOpacity>
                    </ChatHeader.RightButtons>
                </ChatHeader>

                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.messagesList}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Message Ara..."
                            placeholderTextColor="#9ca3af"
                            multiline
                            maxLength={1000}
                        />
                        <TouchableOpacity
                            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
                            onPress={handleSend}
                            disabled={!message.trim()}
                        >
                            <Ionicons
                                name="send"
                                size={20}
                                color={message.trim() ? '#ffffff' : '#9ca3af'}
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: Platform.OS === 'ios' ? 8 : 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        backgroundColor: '#fff',
    },
    backButton: {
        marginRight: 12,
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    typingIndicator: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
    },
    messagesList: {
        padding: 16,
        gap: 16,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-end',
    },
    userMessageContainer: {
        justifyContent: 'flex-end',
    },
    aiMessageContainer: {
        justifyContent: 'flex-start',
    },
    avatar: {
        marginRight: 8,
        marginBottom: 4,
    },
    messageBubble: {
        maxWidth: '75%',
        borderRadius: 20,
        padding: 12,
    },
    userMessage: {
        backgroundColor: '#6366f1',
        borderBottomRightRadius: 4,
    },
    aiMessage: {
        backgroundColor: '#f3f4f6',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    userMessageText: {
        color: '#fff',
    },
    aiMessageText: {
        color: '#1f2937',
    },
    timestamp: {
        fontSize: 10,
        color: '#9ca3af',
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        paddingRight: 44,
        fontSize: 16,
        maxHeight: 120,
        color: '#1f2937',
        minHeight: 40,
    },
    sendButton: {
        position: 'absolute',
        right: 20,
        width: 32,
        height: 32,
        backgroundColor: '#6366f1',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#e5e7eb',
    },
}); 