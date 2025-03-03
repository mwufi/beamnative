import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatCard, TutorialCard } from '@/components/cards';

export default function CardShowcase() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.title}>Card Components</Text>
                    <Text style={styles.subtitle}>A showcase of all available cards</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Chat Cards</Text>

                    <ChatCard
                        title="Chat with Ara"
                        description="Get help with your tasks and questions"
                        ctaText="Start Chat"
                        icon="chatbubble-outline"
                    />

                    <ChatCard
                        title="Quick Practice"
                        description="Sharpen your skills in 3 mins"
                        ctaText="Start Practice"
                        icon="barbell-outline"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tutorial Cards</Text>

                    <TutorialCard
                        title="Welcome to Ara"
                        description="Learn how Ara can help you with day-to-day tasks, creative projects, and personal growth. Start with our interactive tutorial to explore all features."
                    />

                    <TutorialCard
                        title="Getting Started"
                        description="New to programming? Start here to learn the basics and build your first app."
                        ctaText="Begin Learning"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#6b7280',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 16,
    },
}); 