import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Mock data for conversations
const conversations = [
    {
        id: 'ara',
        name: 'Ara',
        avatar: null,
        isAra: true,
        lastMessage: "Is there anything else you'd like to know about?",
        time: '2m ago',
        unread: 0,
    },
    {
        id: 'user1',
        name: 'Emma Watson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        isAra: false,
        lastMessage: 'Thanks for the recommendation!',
        time: '1h ago',
        unread: 2,
    },
    {
        id: 'user3',
        name: 'Elon Musk',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        isAra: false,
        lastMessage: 'The future of AI is going to be fascinating.',
        time: '3h ago',
        unread: 0,
    },
    {
        id: 'group1',
        name: 'Book Club',
        avatar: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
        isGroup: true,
        isAra: false,
        lastMessage: 'Sarah: Has anyone started reading the new book yet?',
        time: '5h ago',
        unread: 5,
    },
];

// Mock data for requests
const requests = [
    {
        id: 'req1',
        name: 'Taylor Swift',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        message: 'Hi! I saw your post about music and wanted to connect.',
        time: '2d ago',
    },
    {
        id: 'req2',
        name: 'Robert Downey Jr.',
        avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
        message: "Hey there! Your Ara mentioned you're into Marvel movies?",
        time: '3d ago',
    },
];

export default function InboxScreen() {
    const [activeTab, setActiveTab] = useState('conversations');
    const router = useRouter();

    const renderConversationItem = ({ item }: { item: typeof conversations[0] }) => (
        <Pressable
            style={styles.conversationItem}
            onPress={() => router.push(`/chat/${item.id}` as any)}
        >
            {item.isAra ? (
                <LinearGradient
                    colors={['#8e44ad', '#3498db']}
                    style={styles.avatar}
                >
                    <Text style={styles.avatarText}>A</Text>
                </LinearGradient>
            ) : (
                <Image
                    source={{ uri: item.avatar }}
                    style={styles.avatar}
                />
            )}

            <View style={styles.conversationContent}>
                <View style={styles.conversationHeader}>
                    <Text style={styles.conversationName}>
                        {item.name}
                        {item.isGroup && ' (Group)'}
                    </Text>
                    <Text style={styles.conversationTime}>{item.time}</Text>
                </View>
                <View style={styles.conversationFooter}>
                    <Text
                        style={styles.conversationMessage}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.lastMessage}
                    </Text>
                    {item.unread > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadText}>{item.unread}</Text>
                        </View>
                    )}
                </View>
            </View>
        </Pressable>
    );

    const renderRequestItem = ({ item }: { item: typeof requests[0] }) => (
        <View style={styles.requestItem}>
            <Image
                source={{ uri: item.avatar }}
                style={styles.requestAvatar}
            />

            <View style={styles.requestContent}>
                <View style={styles.requestHeader}>
                    <Text style={styles.requestName}>{item.name}</Text>
                    <Text style={styles.requestTime}>{item.time}</Text>
                </View>
                <Text
                    style={styles.requestMessage}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {item.message}
                </Text>
                <View style={styles.requestActions}>
                    <Pressable
                        style={[styles.requestButton, styles.acceptButton]}
                        onPress={() => router.push(`/chat/${item.id}` as any)}
                    >
                        <Text style={styles.acceptButtonText}>Accept</Text>
                    </Pressable>
                    <Pressable style={[styles.requestButton, styles.declineButton]}>
                        <Text style={styles.declineButtonText}>Decline</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.tabsContainer}>
                <Pressable
                    style={[
                        styles.tab,
                        activeTab === 'conversations' && styles.activeTab
                    ]}
                    onPress={() => setActiveTab('conversations')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === 'conversations' && styles.activeTabText
                        ]}
                    >
                        Conversations
                    </Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.tab,
                        activeTab === 'requests' && styles.activeTab
                    ]}
                    onPress={() => setActiveTab('requests')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === 'requests' && styles.activeTabText
                        ]}
                    >
                        Requests
                        {requests.length > 0 && (
                            <Text style={styles.requestCount}> ({requests.length})</Text>
                        )}
                    </Text>
                </Pressable>
            </View>

            {activeTab === 'conversations' ? (
                <FlatList
                    data={conversations}
                    renderItem={renderConversationItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <FlatList
                    data={requests}
                    renderItem={renderRequestItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="mail-outline" size={48} color="rgba(255, 255, 255, 0.3)" />
                            <Text style={styles.emptyText}>No requests at the moment</Text>
                        </View>
                    }
                />
            )}

            <Pressable
                style={styles.newChatButton}
                onPress={() => router.push('/ara' as any)}
            >
                <Ionicons name="chatbubble" size={24} color="white" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    tabsContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#8e44ad',
    },
    tabText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        fontWeight: '500',
    },
    activeTabText: {
        color: 'white',
    },
    requestCount: {
        color: '#8e44ad',
    },
    listContent: {
        padding: 16,
    },
    conversationItem: {
        flexDirection: 'row',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    conversationContent: {
        flex: 1,
        justifyContent: 'center',
    },
    conversationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    conversationName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    conversationTime: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 14,
    },
    conversationFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    conversationMessage: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        flex: 1,
    },
    unreadBadge: {
        backgroundColor: '#8e44ad',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    unreadText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    requestItem: {
        flexDirection: 'row',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    requestAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 12,
    },
    requestContent: {
        flex: 1,
    },
    requestHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    requestName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    requestTime: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 14,
    },
    requestMessage: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        marginBottom: 12,
    },
    requestActions: {
        flexDirection: 'row',
        gap: 8,
    },
    requestButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignItems: 'center',
    },
    acceptButton: {
        backgroundColor: '#8e44ad',
    },
    acceptButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    declineButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    declineButtonText: {
        color: 'white',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    emptyText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 16,
        marginTop: 16,
    },
    newChatButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#8e44ad',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
}); 