import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

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
  const userName = "Alex"; // This would come from user context/state

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
          {sampleCards.map((card) => {
            if (card.type === "chat") {
              return (
                <TouchableOpacity
                  key={card.id}
                  style={styles.chatCard}
                  onPress={() => router.push('/chat')}
                >
                  <View style={styles.chatIconContainer}>
                    <Ionicons name="barbell-outline" size={24} color="#000" />
                  </View>
                  <View style={styles.chatContent}>
                    <Text style={styles.chatTitle}>{card.title}</Text>
                    <Text style={styles.chatDescription}>{card.description}</Text>
                  </View>
                  <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.startButtonText}>Start practice</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }

            if (card.type === "course") {
              return (
                <TouchableOpacity
                  key={card.id}
                  style={styles.courseCard}
                  onPress={() => router.push('/(tabs)/explore')}
                >
                  <View style={styles.courseImageContainer}>
                    <MaterialCommunityIcons name="home" size={48} color="#2563eb" />
                  </View>
                  <View style={styles.courseContent}>
                    <Text style={styles.courseSubtitle}>{card.subtitle}</Text>
                    <Text style={styles.courseTitle}>{card.title}</Text>
                    <Text style={styles.courseDescription}>{card.description}</Text>
                    <View style={styles.progressBarContainer}>
                      <View
                        style={[
                          styles.progressBar,
                          { width: `${(card.progress || 0) * 100}%` }
                        ]}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                key={card.id}
                style={styles.infoCard}
                onPress={() => { }}
              >
                <Text style={styles.infoTitle}>{card.title}</Text>
                <Text style={styles.infoDescription}>{card.description}</Text>
              </TouchableOpacity>
            );
          })}
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
  chatCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 16,
  },
  chatIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8FB60',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  chatContent: {
    marginBottom: 16,
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  chatDescription: {
    fontSize: 16,
    color: '#6b7280',
  },
  startButton: {
    backgroundColor: '#E8FB60',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  courseImageContainer: {
    width: '100%',
    height: 160,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseContent: {
    padding: 16,
  },
  courseSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  courseDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#f3f4f6',
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 2,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 16,
    color: '#6b7280',
  },
});
