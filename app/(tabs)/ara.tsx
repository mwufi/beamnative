import {
    StyleSheet,
    View,
    Text,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';

export default function AraScreen() {
    const router = useRouter();

    const handleNavigateToChat = () => {
        router.push('/ara/chat');
    };

    const handleNavigateToLabs = () => {
        router.push('/ara/labs');
    };

    const handleNavigateToCreate = () => {
        router.push('/ara/create');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Ara</Text>
                <Text style={styles.headerSubtitle}>Your AI Assistant</Text>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                <TouchableOpacity
                    style={styles.chatCard}
                    onPress={handleNavigateToChat}
                >
                    <LinearGradient
                        colors={['#8e44ad', '#3498db']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.cardGradient}
                    >
                        <Ionicons name="chatbubbles" size={32} color="white" />
                        <Text style={styles.cardTitle}>Chat with Ara</Text>
                        <Text style={styles.cardDescription}>
                            Send messages, share media, and record voice notes
                        </Text>
                        <View style={styles.cardFeatures}>
                            <View style={styles.featureItem}>
                                <Ionicons name="text" size={16} color="white" />
                                <Text style={styles.featureText}>Text</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="image" size={16} color="white" />
                                <Text style={styles.featureText}>Images</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="document" size={16} color="white" />
                                <Text style={styles.featureText}>Files</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="mic" size={16} color="white" />
                                <Text style={styles.featureText}>Voice</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.labsCard}
                    onPress={handleNavigateToLabs}
                >
                    <BlurView intensity={30} tint="dark" style={styles.cardContent}>
                        <Ionicons name="flask" size={32} color="white" />
                        <Text style={styles.cardTitle}>Ara Labs</Text>
                        <Text style={styles.cardDescription}>
                            Explore experimental AI features and capabilities
                        </Text>
                    </BlurView>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.createCard}
                    onPress={handleNavigateToCreate}
                >
                    <BlurView intensity={30} tint="dark" style={styles.cardContent}>
                        <Ionicons name="create" size={32} color="white" />
                        <Text style={styles.cardTitle}>Create with Ara</Text>
                        <Text style={styles.cardDescription}>
                            Generate images, text, and other content with AI
                        </Text>
                    </BlurView>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        padding: 20,
        paddingTop: 60,
        backgroundColor: '#121212',
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: 'white',
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 4,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    chatCard: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        height: 200,
    },
    cardGradient: {
        padding: 20,
        height: '100%',
    },
    labsCard: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        height: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    createCard: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        height: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    cardContent: {
        padding: 20,
        height: '100%',
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 12,
    },
    cardDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 8,
    },
    cardFeatures: {
        flexDirection: 'row',
        marginTop: 16,
        flexWrap: 'wrap',
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    featureText: {
        color: 'white',
        fontSize: 12,
        marginLeft: 4,
    },
}); 