import { StyleSheet, ScrollView, View, Text, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Mock data for the current learning path
const currentPath = {
    id: 'spanish',
    title: 'Spanish for Beginners',
    description: 'Learn essential Spanish vocabulary and phrases for everyday conversations.',
    progress: 35,
    totalLessons: 20,
    completedLessons: 7,
    image: 'https://images.unsplash.com/photo-1551279880-032b60d8f6be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BhbmlzaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    nextLesson: {
        id: 'lesson8',
        title: 'Common Phrases',
        description: 'Learn everyday phrases to help you navigate conversations.',
        duration: 15, // minutes
        type: 'interactive'
    },
    lessons: [
        {
            id: 'lesson1',
            title: 'Greetings',
            completed: true,
            locked: false
        },
        {
            id: 'lesson2',
            title: 'Numbers 1-10',
            completed: true,
            locked: false
        },
        {
            id: 'lesson3',
            title: 'Basic Questions',
            completed: true,
            locked: false
        },
        {
            id: 'lesson4',
            title: 'Colors',
            completed: true,
            locked: false
        },
        {
            id: 'lesson5',
            title: 'Family Members',
            completed: true,
            locked: false
        },
        {
            id: 'lesson6',
            title: 'Food & Drinks',
            completed: true,
            locked: false
        },
        {
            id: 'lesson7',
            title: 'Days & Months',
            completed: true,
            locked: false
        },
        {
            id: 'lesson8',
            title: 'Common Phrases',
            completed: false,
            locked: false
        },
        {
            id: 'lesson9',
            title: 'Travel Vocabulary',
            completed: false,
            locked: true
        },
        {
            id: 'lesson10',
            title: 'Shopping',
            completed: false,
            locked: true
        }
    ]
};

// Mock data for friends also learning
const friendsLearning = [
    {
        id: 'user1',
        name: 'Sarah',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        progress: 42
    },
    {
        id: 'user2',
        name: 'Mike',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        progress: 28
    }
];

export default function LearningPathScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#121212', '#1a1a2e']}
                style={styles.gradient}
            >
                <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.header}>
                        <Pressable
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <Text style={styles.headerTitle}>Learning Path</Text>
                        <Pressable
                            style={styles.moreButton}
                            onPress={() => { }}
                        >
                            <Ionicons name="ellipsis-horizontal" size={24} color="white" />
                        </Pressable>
                    </View>

                    <View style={styles.pathHeader}>
                        <Image
                            source={{ uri: currentPath.image }}
                            style={styles.pathImage}
                        />
                        <LinearGradient
                            colors={['rgba(0,0,0,0.7)', 'transparent']}
                            style={styles.pathGradient}
                        >
                            <View style={styles.pathInfo}>
                                <Text style={styles.pathTitle}>{currentPath.title}</Text>
                                <Text style={styles.pathDescription}>{currentPath.description}</Text>
                                <View style={styles.progressContainer}>
                                    <View style={styles.progressBar}>
                                        <View
                                            style={[
                                                styles.progressFill,
                                                { width: `${currentPath.progress}%` }
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.progressText}>
                                        {currentPath.completedLessons}/{currentPath.totalLessons} lessons completed
                                    </Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>

                    <View style={styles.nextLessonContainer}>
                        <Text style={styles.sectionTitle}>Continue Learning</Text>
                        <Pressable
                            style={styles.nextLessonCard}
                            onPress={() => router.push(`/learning/lesson/${currentPath.nextLesson.id}` as any)}
                        >
                            <View style={styles.nextLessonContent}>
                                <View style={styles.nextLessonHeader}>
                                    <Text style={styles.nextLessonTitle}>{currentPath.nextLesson.title}</Text>
                                    <View style={styles.lessonTypeBadge}>
                                        <Ionicons name="game-controller" size={12} color="white" />
                                        <Text style={styles.lessonTypeText}>Interactive</Text>
                                    </View>
                                </View>
                                <Text style={styles.nextLessonDescription}>{currentPath.nextLesson.description}</Text>
                                <View style={styles.nextLessonFooter}>
                                    <View style={styles.durationContainer}>
                                        <Ionicons name="time" size={14} color="white" />
                                        <Text style={styles.durationText}>{currentPath.nextLesson.duration} min</Text>
                                    </View>
                                    <Pressable style={styles.startButton}>
                                        <Text style={styles.startButtonText}>Start Lesson</Text>
                                        <Ionicons name="play" size={14} color="white" />
                                    </Pressable>
                                </View>
                            </View>
                        </Pressable>
                    </View>

                    <View style={styles.lessonsContainer}>
                        <Text style={styles.sectionTitle}>Lesson Plan</Text>
                        {currentPath.lessons.map((lesson, index) => (
                            <Pressable
                                key={lesson.id}
                                style={[
                                    styles.lessonItem,
                                    lesson.locked && styles.lockedLesson
                                ]}
                                onPress={() => {
                                    if (!lesson.locked) {
                                        router.push(`/learning/lesson/${lesson.id}` as any);
                                    }
                                }}
                                disabled={lesson.locked}
                            >
                                <View style={styles.lessonNumber}>
                                    <Text style={styles.lessonNumberText}>{index + 1}</Text>
                                </View>
                                <View style={styles.lessonContent}>
                                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                                </View>
                                {lesson.completed ? (
                                    <Ionicons name="checkmark-circle" size={24} color="#4cd964" />
                                ) : lesson.locked ? (
                                    <Ionicons name="lock-closed" size={20} color="rgba(255, 255, 255, 0.5)" />
                                ) : (
                                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                                )}
                            </Pressable>
                        ))}
                    </View>

                    {friendsLearning.length > 0 && (
                        <View style={styles.friendsContainer}>
                            <Text style={styles.sectionTitle}>Friends Learning This</Text>
                            {friendsLearning.map(friend => (
                                <Pressable
                                    key={friend.id}
                                    style={styles.friendItem}
                                    onPress={() => router.push(`/chat/${friend.id}` as any)}
                                >
                                    <Image
                                        source={{ uri: friend.avatar }}
                                        style={styles.friendAvatar}
                                    />
                                    <View style={styles.friendInfo}>
                                        <Text style={styles.friendName}>{friend.name}</Text>
                                        <View style={styles.friendProgress}>
                                            <View style={styles.friendProgressBar}>
                                                <View
                                                    style={[
                                                        styles.friendProgressFill,
                                                        { width: `${friend.progress}%` }
                                                    ]}
                                                />
                                            </View>
                                            <Text style={styles.friendProgressText}>{friend.progress}%</Text>
                                        </View>
                                    </View>
                                    <Pressable
                                        style={styles.chatButton}
                                        onPress={() => router.push(`/chat/${friend.id}` as any)}
                                    >
                                        <Text style={styles.chatButtonText}>Chat</Text>
                                    </Pressable>
                                </Pressable>
                            ))}
                            <Pressable
                                style={styles.inviteFriendsButton}
                                onPress={() => { }}
                            >
                                <Ionicons name="person-add" size={16} color="white" />
                                <Text style={styles.inviteFriendsText}>Invite Friends</Text>
                            </Pressable>
                        </View>
                    )}

                    <View style={styles.feedbackContainer}>
                        <Text style={styles.feedbackTitle}>How is this learning path?</Text>
                        <Text style={styles.feedbackSubtitle}>Your feedback helps Ara improve your experience</Text>
                        <View style={styles.ratingContainer}>
                            {[1, 2, 3, 4, 5].map(rating => (
                                <Pressable
                                    key={rating}
                                    style={styles.ratingButton}
                                    onPress={() => { }}
                                >
                                    <Ionicons name="star" size={32} color="rgba(255, 255, 255, 0.3)" />
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 32,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    moreButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pathHeader: {
        height: 200,
        position: 'relative',
    },
    pathImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    pathGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        padding: 16,
    },
    pathInfo: {
        width: '100%',
    },
    pathTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    pathDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    nextLessonContainer: {
        marginTop: 24,
        marginBottom: 24,
    },
    nextLessonCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        marginHorizontal: 16,
    },
    nextLessonContent: {
        padding: 16,
    },
    nextLessonHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    nextLessonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    lessonTypeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8e44ad',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        gap: 4,
    },
    lessonTypeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    nextLessonDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 16,
    },
    nextLessonFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    durationText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
    startButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#16a085',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
        gap: 6,
    },
    startButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    lessonsContainer: {
        marginBottom: 24,
    },
    lessonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    lockedLesson: {
        opacity: 0.5,
    },
    lessonNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    lessonNumberText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    lessonContent: {
        flex: 1,
    },
    lessonTitle: {
        color: 'white',
        fontSize: 16,
    },
    friendsContainer: {
        marginBottom: 24,
    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    friendAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    friendInfo: {
        flex: 1,
    },
    friendName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    friendProgress: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    friendProgressBar: {
        flex: 1,
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 2,
    },
    friendProgressFill: {
        height: '100%',
        backgroundColor: '#4cd964',
        borderRadius: 2,
    },
    friendProgressText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
    chatButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginLeft: 8,
    },
    chatButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
    inviteFriendsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 16,
        gap: 8,
    },
    inviteFriendsText: {
        color: 'white',
        fontWeight: 'bold',
    },
    feedbackContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        alignItems: 'center',
    },
    feedbackTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    feedbackSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        marginBottom: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ratingButton: {
        marginHorizontal: 4,
    },
}); 