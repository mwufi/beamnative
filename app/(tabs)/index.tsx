import { StyleSheet, ScrollView, View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useState } from 'react';

// Mock data for the cards
const todoItems = [
    { id: '1', text: 'Finish project proposal', completed: false },
    { id: '2', text: 'Call mom', completed: false },
    { id: '3', text: 'Buy groceries', completed: true },
];

const recommendations = [
    {
        id: '1',
        title: 'The Hobbit: An Unexpected Journey',
        type: 'movie',
        image: 'https://m.media-amazon.com/images/M/MV5BMTcwNTE4MTUxMl5BMl5BanBnXkFtZTcwMDIyODM4OA@@._V1_SX300.jpg'
    },
    {
        id: '2',
        title: 'The Fellowship of the Ring',
        type: 'book',
        image: 'https://m.media-amazon.com/images/I/81EtUYPcuUL._AC_UF1000,1000_QL80_.jpg'
    },
];

const updates = [
    { id: '1', name: 'Sarah', message: 'Just posted a new photo', time: '2h ago' },
    { id: '2', name: 'Mike', message: 'Started a new job at Google', time: '5h ago' },
];

const followUps = [
    {
        id: '1',
        title: 'Lord of the Rings Quote',
        content: '"Not all those who wander are lost." - J.R.R. Tolkien',
        type: 'quote'
    },
];

// New data for additional cards
const weeklyChallenge = {
    id: 'challenge1',
    title: 'Book Lover',
    description: 'Have a meaningful conversation about books with 3 people',
    progress: 1,
    total: 3,
    reward: 'Bookworm Badge',
    daysLeft: 5
};

const upcomingEvent = {
    id: 'event1',
    title: 'Book Club: "The Midnight Library"',
    date: 'Tomorrow, 7:00 PM',
    participants: 24,
    image: 'https://m.media-amazon.com/images/I/81tCtHFtOgL._AC_UF1000,1000_QL80_.jpg'
};

const learningPath = {
    id: 'path1',
    title: 'Spanish for Beginners',
    progress: 35,
    nextLesson: 'Common Phrases',
    timeEstimate: '15 min',
    image: 'https://images.unsplash.com/photo-1551279880-032b60d8f6be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BhbmlzaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
};

// Check if there's an app-wide event
const hasAppEvent = true;
const appEvent = {
    id: 'app-event1',
    title: "Ara's 1st Birthday Bash!",
    description: 'Join us for special rewards and surprises',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlydGhkYXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
};

export default function HomeScreen() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {hasAppEvent && (
                <Pressable
                    style={styles.appEventBanner}
                    onPress={() => router.push('/events/app-event' as any)}
                >
                    <Image
                        source={{ uri: appEvent.image }}
                        style={styles.appEventImage}
                    />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.7)', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.appEventGradient}
                    >
                        <View style={styles.appEventContent}>
                            <Text style={styles.appEventTitle}>{appEvent.title}</Text>
                            <Text style={styles.appEventDescription}>{appEvent.description}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="white" />
                    </LinearGradient>
                </Pressable>
            )}

            <Text style={styles.greeting}>Hello, User</Text>

            {/* Todo Card */}
            <Pressable
                style={styles.card}
                onPress={() => router.push('/chat/todos' as any)}
            >
                <LinearGradient
                    colors={['#2c3e50', '#1a1a2e']}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Todos</Text>
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </View>
                    <View style={styles.todoList}>
                        {todoItems.map(item => (
                            <View key={item.id} style={styles.todoItem}>
                                <Ionicons
                                    name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                                    size={20}
                                    color={item.completed ? "#4cd964" : "white"}
                                />
                                <Text
                                    style={[
                                        styles.todoText,
                                        item.completed && styles.completedTodo
                                    ]}
                                >
                                    {item.text}
                                </Text>
                            </View>
                        ))}
                    </View>
                </LinearGradient>
            </Pressable>

            {/* Weekly Challenge Card */}
            <Pressable
                style={styles.card}
                onPress={() => router.push('/challenges/current' as any)}
            >
                <LinearGradient
                    colors={['#8e44ad', '#5b2c6f']}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Weekly Challenge</Text>
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </View>
                    <View style={styles.challengeContent}>
                        <View style={styles.challengeInfo}>
                            <Text style={styles.challengeName}>{weeklyChallenge.title}</Text>
                            <Text style={styles.challengeDescription}>{weeklyChallenge.description}</Text>
                            <View style={styles.progressContainer}>
                                <View style={styles.progressBar}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            { width: `${(weeklyChallenge.progress / weeklyChallenge.total) * 100}%` }
                                        ]}
                                    />
                                </View>
                                <Text style={styles.progressText}>
                                    {weeklyChallenge.progress}/{weeklyChallenge.total} completed
                                </Text>
                            </View>
                        </View>
                        <View style={styles.challengeMeta}>
                            <View style={styles.rewardBadge}>
                                <Ionicons name="trophy" size={16} color="#FFD700" />
                                <Text style={styles.rewardText}>{weeklyChallenge.reward}</Text>
                            </View>
                            <Text style={styles.daysLeft}>{weeklyChallenge.daysLeft} days left</Text>
                        </View>
                    </View>
                </LinearGradient>
            </Pressable>

            {/* You might like Card */}
            <Pressable
                style={styles.card}
                onPress={() => router.push('/recommendations' as any)}
            >
                <LinearGradient
                    colors={['#4a69bd', '#1e3799']}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>You might like</Text>
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendationScroll}>
                        {recommendations.map(item => (
                            <Pressable
                                key={item.id}
                                style={styles.recommendationItem}
                                onPress={() => router.push(`/chat/${item.id}` as any)}
                            >
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.recommendationImage}
                                />
                                <Text style={styles.recommendationTitle}>{item.title}</Text>
                                <Text style={styles.recommendationType}>{item.type}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </LinearGradient>
            </Pressable>

            {/* Upcoming Event Card */}
            <Pressable
                style={styles.card}
                onPress={() => router.push('/events/details' as any)}
            >
                <LinearGradient
                    colors={['#2980b9', '#2c3e50']}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Upcoming Event</Text>
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </View>
                    <View style={styles.eventContent}>
                        <Image
                            source={{ uri: upcomingEvent.image }}
                            style={styles.eventImage}
                        />
                        <View style={styles.eventInfo}>
                            <Text style={styles.eventTitle}>{upcomingEvent.title}</Text>
                            <View style={styles.eventMeta}>
                                <View style={styles.eventMetaItem}>
                                    <Ionicons name="calendar" size={16} color="white" />
                                    <Text style={styles.eventMetaText}>{upcomingEvent.date}</Text>
                                </View>
                                <View style={styles.eventMetaItem}>
                                    <Ionicons name="people" size={16} color="white" />
                                    <Text style={styles.eventMetaText}>{upcomingEvent.participants} attending</Text>
                                </View>
                            </View>
                            <Pressable style={styles.joinButton}>
                                <Text style={styles.joinButtonText}>Join Event</Text>
                            </Pressable>
                        </View>
                    </View>
                </LinearGradient>
            </Pressable>

            {/* What's happening Card */}
            <Pressable
                style={styles.card}
                onPress={() => router.push('/discover' as any)}
            >
                <LinearGradient
                    colors={['#6a5acd', '#483d8b']}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>What's happening</Text>
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </View>
                    <View style={styles.updatesList}>
                        {updates.map(item => (
                            <View key={item.id} style={styles.updateItem}>
                                <View style={styles.updateAvatar}>
                                    <Text style={styles.updateAvatarText}>{item.name[0]}</Text>
                                </View>
                                <View style={styles.updateContent}>
                                    <Text style={styles.updateName}>{item.name}</Text>
                                    <Text style={styles.updateMessage}>{item.message}</Text>
                                </View>
                                <Text style={styles.updateTime}>{item.time}</Text>
                            </View>
                        ))}
                    </View>
                </LinearGradient>
            </Pressable>

            {/* Continue Learning Card */}
            <Pressable
                style={styles.card}
                onPress={() => router.push('/learning/path' as any)}
            >
                <LinearGradient
                    colors={['#16a085', '#2c3e50']}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Continue Learning</Text>
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </View>
                    <View style={styles.learningContent}>
                        <Image
                            source={{ uri: learningPath.image }}
                            style={styles.learningImage}
                        />
                        <View style={styles.learningInfo}>
                            <Text style={styles.learningTitle}>{learningPath.title}</Text>
                            <View style={styles.progressContainer}>
                                <View style={styles.progressBar}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            { width: `${learningPath.progress}%` }
                                        ]}
                                    />
                                </View>
                                <Text style={styles.progressText}>{learningPath.progress}% complete</Text>
                            </View>
                            <View style={styles.nextLessonContainer}>
                                <Text style={styles.nextLessonLabel}>Next: {learningPath.nextLesson}</Text>
                                <Text style={styles.timeEstimate}>{learningPath.timeEstimate}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </Pressable>

            {/* Follow ups from Ara Card */}
            <Pressable
                style={styles.card}
                onPress={() => router.push('/chat/followup' as any)}
            >
                <LinearGradient
                    colors={['#8e44ad', '#5b2c6f']}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>From Ara</Text>
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </View>
                    <View style={styles.followUpsList}>
                        {followUps.map(item => (
                            <View key={item.id} style={styles.followUpItem}>
                                <Text style={styles.followUpTitle}>{item.title}</Text>
                                <Text style={styles.followUpContent}>{item.content}</Text>
                                <Text style={styles.followUpType}>{item.type}</Text>
                            </View>
                        ))}
                    </View>
                </LinearGradient>
            </Pressable>

            {/* See more recommendations button */}
            <Pressable
                style={styles.seeMoreButton}
                onPress={() => router.push('/recommendations' as any)}
            >
                <LinearGradient
                    colors={['#2c3e50', '#1a1a2e']}
                    style={styles.seeMoreGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.seeMoreText}>See more recommendations</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                </LinearGradient>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    appEventBanner: {
        height: 100,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
    },
    appEventImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    appEventGradient: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    appEventContent: {
        flex: 1,
    },
    appEventTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    appEventDescription: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    card: {
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardGradient: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    todoList: {
        gap: 8,
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    todoText: {
        color: 'white',
        fontSize: 16,
    },
    completedTodo: {
        textDecorationLine: 'line-through',
        opacity: 0.7,
    },
    challengeContent: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 12,
        padding: 12,
    },
    challengeInfo: {
        marginBottom: 12,
    },
    challengeName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    challengeDescription: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        marginBottom: 12,
    },
    progressContainer: {
        marginBottom: 8,
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
    challengeMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rewardBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        gap: 4,
    },
    rewardText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
    daysLeft: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
    recommendationScroll: {
        marginHorizontal: -8,
    },
    recommendationItem: {
        width: 120,
        marginHorizontal: 8,
    },
    recommendationImage: {
        width: 120,
        height: 180,
        borderRadius: 8,
        marginBottom: 8,
    },
    recommendationTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    recommendationType: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
    eventContent: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 12,
        overflow: 'hidden',
    },
    eventImage: {
        width: 80,
        height: 120,
    },
    eventInfo: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    eventTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    eventMeta: {
        marginBottom: 12,
    },
    eventMetaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        gap: 6,
    },
    eventMetaText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
    },
    joinButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    joinButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    updatesList: {
        gap: 12,
    },
    updateItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    updateAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    updateAvatarText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    updateContent: {
        flex: 1,
    },
    updateName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    updateMessage: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
    },
    updateTime: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
    },
    learningContent: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 12,
        overflow: 'hidden',
    },
    learningImage: {
        width: 80,
        height: 120,
    },
    learningInfo: {
        flex: 1,
        padding: 12,
    },
    learningTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    nextLessonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    nextLessonLabel: {
        color: 'white',
        fontSize: 14,
    },
    timeEstimate: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 10,
    },
    followUpsList: {
        gap: 12,
    },
    followUpItem: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 12,
        borderRadius: 8,
    },
    followUpTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    followUpContent: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        marginBottom: 8,
        fontStyle: 'italic',
    },
    followUpType: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
        alignSelf: 'flex-end',
    },
    seeMoreButton: {
        marginTop: 8,
        borderRadius: 12,
        overflow: 'hidden',
    },
    seeMoreGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        gap: 8,
    },
    seeMoreText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});