import { Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
                tabBarStyle: {
                    backgroundColor: '#121212',
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                },
                headerStyle: {
                    backgroundColor: '#121212',
                },
                headerTintColor: '#fff',
                headerRight: () => (
                    <Pressable
                        onPress={() => router.push('/inbox' as any)}
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.5 : 1,
                            marginRight: 15,
                        })}
                    >
                        <Ionicons name="mail-outline" size={24} color="white" />
                    </Pressable>
                ),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="discover"
                options={{
                    title: 'Discover',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'compass' : 'compass-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="ara"
                options={{
                    title: 'Ara',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'chatbubble' : 'chatbubble-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="me"
                options={{
                    title: 'Me',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
} 