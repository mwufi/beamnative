import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AraProfile from '@/components/AraProfile';

type ChatListItemProps = {
    id: string;
    name: string;
    lastMessage: string;
    profilePicture?: string;
    timestamp?: string;
    isBot?: boolean;
    unreadCount?: number;
};

export default function ChatListItem({
    id,
    name,
    lastMessage,
    profilePicture,
    timestamp,
    isBot,
    unreadCount
}: ChatListItemProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/chat/${id}`);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={styles.avatarContainer}>
                {profilePicture ? (
                    <Image source={{ uri: profilePicture }} style={styles.avatar} />
                ) : (
                    <AraProfile size={48} style={styles.avatar} />
                )}
                {isBot && (
                    <View style={styles.botBadge}>
                        <Ionicons name="logo-electron" size={12} color="#6366f1" />
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name} numberOfLines={1}>{name}</Text>
                    {timestamp && (
                        <Text style={[
                            styles.timestamp,
                            unreadCount ? styles.timestampUnread : null
                        ]}>
                            {timestamp}
                        </Text>
                    )}
                </View>
                <View style={styles.messageRow}>
                    <Text style={[
                        styles.lastMessage,
                        unreadCount ? styles.lastMessageUnread : null
                    ]} numberOfLines={1}>
                        {lastMessage}
                    </Text>
                    {unreadCount ? (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadCount}>{unreadCount}</Text>
                        </View>
                    ) : null}
                </View>
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
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    botBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
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
        flex: 1,
        marginRight: 8,
    },
    timestamp: {
        fontSize: 12,
        color: '#6b7280',
    },
    timestampUnread: {
        color: '#6366f1',
        fontWeight: '600',
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    lastMessage: {
        fontSize: 14,
        color: '#6b7280',
        flex: 1,
        marginRight: 8,
    },
    lastMessageUnread: {
        color: '#1f2937',
        fontWeight: '500',
    },
    unreadBadge: {
        backgroundColor: '#6366f1',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    unreadCount: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
}); 