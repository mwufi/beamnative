import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        // Add your custom fonts here if needed
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <>
            <StatusBar style="light" />
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="chat/[id]" options={{
                    headerShown: true,
                    headerTitle: 'Chat',
                    headerStyle: {
                        backgroundColor: '#121212',
                    },
                    headerTintColor: '#fff',
                }} />
                <Stack.Screen name="inbox" options={{
                    headerShown: true,
                    headerTitle: 'Inbox',
                    headerStyle: {
                        backgroundColor: '#121212',
                    },
                    headerTintColor: '#fff',
                }} />
                <Stack.Screen name="recommendations" options={{
                    headerShown: true,
                    headerTitle: 'Recommendations',
                    headerStyle: {
                        backgroundColor: '#121212',
                    },
                    headerTintColor: '#fff',
                    presentation: 'modal',
                }} />
                <Stack.Screen name="tasks/index" options={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#000' },
                }} />
                <Stack.Screen name="tasks/[id]" options={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#000' },
                }} />
            </Stack>
        </>
    );
} 