import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TutorialCard } from '@/components/cards';
import { db } from "@/util/instant";
import { useUser } from '@/hooks/useUser';
import { DrawerToggleButton } from '@react-navigation/drawer';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const router = useRouter();
  const { isLoading, user, error, userProfile } = useUser();

  const email = user?.email;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <DrawerToggleButton tintColor="#000" />
            <View>
              <Text style={styles.greeting}>{getGreeting()}</Text>
              <Text style={styles.date}>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/(tabs)/explore')}
          >
            <Ionicons name="person-circle-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardsContainer}>
          <TutorialCard
            title="Welcome to Ara"
            description="Your AI assistant for getting things done. Chat with Ara to manage tasks, get answers, or explore new ideas."
            ctaText="Start Chatting"
            onPress={() => router.push('/chat')}
          />

          <TutorialCard
            title="Debug Info"
            description={`User email: ${email || 'Not logged in'}\nLoading: ${isLoading}\nError: ${error?.message || 'No error'}\nUser: ${JSON.stringify(user)}\nUser Profile: ${JSON.stringify(userProfile)}`}
            ctaText={user ? "Log out" : "Log in"}
            onPress={() => user ? db.auth.signOut() : router.push('/login')}
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
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: '#6b7280',
  },
  profileButton: {
    padding: 8,
    borderRadius: 20,
  },
  cardsContainer: {
    padding: 20,
    gap: 16,
  },
});
