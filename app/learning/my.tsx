import React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Mock data for learning paths
const learningPaths = [
    {
        id: '1',
        title: 'Spanish for Beginners',
        description: 'Learn basic Spanish vocabulary and grammar',
        progress: 65,
        totalLessons: 20,
        completedLessons: 13,
        image: 'https://images.unsplash.com/photo-1551279880-03041531948f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BhaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
        lastActive: '2 days ago',
    },
    {
        id: '2',
        title: 'Introduction to Photography',
        description: 'Master the basics of photography and composition',
        progress: 30,
        totalLessons: 15,
        completedLessons: 4,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
        lastActive: '1 week ago',
    },
    {
        id: '3',
        title: 'Coding Fundamentals',
        description: 'Learn the basics of programming and computer science',
        progress: 10,
        totalLessons: 25,
        completedLessons: 2,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29kaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
        lastActive: '3 days ago',
    },
    {
        id: '4',
        title: 'Mindfulness Meditation',
        description: 'Develop a daily meditation practice for mental wellbeing',
        progress: 80,
        totalLessons: 10,
        completedLessons: 8,
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
        lastActive: 'Today',
    },
];

// Mock data for recommended paths
const recommendedPaths = [
    {
        id: '5',
        title: 'Guitar for Beginners',
        description: 'Learn to play your first songs on guitar',
        totalLessons: 18,
        image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3VpdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: '6',
        title: 'Creative Writing',
        description: 'Develop your storytelling and narrative skills',
        totalLessons: 12,
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3JpdGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
];

export default function MyLearningPathsScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#121212', '#1a1a2e']}
                style={styles.gradient}
            >
                <View style={styles.header}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Text style={styles.headerTitle}>My Learning Paths</Text>
                    <View style={styles.placeholderButton} />
                </View>

                <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Active Paths</Text>

                        {learningPaths.map((path) => (
                            <Pressable
                                key={path.id}
                                style={styles.pathCard}
                                onPress={() => router.push(`/learning/path?id=${path.id}` as any)}
                            >
                                <Image
                                    source={{ uri: path.image }}
                                    style={styles.pathImage}
                                />
                                <View style={styles.pathContent}>
                                    <View style={styles.pathHeader}>
                                        <Text style={styles.pathTitle}>{path.title}</Text>
                                        <Text style={styles.lastActive}>Last active: {path.lastActive}</Text>
                                    </View>
                                    <Text style={styles.pathDescription}>{path.description}</Text>
                                    <View style={styles.progressContainer}>
                                        <View style={styles.progressBarBackground}>
                                            <View
                                                style={[
                                                    styles.progressBarFill,
                                                    { width: `${path.progress}%` }
                                                ]}
                                            />
                                        </View>
                                        <Text style={styles.progressText}>
                                            {path.completedLessons}/{path.totalLessons} lessons
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Recommended For You</Text>
                            <Pressable>
                                <Text style={styles.seeAllText}>See All</Text>
                            </Pressable>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.recommendedContainer}
                        >
                            {recommendedPaths.map((path) => (
                                <Pressable
                                    key={path.id}
                                    style={styles.recommendedCard}
                                    onPress={() => { }}
                                >
                                    <Image
                                        source={{ uri: path.image }}
                                        style={styles.recommendedImage}
                                    />
                                    <View style={styles.recommendedContent}>
                                        <Text style={styles.recommendedTitle}>{path.title}</Text>
                                        <Text style={styles.recommendedDescription}>{path.description}</Text>
                                        <Text style={styles.recommendedLessons}>{path.totalLessons} lessons</Text>
                                    </View>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.createSection}>
                        <LinearGradient
                            colors={['#8e44ad', '#3498db']}
                            style={styles.createGradient}
                        >
                            <View style={styles.createContent}>
                                <Ionicons name="bulb-outline" size={32} color="white" />
                                <Text style={styles.createTitle}>Create Custom Path</Text>
                                <Text style={styles.createDescription}>
                                    Tell Ara what you want to learn, and get a personalized learning path
                                </Text>
                                <Pressable style={styles.createButton}>
                                    <Text style={styles.createButtonText}>Get Started</Text>
                                </Pressable>
                            </View>
                        </LinearGradient>
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
    placeholderButton: {
        width: 40,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
    },
    seeAllText: {
        color: '#8e44ad',
        fontSize: 14,
    },
    pathCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
    },
    pathImage: {
        width: 100,
        height: 'auto',
    },
    pathContent: {
        flex: 1,
        padding: 12,
    },
    pathHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    pathTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
    },
    lastActive: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.5)',
    },
    pathDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 8,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressBarBackground: {
        flex: 1,
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        marginRight: 8,
    },
    progressBarFill: {
        height: 4,
        backgroundColor: '#8e44ad',
        borderRadius: 2,
    },
    progressText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.5)',
    },
    recommendedContainer: {
        paddingRight: 16,
    },
    recommendedCard: {
        width: 200,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 12,
    },
    recommendedImage: {
        width: '100%',
        height: 100,
    },
    recommendedContent: {
        padding: 12,
    },
    recommendedTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    recommendedDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 8,
    },
    recommendedLessons: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.5)',
    },
    createSection: {
        marginBottom: 24,
    },
    createGradient: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    createContent: {
        padding: 20,
        alignItems: 'center',
    },
    createTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 12,
        marginBottom: 8,
    },
    createDescription: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        marginBottom: 16,
    },
    createButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    createButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
}); 