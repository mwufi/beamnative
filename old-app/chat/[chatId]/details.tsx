import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AraProfile from '@/old-app/components/AraProfile';
import ChatDetailsHeader from '@/old-app/components/chat/ChatDetailsHeader';
import FeedbackModal from '@/old-app/components/FeedbackModal';
import MemoryModal from '@/old-app/components/MemoryModal';
import SelectModal from '@/old-app/components/SelectModal';

interface MenuItem {
    id: string;
    icon: 'color-palette' | 'chatbubble-ellipses' | 'server' | 'trash' | 'log-out';
    label: string;
    description: string;
    color?: string;
}

const menuItems: MenuItem[] = [
    {
        id: 'customize',
        icon: 'color-palette' as const,
        label: 'Customize Ara',
        description: 'Change personality and preferences',
    },
    {
        id: 'feedback',
        icon: 'chatbubble-ellipses' as const,
        label: 'Give Feedback',
        description: 'Help us improve Ara',
    },
    {
        id: 'memory',
        icon: 'server' as const,
        label: 'Memory & Context',
        description: 'View and manage what Ara remembers',
    },
];

const modelOptions = ['GPT-4', 'GPT-3.5', 'Claude'] as string[];

const settingsItems = [
    {
        id: 'newChat',
        label: 'New chat every time',
        type: 'toggle',
    },
    {
        id: 'model',
        label: 'Base Model',
        type: 'select',
        options: modelOptions,
    },
];

const dangerItems: MenuItem[] = [
    {
        id: 'clear',
        icon: 'trash' as const,
        label: 'Clear Conversation',
        description: 'Delete all messages in this chat',
        color: '#ef4444',
    },
    {
        id: 'logout',
        icon: 'log-out' as const,
        label: 'Log Out',
        description: 'Sign out of your account',
        color: '#ef4444',
    },
];

export default function ChatDetailsScreen() {
    const router = useRouter();
    const [customPrompt, setCustomPrompt] = useState('');
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
    const [isMemoryVisible, setIsMemoryVisible] = useState(false);
    const [isModelSelectVisible, setIsModelSelectVisible] = useState(false);
    const [isNewChatEnabled, setIsNewChatEnabled] = useState(false);
    const [selectedModel, setSelectedModel] = useState('GPT-4');

    const handleMenuPress = (id: string) => {
        switch (id) {
            case 'customize':
                // Handle customize
                break;
            case 'feedback':
                setIsFeedbackVisible(true);
                break;
            case 'memory':
                setIsMemoryVisible(true);
                break;
        }
    };

    const handleDangerPress = (id: string) => {
        switch (id) {
            case 'clear':
                Alert.alert(
                    'Clear Conversation',
                    'Are you sure you want to clear this conversation? This action cannot be undone.',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        {
                            text: 'Clear',
                            style: 'destructive',
                            onPress: () => {
                                // Handle clear conversation
                                console.log('Clearing conversation...');
                            },
                        },
                    ]
                );
                break;
            case 'logout':
                Alert.alert(
                    'Log Out',
                    'Are you sure you want to log out?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        {
                            text: 'Log Out',
                            style: 'destructive',
                            onPress: () => {
                                // Handle logout
                                console.log('Logging out...');
                                router.replace('/login');
                            },
                        },
                    ]
                );
                break;
        }
    };

    const handleFeedbackSubmit = (feedback: { type: string; message: string }) => {
        // Handle feedback submission
        console.log('Feedback submitted:', feedback);
    };

    const handleClearMemory = () => {
        Alert.alert(
            'Clear Memory',
            'Are you sure you want to clear all of Ara\'s memory? This will reset all learned preferences and context.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: () => {
                        // Handle clear memory
                        console.log('Clearing memory...');
                        setIsMemoryVisible(false);
                    },
                },
            ]
        );
    };

    const handleModelSelect = (model: string) => {
        setSelectedModel(model);
        // Here you would typically update this in your app's settings/state management
        console.log('Selected model:', model);
    };

    const renderMenuItem = (item: MenuItem, onPress: (id: string) => void) => (
        <TouchableOpacity
            key={item.id}
            className="flex-row items-center py-4 border-b border-gray-100"
            onPress={() => onPress(item.id)}
        >
            <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-4">
                <Ionicons
                    name={item.icon + "-outline" as any}
                    size={24}
                    color={item.color || '#6b7280'}
                />
            </View>
            <View className="flex-1">
                <Text className={`text-base font-medium ${item.color ? '' : 'text-gray-800'}`}
                    style={item.color ? { color: item.color } : undefined}>
                    {item.label}
                </Text>
                <Text className="text-sm text-gray-500">{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={item.color || '#9ca3af'} />
        </TouchableOpacity>
    );

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

                    {/* Customization Input */}
                    <View className="px-4 mb-6">
                        <Text className="text-sm font-medium text-gray-500 mb-2">Custom Instructions</Text>
                        <TextInput
                            className="bg-gray-50 rounded-lg p-3 text-gray-800 min-h-[100]"
                            multiline
                            placeholder="Add custom instructions for Ara..."
                            placeholderTextColor="#9ca3af"
                            value={customPrompt}
                            onChangeText={setCustomPrompt}
                        />
                    </View>

                    {/* Quick Actions */}
                    <View className="px-4 mb-6">
                        {menuItems.map((item) => renderMenuItem(item, handleMenuPress))}
                    </View>

                    {/* Settings */}
                    <View className="px-4 mb-6">
                        <Text className="text-lg font-semibold text-gray-800 mb-4">Settings</Text>
                        {settingsItems.map((item) => (
                            <View key={item.id} className="flex-row items-center justify-between py-4 border-b border-gray-100">
                                <Text className="text-base text-gray-800">{item.label}</Text>
                                {item.type === 'toggle' ? (
                                    <TouchableOpacity
                                        onPress={() => setIsNewChatEnabled(!isNewChatEnabled)}
                                    >
                                        <View className={`w-12 h-6 rounded-full ${isNewChatEnabled ? 'bg-indigo-500' : 'bg-gray-200'} justify-center`}>
                                            <View className={`w-5 h-5 rounded-full bg-white shadow absolute ${isNewChatEnabled ? 'right-0.5' : 'left-0.5'}`} />
                                        </View>
                                    </TouchableOpacity>
                                ) : item.type === 'select' ? (
                                    <TouchableOpacity
                                        className="flex-row items-center"
                                        onPress={() => setIsModelSelectVisible(true)}
                                    >
                                        <Text className="text-gray-500 mr-2">{selectedModel}</Text>
                                        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        ))}
                    </View>

                    {/* Danger Zone */}
                    <View className="px-4 mb-6">
                        <Text className="text-lg font-semibold text-red-600 mb-4">Danger Zone</Text>
                        {dangerItems.map((item) => renderMenuItem(item, handleDangerPress))}
                    </View>

                    {/* spacer */}
                    <View className="h-20"></View>
                </ScrollView>

                <FeedbackModal
                    isVisible={isFeedbackVisible}
                    onClose={() => setIsFeedbackVisible(false)}
                    onSubmit={handleFeedbackSubmit}
                />

                <MemoryModal
                    isVisible={isMemoryVisible}
                    onClose={() => setIsMemoryVisible(false)}
                    onClearMemory={handleClearMemory}
                />

                <SelectModal
                    isVisible={isModelSelectVisible}
                    onClose={() => setIsModelSelectVisible(false)}
                    title="Select Base Model"
                    options={settingsItems.find(item => item.id === 'model')?.options || []}
                    selectedValue={selectedModel}
                    onSelect={handleModelSelect}
                />
            </SafeAreaView>
        </>
    );
} 