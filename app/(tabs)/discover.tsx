import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

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

// Mock data for events
const events = [
    {
        id: 'event1',
        title: 'Book Club: "The Midnight Library"',
        description: 'Join us for a discussion of Matt Haig\'s bestseller about the choices we make in life.',
        date: 'Tomorrow, 7:00 PM',
        location: 'Virtual Event',
        image: 'https://m.media-amazon.com/images/I/81tCtHFtOgL._AC_UF1000,1000_QL80_.jpg',
        participants: 24,
        host: {
            name: 'Sarah Johnson',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        }
    },
    {
        id: 'event2',
        title: 'Photography Workshop',
        description: 'Learn the basics of composition and lighting in this beginner-friendly workshop.',
        date: 'Saturday, 2:00 PM',
        location: 'Central Park, NYC',
        image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
        participants: 12,
        host: {
            name: 'Michael Chen',
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        }
    },
    {
        id: 'event3',
        title: 'Ara\'s 1st Birthday Bash!',
        description: 'Join us for special rewards and surprises as we celebrate Ara\'s first year!',
        date: 'Next Friday, 6:00 PM',
        location: 'Virtual Event',
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlydGhkYXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
        participants: 156,
        host: {
            name: 'Ara Team',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        }
    },
];

// Mock data for challenges
const challenges = [
    {
        id: 'challenge1',
        title: 'Book Lover',
        description: 'Have a meaningful conversation about books with 3 people',
        progress: 1,
        total: 3,
        reward: 'Bookworm Badge',
        daysLeft: 5,
        participants: 1243,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 'challenge2',
        title: 'Social Butterfly',
        description: 'Make 3 new friends this week',
        progress: 2,
        total: 3,
        reward: 'Connection Master Badge',
        daysLeft: 3,
        participants: 876,
        image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZW5kc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 'challenge3',
        title: 'Fitness Fanatic',
        description: 'Log 5 workouts in one week',
        progress: 3,
        total: 5,
        reward: 'Fitness Enthusiast Badge',
        daysLeft: 4,
        participants: 2156,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
];

export default function DiscoverScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('feed');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'feed':
                return renderFeedContent();
            case 'events':
                return renderEventsContent();
            case 'challenges':
                return renderChallengesContent();
            default:
                return renderFeedContent();
        }
    };

    const renderFeedContent = () => (
        <>
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
        </>
    );

    const renderEventsContent = () => (
        <View style={styles.eventsContainer}>
            {events.map(event => (
                <Pressable
                    key={event.id}
                    style={styles.eventCard}
                    onPress={() => router.push(`/events/details/${event.id}` as any)}
                >
                    <Image
                        source={{ uri: event.image }}
                        style={styles.eventImage}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.eventGradient}
                    >
                        <View style={styles.eventInfo}>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            <Text style={styles.eventDescription} numberOfLines={2}>{event.description}</Text>

                            <View style={styles.eventMeta}>
                                <View style={styles.eventMetaItem}>
                                    <Ionicons name="calendar" size={16} color="white" />
                                    <Text style={styles.eventMetaText}>{event.date}</Text>
                                </View>
                                <View style={styles.eventMetaItem}>
                                    <Ionicons name="location" size={16} color="white" />
                                    <Text style={styles.eventMetaText}>{event.location}</Text>
                                </View>
                            </View>

                            <View style={styles.eventFooter}>
                                <View style={styles.hostInfo}>
                                    <Image
                                        source={{ uri: event.host.avatar }}
                                        style={styles.hostAvatar}
                                    />
                                    <Text style={styles.hostName}>By {event.host.name}</Text>
                                </View>
                                <View style={styles.participantsInfo}>
                                    <Ionicons name="people" size={16} color="white" />
                                    <Text style={styles.participantsText}>{event.participants}</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </Pressable>
            ))}

            <Pressable
                style={styles.createEventButton}
                onPress={() => router.push('/events/create' as any)}
            >
                <LinearGradient
                    colors={['#8e44ad', '#3498db']}
                    style={styles.createEventGradient}
                >
                    <Ionicons name="add" size={24} color="white" />
                    <Text style={styles.createEventText}>Create Event</Text>
                </LinearGradient>
            </Pressable>
        </View>
    );

    const renderChallengesContent = () => (
        <View style={styles.challengesContainer}>
            {challenges.map(challenge => (
                <Pressable
                    key={challenge.id}
                    style={styles.challengeCard}
                    onPress={() => router.push(`/challenges/details/${challenge.id}` as any)}
                >
                    <Image
                        source={{ uri: challenge.image }}
                        style={styles.challengeImage}
                    />
                    <View style={styles.challengeContent}>
                        <View style={styles.challengeHeader}>
                            <Text style={styles.challengeTitle}>{challenge.title}</Text>
                            <View style={styles.challengeBadge}>
                                <Ionicons name="trophy" size={14} color="#FFD700" />
                                <Text style={styles.challengeBadgeText}>{challenge.reward}</Text>
                            </View>
                        </View>

                        <Text style={styles.challengeDescription}>{challenge.description}</Text>

                        <View style={styles.progressContainer}>
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${(challenge.progress / challenge.total) * 100}%` }
                                    ]}
                                />
                            </View>
                            <Text style={styles.progressText}>
                                {challenge.progress}/{challenge.total} completed
                            </Text>
                        </View>

                        <View style={styles.challengeFooter}>
                            <Text style={styles.daysLeft}>{challenge.daysLeft} days left</Text>
                            <View style={styles.participantsInfo}>
                                <Ionicons name="people" size={16} color="white" />
                                <Text style={styles.participantsText}>{challenge.participants}</Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
            ))}
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Discover</Text>
                <Pressable style={styles.searchButton}>
                    <Ionicons name="search" size={24} color="white" />
                </Pressable>
            </View>

            <View style={styles.tabContainer}>
                <Pressable
                    style={[styles.tabButton, activeTab === 'feed' && styles.activeTabButton]}
                    onPress={() => setActiveTab('feed')}
                >
                    <Text style={[styles.tabText, activeTab === 'feed' && styles.activeTabText]}>Feed</Text>
                </Pressable>
                <Pressable
                    style={[styles.tabButton, activeTab === 'events' && styles.activeTabButton]}
                    onPress={() => setActiveTab('events')}
                >
                    <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>Events</Text>
                </Pressable>
                <Pressable
                    style={[styles.tabButton, activeTab === 'challenges' && styles.activeTabButton]}
                    onPress={() => setActiveTab('challenges')}
                >
                    <Text style={[styles.tabText, activeTab === 'challenges' && styles.activeTabText]}>Challenges</Text>
                </Pressable>
            </View>

            {renderTabContent()}
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
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        padding: 4,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 16,
    },
    activeTabButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    tabText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '500',
    },
    activeTabText: {
        color: 'white',
        fontWeight: 'bold',
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
    eventsContainer: {
        paddingHorizontal: 16,
        gap: 16,
    },
    eventCard: {
        height: 200,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
    },
    eventImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    eventGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    eventInfo: {
        padding: 16,
    },
    eventTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    eventDescription: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        marginBottom: 8,
    },
    eventMeta: {
        flexDirection: 'row',
        marginBottom: 8,
        gap: 16,
    },
    eventMetaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    eventMetaText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
    },
    eventFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hostInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    hostAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    hostName: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
    },
    participantsInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    participantsText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
    },
    createEventButton: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
    },
    createEventGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        gap: 8,
    },
    createEventText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    challengesContainer: {
        paddingHorizontal: 16,
        gap: 16,
    },
    challengeCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
    },
    challengeImage: {
        width: 100,
        height: 150,
    },
    challengeContent: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    challengeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    challengeTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    challengeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        gap: 4,
    },
    challengeBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '500',
    },
    challengeDescription: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        marginBottom: 12,
    },
    progressContainer: {
        marginBottom: 12,
    },
    progressBar: {
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 3,
        marginBottom: 4,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4cd964',
        borderRadius: 3,
    },
    progressText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
    challengeFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    daysLeft: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
}); 