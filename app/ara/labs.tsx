import { StyleSheet, ScrollView, View, Text, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';

// Mock data for experimental features
const experimentalFeatures = [
    {
        id: 'voice',
        title: 'Voice Conversations',
        description: 'Talk to Ara using your voice and hear responses in a natural, conversational way.',
        icon: 'mic',
        status: 'beta',
        image: 'https://images.unsplash.com/photo-1590499189559-fc3b2eb2b541?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZvaWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 'image-gen',
        title: 'Image Generation',
        description: 'Create custom images based on your text descriptions using advanced AI.',
        icon: 'image',
        status: 'alpha',
        image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXJ0JTIwZ2VuZXJhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 'brainstorm',
        title: 'Collaborative Brainstorming',
        description: 'Work with Ara to generate and refine ideas for projects, writing, and more.',
        icon: 'bulb',
        status: 'beta',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJhaW5zdG9ybXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 'recommendations',
        title: 'Advanced Recommendations',
        description: 'Get hyper-personalized recommendations based on your interests and behavior.',
        icon: 'star',
        status: 'alpha',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVjb21tZW5kYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
    },
];

export default function AraLabsScreen() {
    const router = useRouter();

    const getStatusColor = (status: string) => {
        return status === 'alpha' ? '#e74c3c' : '#f39c12';
    };

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
                    <Text style={styles.headerTitle}>Ara Labs</Text>
                    <View style={styles.placeholderButton} />
                </View>

                <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.introContainer}>
                        <LinearGradient
                            colors={['#8e44ad', '#3498db']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.introGradient}
                        >
                            <Ionicons name="flask" size={32} color="white" />
                            <Text style={styles.introTitle}>Welcome to Ara Labs</Text>
                            <Text style={styles.introText}>
                                Try experimental features before they're released to everyone.
                                Your feedback helps us improve!
                            </Text>
                        </LinearGradient>
                    </View>

                    <Text style={styles.sectionTitle}>Experimental Features</Text>

                    {experimentalFeatures.map(feature => (
                        <Pressable
                            key={feature.id}
                            style={styles.featureCard}
                            onPress={() => router.push(`/ara/labs/${feature.id}` as any)}
                        >
                            <Image
                                source={{ uri: feature.image }}
                                style={styles.featureImage}
                            />
                            <View style={styles.featureContent}>
                                <View style={styles.featureHeader}>
                                    <Ionicons name={feature.icon as any} size={24} color="white" />
                                    <View style={styles.featureTitleContainer}>
                                        <Text style={styles.featureTitle}>{feature.title}</Text>
                                        <View
                                            style={[
                                                styles.statusBadge,
                                                { backgroundColor: getStatusColor(feature.status) }
                                            ]}
                                        >
                                            <Text style={styles.statusText}>{feature.status.toUpperCase()}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.featureDescription}>{feature.description}</Text>
                                <View style={styles.tryButtonContainer}>
                                    <Text style={styles.tryButtonText}>Try it now</Text>
                                    <Ionicons name="arrow-forward" size={16} color="white" />
                                </View>
                            </View>
                        </Pressable>
                    ))}

                    <View style={styles.feedbackContainer}>
                        <Text style={styles.feedbackTitle}>Have an idea for a new feature?</Text>
                        <Pressable
                            style={styles.feedbackButton}
                            onPress={() => router.push('/ara/labs/feedback' as any)}
                        >
                            <Text style={styles.feedbackButtonText}>Submit Feedback</Text>
                            <Ionicons name="send" size={16} color="white" />
                        </Pressable>
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
    introContainer: {
        marginBottom: 24,
        borderRadius: 16,
        overflow: 'hidden',
    },
    introGradient: {
        padding: 20,
        alignItems: 'center',
    },
    introTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 12,
        marginBottom: 8,
    },
    introText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        opacity: 0.9,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
    },
    featureCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
    },
    featureImage: {
        width: '100%',
        height: 150,
    },
    featureContent: {
        padding: 16,
    },
    featureHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureTitleContainer: {
        flex: 1,
        marginLeft: 12,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    statusText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    featureDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 16,
    },
    tryButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    tryButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 8,
    },
    feedbackContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    feedbackTitle: {
        fontSize: 16,
        color: 'white',
        marginBottom: 12,
    },
    feedbackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8e44ad',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    feedbackButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 8,
    },
}); 