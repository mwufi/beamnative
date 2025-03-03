import { StyleSheet, ScrollView, View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Mock data for posts
const posts = [
    {
        id: '1',
        user: {
            id: 'user1',
            name: 'Emma Watson',
            username: 'emmawatson',
            verified: true,
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            famous: true,
        },
        content: 'Just finished reading an amazing book on sustainable fashion. So inspired to make changes in my wardrobe!',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
        likes: 15243,
        comments: 1832,
        time: '2h ago',
    },
    {
        id: '2',
        user: {
            id: 'user2',
            name: 'John Smith',
            username: 'johnsmith',
            verified: false,
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            famous: false,
        },
        content: 'Beautiful sunset at the beach today! 🌅',
        image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3Vuc2V0JTIwYmVhY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
        likes: 42,
        comments: 5,
        time: '5h ago',
    },
    {
        id: '3',
        user: {
            id: 'user3',
            name: 'Elon Musk',
            username: 'elonmusk',
            verified: true,
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
            famous: true,
        },
        content: 'Working on some exciting new AI developments. The future is going to be wild!',
        image: null,
        likes: 52891,
        comments: 7432,
        time: '1d ago',
    },
    {
        id: '4',
        user: {
            id: 'user4',
            name: 'Sarah Johnson',
            username: 'sarahj',
            verified: false,
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
            famous: false,
        },
        content: 'Just got my new plant babies! 🌱 Any tips for a beginner plant parent?',
        image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGxhbnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
        likes: 87,
        comments: 23,
        time: '1d ago',
    },
];

export default function DiscoverScreen() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Discover</Text>
                <Pressable style={styles.searchButton}>
                    <Ionicons name="search" size={24} color="white" />
                </Pressable>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.storiesContainer}
                contentContainerStyle={styles.storiesContent}
            >
                {posts.map(post => (
                    <Pressable
                        key={post.id}
                        style={styles.storyItem}
                        onPress={() => router.push(`/chat/${post.user.id}` as any)}
                    >
                        <LinearGradient
                            colors={['#8e44ad', '#3498db']}
                            style={styles.storyRing}
                        >
                            <Image
                                source={{ uri: post.user.avatar }}
                                style={styles.storyAvatar}
                            />
                        </LinearGradient>
                        <Text style={styles.storyUsername}>{post.user.username}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            {posts.map(post => (
                <View key={post.id} style={styles.postContainer}>
                    <View style={styles.postHeader}>
                        <Pressable
                            style={styles.postUser}
                            onPress={() => router.push(`/chat/${post.user.id}` as any)}
                        >
                            <Image
                                source={{ uri: post.user.avatar }}
                                style={styles.postAvatar}
                            />
                            <View>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.postName}>{post.user.name}</Text>
                                    {post.user.verified && (
                                        <Ionicons name="checkmark-circle" size={16} color="#3498db" />
                                    )}
                                </View>
                                <Text style={styles.postUsername}>@{post.user.username}</Text>
                            </View>
                        </Pressable>
                        <Text style={styles.postTime}>{post.time}</Text>
                    </View>

                    <Text style={styles.postContent}>{post.content}</Text>

                    {post.image && (
                        <Image
                            source={{ uri: post.image }}
                            style={styles.postImage}
                            resizeMode="cover"
                        />
                    )}

                    <View style={styles.postActions}>
                        <Pressable style={styles.actionButton}>
                            <Ionicons name="heart-outline" size={24} color="white" />
                            <Text style={styles.actionText}>
                                {post.likes > 1000 ? `${(post.likes / 1000).toFixed(1)}K` : post.likes}
                            </Text>
                        </Pressable>

                        <Pressable style={styles.actionButton}>
                            <Ionicons name="chatbubble-outline" size={22} color="white" />
                            <Text style={styles.actionText}>
                                {post.comments > 1000 ? `${(post.comments / 1000).toFixed(1)}K` : post.comments}
                            </Text>
                        </Pressable>

                        <Pressable style={styles.actionButton}>
                            <Ionicons name="share-outline" size={24} color="white" />
                        </Pressable>
                    </View>

                    <Pressable
                        style={styles.chatButton}
                        onPress={() => router.push(`/chat/${post.user.id}` as any)}
                    >
                        <Text style={styles.chatButtonText}>Chat with {post.user.name.split(' ')[0]}</Text>
                        <Ionicons name="chatbubble" size={16} color="white" />
                    </Pressable>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    contentContainer: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    searchButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    storiesContainer: {
        marginBottom: 16,
    },
    storiesContent: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    storyItem: {
        alignItems: 'center',
        marginRight: 16,
    },
    storyRing: {
        width: 68,
        height: 68,
        borderRadius: 34,
        justifyContent: 'center',
        alignItems: 'center',
    },
    storyAvatar: {
        width: 62,
        height: 62,
        borderRadius: 31,
        borderWidth: 2,
        borderColor: '#121212',
    },
    storyUsername: {
        color: 'white',
        fontSize: 12,
        marginTop: 4,
    },
    postContainer: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        paddingBottom: 16,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    postUser: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    postName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    postUsername: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
    },
    postTime: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
    },
    postContent: {
        color: 'white',
        fontSize: 16,
        lineHeight: 22,
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    postImage: {
        width: '100%',
        height: 300,
        marginBottom: 12,
    },
    postActions: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
    },
    actionText: {
        color: 'white',
        marginLeft: 6,
        fontSize: 14,
    },
    chatButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginHorizontal: 16,
        gap: 8,
    },
    chatButtonText: {
        color: 'white',
        fontWeight: '500',
    },
}); 