import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type MenuItem = {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value?: string;
    color?: string;
    onPress?: () => void;
};

const menuItems: MenuItem[] = [
    {
        id: 'theme',
        icon: 'color-palette-outline',
        label: 'Theme',
        value: 'Default',
    },
    {
        id: 'privacy',
        icon: 'lock-closed-outline',
        label: 'Privacy & safety',
    },
    {
        id: 'group',
        icon: 'people-outline',
        label: 'Create a group chat',
    },
    {
        id: 'report',
        icon: 'alert-circle-outline',
        label: 'Something isn\'t working',
        color: '#ef4444',
    },
];

export default function MenuSection() {
    return (
        <View className="pt-2">
            {menuItems.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    className="flex-row items-center justify-between py-4 px-4 border-b border-gray-100"
                    onPress={item.onPress}
                >
                    <View className="flex-row items-center space-x-3">
                        <Ionicons
                            name={item.icon}
                            size={24}
                            color={item.color || '#6b7280'}
                        />
                        <Text className={`text-base ${item.color ? '' : 'text-gray-800'}`} style={item.color ? { color: item.color } : undefined}>
                            {item.label}
                        </Text>
                    </View>
                    {item.value && (
                        <View className="flex-row items-center space-x-1">
                            <Text className="text-sm text-gray-500">{item.value}</Text>
                            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                        </View>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
} 