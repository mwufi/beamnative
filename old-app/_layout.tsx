import { useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import GlobalAraInput from '@/components/GlobalAraInput';
import '@/global.css';

// Get screen width to calculate gesture area
const { width: SCREEN_WIDTH } = Dimensions.get('window');
// How much of the screen width from the edge should respond to the gesture (e.g., 25% of screen)
const GESTURE_WIDTH = SCREEN_WIDTH * 0.25;

// Hardcoded past chats - in a real app, this would come from your database
const PAST_CHATS = [
  { id: '1', title: 'Essay Writing Assistant', date: '2024-03-20' },
  { id: '2', title: 'Study Plan Helper', date: '2024-03-19' },
  { id: '3', title: 'Research Assistant', date: '2024-03-18' },
];

function CustomDrawerContent() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <ScrollView className="flex-1 bg-white pt-10">
        {/* App Name/Brand */}
        <View className="px-4 py-4 mb-2">
          <Text className="text-xl font-bold text-gray-900">Ara</Text>
        </View>

        {/* Home Item */}
        <TouchableOpacity
          className="flex-row items-center px-4 py-3 space-x-3 active:bg-gray-100"
          onPress={() => router.push('/(tabs)')}
        >
          <Ionicons name="home-outline" size={22} color="#374151" />
          <Text className="text-gray-700 text-base font-medium">Home</Text>
        </TouchableOpacity>

        {/* Past Chats Section */}
        <View className="px-4 py-3 border-t border-gray-200 mt-2">
          <Text className="text-sm font-medium text-gray-500">Past Chats</Text>
        </View>

        {/* Past Chat Items */}
        {PAST_CHATS.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            className="flex-row items-center px-4 py-3 space-x-3 active:bg-gray-100"
            onPress={() => router.push(`/newchat/${chat.id}`)}
          >
            <Ionicons name="chatbubble-outline" size={22} color="#374151" />
            <View>
              <Text className="text-gray-700 text-base">{chat.title}</Text>
              <Text className="text-sm text-gray-500">{chat.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}


export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (Platform.OS === 'web') {
      // Prevent the splash screen from auto-hiding before asset loading is complete.
      SplashScreen.preventAutoHideAsync();
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GlobalAraInput />
        <Drawer
          screenOptions={{
            headerShown: false,
            // Customize the drawer gesture
            swipeEdgeWidth: GESTURE_WIDTH,
            swipeMinDistance: 20,
          }}
          drawerContent={() => <CustomDrawerContent />}
        >
          <Drawer.Screen name="(tabs)" />
          <Drawer.Screen name="newchat/[chatId]" />
        </Drawer>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
