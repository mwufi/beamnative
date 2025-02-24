import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { Drawer } from 'expo-router/drawer';

interface SimpleHeaderProps {
    variant: 'home' | 'chat';
    title?: string;
    onTitlePress?: () => void;
    onProfilePress?: () => void;
    onBackPress?: () => void;
    children?: ReactNode;
}

interface RightButtonsProps {
    children: ReactNode;
}

const RightButtons = ({ children }: RightButtonsProps) => {
    return (
        <View className="flex-row items-center gap-4">
            {children}
        </View>
    );
};

function SimpleHeader({
    variant,
    title,
    onTitlePress,
    onProfilePress,
    onBackPress,
    children
}: SimpleHeaderProps) {
    const router = useRouter();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            router.back();
        }
    };

    return (
        <View className="flex-row items-center px-4 py-4">
            {/* Left Section with Title */}
            <View className="flex-row items-center flex-1 min-w-0 pr-4">
                {variant === 'chat' && (
                    <TouchableOpacity
                        onPress={handleBackPress}
                        className="mr-2 p-2 -ml-2"
                    >
                        <Ionicons name="chevron-back" size={24} color="#1f2937" />
                    </TouchableOpacity>
                )}

                {variant === 'home' ? (
                    <TouchableOpacity
                        onPress={() => router.push('/inbox')}
                        className="p-2 -ml-2"
                    >
                        <Ionicons name="menu" size={24} color="#1f2937" />
                    </TouchableOpacity>
                ) : null}

                {/* Title Section */}
                {title ? (
                    <TouchableOpacity
                        onPress={onTitlePress}
                        className="flex-row items-center min-w-0 flex-1"
                    >
                        <Text
                            className="text-lg font-semibold text-gray-900 mr-1 flex-1"
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#6b7280" />
                    </TouchableOpacity>
                ) : (
                    <View className="flex-1" />
                )}
            </View>

            {/* Right Section */}
            <View className="flex-row items-center space-x-4 flex-shrink-0">
                {children}
                <TouchableOpacity
                    onPress={onProfilePress}
                    className="w-10 h-10 rounded-full bg-blue-300 justify-center items-center"
                >
                    <Text className="text-blue-400 font-medium bg-blue-300">A</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Add RightButtons as a static property
SimpleHeader.RightButtons = RightButtons;

export default SimpleHeader; 