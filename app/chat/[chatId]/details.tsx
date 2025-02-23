import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AraProfile from '@/app/components/AraProfile';
import ChatDetailsHeader from '@/app/components/chat/ChatDetailsHeader';
import QuickActions from '@/app/components/chat/QuickActions';
import MenuSection from '@/app/components/chat/MenuSection';

export default function ChatDetailsScreen() {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
                <ChatDetailsHeader />

                <ScrollView className="flex-1">
                    <View className="items-center py-6">
                        <AraProfile size={96} className="mb-3" />
                        <Text className="text-2xl font-semibold text-gray-800">Ara</Text>
                    </View>

                    <QuickActions />
                    <MenuSection />

                    <View className="p-4 items-center">
                        <Text className="text-xl font-semibold text-gray-800 mb-2">Shared media</Text>
                        <Text className="text-sm text-gray-500 text-center">
                            Photos and videos shared in this chat will appear here.
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
} 