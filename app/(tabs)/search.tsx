import { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

type Message = {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
};

export default function SearchScreen() {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSearch = () => {
        if (!query.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: query,
            isUser: true,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setQuery('');
        setIsTyping(true);

        // Simulate AI response (replace with actual AI integration)
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm here to help! What would you like to know?",
                isUser: false,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[
            styles.messageContainer,
            item.isUser ? styles.userMessage : styles.aiMessage
        ]}>
            <View style={styles.messageBubble}>
                <Text style={[
                    styles.messageText,
                    item.isUser ? styles.userMessageText : styles.aiMessageText
                ]}>
                    {item.text}
                </Text>
            </View>
        </View>
    );

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#6b7280" />
                    <TextInput
                        style={styles.searchInput}
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Ask anything..."
                        placeholderTextColor="#9ca3af"
                        onSubmitEditing={handleSearch}
                        returnKeyType="send"
                    />
                </View>

                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.messagesList}
                    inverted={false}
                />

                {isTyping && (
                    <View style={styles.typingIndicator}>
                        <Text style={styles.typingText}>Ara is typing...</Text>
                    </View>
                )}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        backgroundColor: '#fff',
        gap: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1f2937',
    },
    messagesList: {
        padding: 16,
        gap: 16,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    aiMessage: {
        justifyContent: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    userMessageText: {
        color: '#fff',
        backgroundColor: '#6366f1',
        borderRadius: 16,
        padding: 12,
    },
    aiMessageText: {
        color: '#1f2937',
        backgroundColor: '#f3f4f6',
        borderRadius: 16,
        padding: 12,
    },
    typingIndicator: {
        padding: 16,
        backgroundColor: '#f9fafb',
    },
    typingText: {
        color: '#6b7280',
        fontSize: 14,
    },
}); 