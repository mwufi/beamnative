import React, { useState } from 'react';
import { View, FlatList, StyleSheet, StatusBar, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ChatListItem from '@/components/ChatListItem';

// Temporary mock data - replace with real data later
const suggestedBots = [
    {
        id: 'creative',
        name: 'Creative Assistant',
        description: 'Writing, art, and creative projects',
        icon: 'brush-outline',
    },
    {
        id: 'study',
        name: 'Study Buddy',
        description: 'Homework help and exam prep',
        icon: 'school-outline',
    },
    {
        id: 'coding',
        name: 'Code Helper',
        description: 'Programming and debugging help',
        icon: 'code-slash-outline',
    },
];

const recentChats = [
    {
        id: '1',
        name: 'Ara',
        lastMessage: 'How can I help you today?',
        timestamp: '2m ago',
        isBot: true,
    },
    {
        id: '2',
        name: 'Study Buddy',
        lastMessage: 'Let\'s practice for the exam!',
        timestamp: '1h ago',
        isBot: true,
    },
];

const savedChats = [
    {
        id: '3',
        name: 'Essay Helper',
        lastMessage: 'Your essay outline is ready',
        timestamp: '2d ago',
        isBot: true,
    },
];

type SuggestedBot = {
    id: string;
    name: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
};

export default function InboxScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    const renderSuggestedBot = ({ item }: { item: SuggestedBot }) => (
        <TouchableOpacity style={styles.suggestedBot}>
            <View style={styles.botIconContainer}>
                <Ionicons name={item.icon} size={24} color="#6366f1" />
            </View>
            <View style={styles.botInfo}>
                <Text style={styles.botName}>{item.name}</Text>
                <Text style={styles.botDescription}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
    );

    const renderSectionHeader = (title: string) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    );

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Messages</Text>
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
                            {/* Suggested Bots */}
                            {renderSectionHeader('Suggested Assistants')}
                            <FlatList
                                horizontal
                                data={suggestedBots}
                                renderItem={renderSuggestedBot}
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.suggestedBotsContainer}
                            />

                            {/* Recent Chats */}
                            {renderSectionHeader('Recent')}
                            {recentChats.map(chat => (
                                <ChatListItem key={chat.id} {...chat} />
                            ))}

                            {/* Saved Chats */}
                            {renderSectionHeader('Saved')}
                            {savedChats.map(chat => (
                                <ChatListItem key={chat.id} {...chat} />
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
    sectionHeader: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6366f1',
    },
    suggestedBotsContainer: {
        paddingLeft: 16,
        paddingRight: 8,
        paddingBottom: 16,
    },
    suggestedBot: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        padding: 12,
        borderRadius: 12,
        marginRight: 8,
        width: 280,
    },
    botIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e0e7ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    botInfo: {
        flex: 1,
    },
    botName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 2,
    },
    botDescription: {
        fontSize: 13,
        color: '#6b7280',
    },
}); 