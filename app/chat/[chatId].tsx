import { useLocalSearchParams } from "expo-router";
import { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import ChatHeader from '@/components/ChatHeader';
import AraProfile from '@/components/AraProfile';
import { useUserChatId } from '@/hooks/useUserChatId';
import { db } from '@/util/instant';
import { id } from '@instantdb/react-native';

type Message = {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
};

// TODO: fetch different info on messages
export default function ChatScreen() {
    const { chatId } = useLocalSearchParams();
    const { userProfile, conversation } = useUserChatId(chatId as string);

    const { data } = db.useQuery(conversation ? {
        messages: {
            sender: {},
            $: {
                where: {
                    conversations: conversation?.id
                }
            }
        }
    } : null)

    const { messages: dbMessages } = data || { messages: [] };
    const messages = dbMessages.map(message => ({
        id: message.id,
        text: message.content,
        isUser: message.sender?.[0]?.id === userProfile?.id,
        timestamp: new Date(message.createdAt),
    }));
    console.log("messages", dbMessages);
    console.log("conversation", conversation);

    const isNewConversation = !conversation && messages.length === 0;
    const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState<Message[]>([
    //     {
    //         id: '1',
    //         text: JSON.stringify(conversation, null, 2),
    //         isUser: false,
    //         timestamp: new Date(),
    //     }, {
    //         id: '2',
    //         text: JSON.stringify(userProfile, null, 2),
    //         isUser: false,
    //         timestamp: new Date(),
    //     },
    // ]);
    const [isTyping, setIsTyping] = useState(false);
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();

    const sendMessage = async (message: Message) => {
        // TODO: not this one!
        const assistantId = "f9d13874-aeaf-4906-b9ee-121c1d947a24";

        if (isNewConversation) {
            // crete the conversation!
            console.log("creating new conversation...");
            const convoId = chatId as string;
            const newMessageId = id();
            const senderId = message.isUser ? userProfile?.id : assistantId;

            await db.transact([
                db.tx.conversations[convoId].update({
                    name: "New Conversation",
                    createdAt: Date.now(),
                    lastMessageAt: Date.now(),
                    isArchived: false,
                }).link({ participants: [userProfile?.id!] }),
                db.tx.messages[newMessageId].update({
                    content: message.text,
                    createdAt: Date.now(),
                    isDeleted: false,
                    isEdited: false,
                }).link({
                    conversations: [convoId],
                    sender: [senderId!]
                }),
                db.tx.conversations[convoId].update({
                    lastMessage: message.text,
                    lastMessageAt: Date.now(),
                })
            ]);
            return;
        }

        if (!conversation) {
            console.log("no conversation found");
            return;
        }

        if (!userProfile?.id) {
            console.log("no userProfile found");
            return;
        }

        const convoId = conversation?.id;
        const newMessageId = id();
        const senderId = message.isUser ? userProfile?.id : assistantId;

        db.transact([
            db.tx.messages[newMessageId].update({
                content: message.text,
                createdAt: Date.now(),
                isDeleted: false,
                isEdited: false,
            }).link({
                conversations: [convoId],
                sender: [senderId]
            }),
            db.tx.conversations[convoId].update({
                lastMessage: message.text,
                lastMessageAt: Date.now(),
            })
        ]);

    }

    const handleSend = () => {
        if (!message.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: message.trim(),
            isUser: true,
            timestamp: new Date(),
        };

        // setMessages(prev => [...prev, userMessage]);
        sendMessage(userMessage);
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
            // setMessages(prev => [...prev, aiMessage]);
            sendMessage(aiMessage);
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

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView className="flex-1 bg-white" edges={['left', 'right', 'bottom', 'top']}>
                <ChatHeader
                    profile={{
                        name: "Ara",
                        subtitle: isTyping ? "typing..." : undefined
                    }}
                    onProfilePress={() => router.push(`/chat/${chatId}/details`)}
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
                    renderItem={({ item }) => (
                        <View className={`flex-row mb-4 items-end ${item.isUser ? 'justify-end' : 'justify-start'}`}>
                            {!item.isUser && (
                                <View className="mr-2 mb-1">
                                    <AraProfile />
                                </View>
                            )}
                            <View
                                className={`max-w-[75%] rounded-2xl p-3 
                                ${item.isUser
                                        ? 'bg-indigo-500 rounded-br-sm'
                                        : 'bg-gray-100 rounded-bl-sm'}`}
                            >
                                <Text className={`text-base leading-5 
                                    ${item.isUser ? 'text-white' : 'text-gray-800'}`}>
                                    {item.text}
                                </Text>
                                <Text className="text-xs text-gray-400 mt-1 self-end">
                                    {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    className="p-4"
                    contentContainerStyle={{ gap: 16 }}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
                />

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View className="flex-row p-3 border-t border-gray-200 bg-white items-center">
                        <TextInput
                            className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 pr-11 text-base text-gray-800 min-h-[40px] max-h-[120px]"
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Message Ara..."
                            placeholderTextColor="#9ca3af"
                            multiline
                            maxLength={1000}
                        />
                        <TouchableOpacity
                            className={`absolute right-5 w-8 h-8 rounded-full justify-center items-center
                                ${message.trim() ? 'bg-indigo-500' : 'bg-gray-200'}`}
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