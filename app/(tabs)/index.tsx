import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { TutorialCard } from '@/components/cards';

interface Card {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  progress?: number;
  type: 'course' | 'chat' | 'info';
}

const sampleCards: Card[] = [
  {
    id: 1,
    title: "Chat with Ara",
    description: "Get help with your tasks and questions",
    type: "chat"
  },
  {
    id: 2,
    title: "Foundational Math",
    subtitle: "LEVEL 1",
    description: "1.1 Solving Equations",
    progress: 0.1,
    type: "course"
  },
  {
    id: 3,
    title: "Sharpen your skills in 3 mins",
    description: "with a quick practice session",
    type: "info"
  }
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>For you</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
            <View style={styles.profileButton}>
              <Text style={styles.streakCount}>1</Text>
              <MaterialCommunityIcons name="lightning-bolt" size={16} color="#000" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Streak indicators */}
        <View style={styles.streakContainer}>
          {['W', 'Th', 'F', 'S', 'Su'].map((day, index) => (
            <View key={day} style={styles.streakDay}>
              <View style={[
                styles.streakIndicator,
                index === 0 && styles.streakIndicatorActive
              ]}>
                <MaterialCommunityIcons
                  name="lightning-bolt"
                  size={20}
                  color="#000"
                  style={[
                    styles.streakDayIcon,
                    index === 0 && styles.streakDayIconActive
                  ]}
                />
              </View>
              <Text style={styles.streakDayText}>{day}</Text>
            </View>
          ))}
        </View>

        <View style={styles.cardsContainer}>
          {/* Empty state */}
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>You have 0 minutes with Ara!</Text>
            <Text style={styles.emptyDescription}>Start your journey by exploring what Ara can do for you.</Text>
          </View>

          {/* Getting Started Card */}
          <TutorialCard
            title="Welcome to Ara"
            description="Learn how Ara can help you with day-to-day tasks, creative projects, and personal growth. Start with our interactive tutorial to explore all features."
            onPress={() => router.push('/(tabs)/explore')}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8FB60',
    padding: 8,
    borderRadius: 20,
    gap: 4,
  },
  streakCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  streakDay: {
    alignItems: 'center',
    gap: 4,
  },
  streakIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakIndicatorActive: {
    backgroundColor: '#E8FB60',
  },
  streakDayIcon: {
    opacity: 0.3,
  },
  streakDayIconActive: {
    opacity: 1,
  },
  streakDayText: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardsContainer: {
    padding: 20,
    gap: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});
