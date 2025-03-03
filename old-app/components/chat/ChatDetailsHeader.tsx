import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ChatDetailsHeader() {
    const router = useRouter();

    return (
        <View className="flex-row items-center p-4">
            <TouchableOpacity
                onPress={() => router.back()}
                className="mr-3"
            >
                <Ionicons name="chevron-back" size={24} color="#6b7280" />
            </TouchableOpacity>
        </View>
    );
} 