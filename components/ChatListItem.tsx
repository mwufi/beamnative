import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AraProfile from '@/components/AraProfile';

type ChatListItemProps = {
    id: string;
    name: string;
    lastMessage: string;
    profilePicture?: string;
    timestamp?: string;
};

export default function ChatListItem({ id, name, lastMessage, profilePicture, timestamp }: ChatListItemProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/chat/${id}`);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            {profilePicture ? (
                <Image source={{ uri: profilePicture }} style={styles.avatar} />
            ) : (
                <AraProfile size={48} style={styles.avatar} />
            )}
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name}>{name}</Text>
                    {timestamp && <Text style={styles.timestamp}>{timestamp}</Text>}
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>
                    {lastMessage}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
    },
    timestamp: {
        fontSize: 12,
        color: '#6b7280',
    },
    lastMessage: {
        fontSize: 14,
        color: '#6b7280',
    },
}); 