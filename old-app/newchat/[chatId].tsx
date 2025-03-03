import React from 'react';
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import SimpleHeader from '@/components/SimpleHeader';
import StreamingConversation from '@/old-app/components/StreamingConversation';
import { useRouter } from 'expo-router';

export default function NewChatScreen() {
    const { chatId } = useLocalSearchParams();
    const router = useRouter();

    const handleTitlePress = () => {
        // TODO: Open chat settings modal
        console.log('Open chat settings');
    };

    const handleCallPress = () => {
        // Handle voice call
        console.log('Voice call pressed');
    };

    const handleVideoPress = () => {
        // Handle video call
        console.log('Video call pressed');
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView className="flex-1 bg-white" edges={['left', 'right', 'bottom', 'top']}>
                <SimpleHeader
                    variant="home"
                    onTitlePress={handleTitlePress}
                    onProfilePress={() => router.push(`/chat/${chatId}/details`)}
                >
                </SimpleHeader>
                <StreamingConversation chatId={chatId as string} />
            </SafeAreaView>
        </>
    );
} 