import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type FeatureCard = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const features: FeatureCard[] = [
  {
    id: '1',
    title: 'Smart Search',
    description: 'Get instant answers to your questions with our advanced AI search.',
    icon: 'search-outline',
  },
  {
    id: '2',
    title: 'AI Companion',
    description: 'Chat with your personalized AI companion for deeper conversations.',
    icon: 'person-outline',
  },
  {
    id: '3',
    title: 'Learning Hub',
    description: 'Explore tutorials and guides to make the most of Ara.',
    icon: 'book-outline',
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore Ara</Text>
          <Text style={styles.subtitle}>
            Discover new ways to interact with your AI companion
          </Text>
        </View>

        <View style={styles.featuresGrid}>
          {features.map(feature => (
            <TouchableOpacity
              key={feature.id}
              style={styles.featureCard}
              onPress={() => {
                // Handle feature navigation
              }}
            >
              <View style={styles.iconContainer}>
                <Ionicons name={feature.icon} size={24} color="#6366f1" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tutorialSection}>
          <Text style={styles.sectionTitle}>Getting Started</Text>
          <View style={styles.tutorialCard}>
            <Text style={styles.tutorialTitle}>Welcome to Ara</Text>
            <Text style={styles.tutorialText}>
              Learn how Ara can help you with day-to-day tasks, creative projects,
              and personal growth. Start with our interactive tutorial to explore
              all features.
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Start Tutorial</Text>
            </TouchableOpacity>
          </View>
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
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  featureCard: {
    width: '100%',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  tutorialSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  tutorialCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  tutorialTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  tutorialText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
