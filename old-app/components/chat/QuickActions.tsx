import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type QuickActionItem = {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
};

const quickActions: QuickActionItem[] = [
    { id: 'profile', icon: 'person-outline', label: 'Profile' },
    { id: 'search', icon: 'search-outline', label: 'Search' },
    { id: 'mute', icon: 'notifications-outline', label: 'Mute' },
    { id: 'options', icon: 'ellipsis-horizontal', label: 'Options' },
];

export default function QuickActions() {
    return (
        <View className="flex-row justify-around py-4 border-b border-gray-200">
            {quickActions.map(item => (
                <TouchableOpacity key={item.id} className="items-center space-y-1">
                    <Ionicons name={item.icon} size={24} color="#6b7280" />
                    <Text className="text-xs text-gray-500">{item.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
} 