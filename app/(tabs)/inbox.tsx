import React, { useState } from 'react';
import { View, FlatList, StyleSheet, StatusBar, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import ChatListItem from '@/components/ChatListItem';
import AraProfile from '@/components/AraProfile';

// Active chats shown in stories-like view
const activeChats = [
    {
        id: 'new',
        type: 'new',
        name: 'New Chat',
        icon: 'add-outline',
    },
    {
        id: 'ara',
        type: 'bot',
        name: 'Ara',
        isActive: true,
        activeTask: 'Essay Writing',
    },
    {
        id: 'study',
        type: 'bot',
        name: 'Study Buddy',
        isActive: true,
        activeTask: 'Finals Prep',
    },
    {
        id: 'creative',
        type: 'bot',
        name: 'Creative',
        activeTask: 'Writing Story',
    },
];

type Chat = {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    isBot: boolean;
    isActive?: boolean;
    unreadCount?: number;
    isPinned?: boolean;
};

const initialChats: Chat[] = [
    {
        id: '1',
        name: 'Essay Helper',
        lastMessage: 'Let\'s continue working on your college application essay',
        timestamp: '5m ago',
        isBot: true,
        isActive: true,
    },
    {
        id: '2',
        name: 'Study Plan',
        lastMessage: 'Here\'s your personalized study schedule for finals',
        timestamp: '2h ago',
        isBot: true,
        unreadCount: 2,
    },
];

type ActiveChat = typeof activeChats[0];

export default function InboxScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [chats, setChats] = useState<Chat[]>(initialChats);

    const handlePin = async (chatId: string) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === chatId
                    ? { ...chat, isPinned: !chat.isPinned }
                    : chat
            )
        );
    };

    const handleArchive = (chatId: string) => {
        Alert.alert(
            'Archive Chat',
            'Are you sure you want to archive this chat?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Archive',
                    style: 'destructive',
                    onPress: async () => {
                        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        setChats(prevChats =>
                            prevChats.filter(chat => chat.id !== chatId)
                        );
                    },
                },
            ]
        );
    };

    const handleMore = (chatId: string) => {
        // Implement more options menu
        Alert.alert(
            'More Options',
            'What would you like to do?',
            [
                {
                    text: 'Mark as Unread',
                    onPress: () => {
                        setChats(prevChats =>
                            prevChats.map(chat =>
                                chat.id === chatId
                                    ? { ...chat, unreadCount: chat.unreadCount ? 0 : 1 }
                                    : chat
                            )
                        );
                    },
                },
                {
                    text: 'Mute Notifications',
                    onPress: () => {/* Implement mute */ },
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    const renderActiveChat = ({ item }: { item: ActiveChat }) => (
        <TouchableOpacity style={styles.activeChat}>
            <View style={[
                styles.activeChatAvatar,
                item.type === 'new' && styles.newChatAvatar,
                item.isActive && styles.activeChatAvatarActive
            ]}>
                {item.type === 'new' ? (
                    <Ionicons name="add" size={24} color="#6366f1" />
                ) : (
                    <AraProfile size={52} />
                )}
                {item.isActive && (
                    <View style={styles.activeIndicator} />
                )}
            </View>
            <Text style={styles.activeChatName} numberOfLines={1}>
                {item.name}
            </Text>
            {item.activeTask && (
                <Text style={styles.activeChatTask} numberOfLines={1}>
                    {item.activeTask}
                </Text>
            )}
        </TouchableOpacity>
    );

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Chats</Text>
                    <View style={styles.headerButtons}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="create-outline" size={24} color="#1f2937" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#9ca3af" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search messages"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#9ca3af"
                    />
                </View>

                <FlatList
                    data={[]}
                    ListHeaderComponent={
                        <>
                            {/* Active Chats */}
                            <FlatList
                                horizontal
                                data={activeChats}
                                renderItem={renderActiveChat}
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.activeChatsContainer}
                            />

                            {/* Recent Chats */}
                            <View style={styles.divider} />
                            {chats.map(chat => (
                                <ChatListItem
                                    key={chat.id}
                                    {...chat}
                                    onPin={() => handlePin(chat.id)}
                                    onArchive={() => handleArchive(chat.id)}
                                    onMore={() => handleMore(chat.id)}
                                />
                            ))}
                        </>
                    }
                    renderItem={() => null}
                />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1f2937',
    },
    headerButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        padding: 8,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        marginHorizontal: 16,
        marginBottom: 16,
        paddingHorizontal: 12,
        borderRadius: 12,
        height: 40,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1f2937',
    },
    activeChatsContainer: {
        paddingLeft: 16,
        paddingRight: 8,
        paddingVertical: 8,
    },
    activeChat: {
        alignItems: 'center',
        marginRight: 16,
        width: 72,
    },
    activeChatAvatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
        borderWidth: 2,
        borderColor: '#e5e7eb',
    },
    newChatAvatar: {
        backgroundColor: '#e0e7ff',
        borderColor: '#c7d2fe',
    },
    activeChatAvatarActive: {
        borderColor: '#6366f1',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#10b981',
        borderWidth: 2,
        borderColor: '#fff',
    },
    activeChatName: {
        fontSize: 12,
        fontWeight: '500',
        color: '#1f2937',
        textAlign: 'center',
        marginBottom: 1,
    },
    activeChatTask: {
        fontSize: 11,
        color: '#6b7280',
        textAlign: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#f3f4f6',
        marginVertical: 8,
    },
}); 