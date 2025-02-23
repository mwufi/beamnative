import React from 'react';
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import ChatHeader from '@/components/ChatHeader';
import StreamingConversation from '@/app/components/StreamingConversation';
import { useRouter } from 'expo-router';

export default function NewChatScreen() {
    const { chatId } = useLocalSearchParams();
    const router = useRouter();

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView className="flex-1 bg-white" edges={['left', 'right', 'bottom', 'top']}>
                <ChatHeader
                    profile={{
                        name: "Ara",
                        subtitle: "AI Assistant"
                    }}
                    onProfilePress={() => router.push(`/chat/${chatId}/details`)}
                />

                <StreamingConversation chatId={chatId as string} />
            </SafeAreaView>
        </>
    );
} 