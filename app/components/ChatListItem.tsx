import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import AraProfile from '@/components/AraProfile';

type ChatListItemProps = {
    id: string;
    name: string;
    lastMessage: string;
    profilePicture?: string;
    timestamp?: string;
    isBot?: boolean;
    unreadCount?: number;
    isPinned?: boolean;
    style?: any;
    onPin?: () => void;
    onArchive?: () => void;
    onMore?: () => void;
};

export default function ChatListItem({
    id,
    name,
    lastMessage,
    profilePicture,
    timestamp,
    isBot,
    unreadCount,
    isPinned,
    style,
    onPin,
    onArchive,
    onMore
}: ChatListItemProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/chat/${id}` as any); // TODO: Fix type
    };

    const handleAction = async (action: () => void) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        action();
    };

    const renderRightActions = (progress: SharedValue<number>, dragX: SharedValue<number>) => {
        const actionStyle = useAnimatedStyle(() => {
            return {
                transform: [{ translateX: dragX.value }],
                opacity: progress.value,
            };
        });

        return (
            <Reanimated.View style={[styles.rightActions, actionStyle]}>
                <RectButton
                    style={[styles.actionButton, styles.pinButton]}
                    onPress={() => handleAction(onPin || (() => { }))}
                >
                    <Ionicons
                        name={isPinned ? "pin" : "pin-outline"}
                        size={20}
                        color="#fff"
                    />
                </RectButton>
                <RectButton
                    style={[styles.actionButton, styles.archiveButton]}
                    onPress={() => handleAction(onArchive || (() => { }))}
                >
                    <Ionicons name="archive-outline" size={20} color="#fff" />
                </RectButton>
                <RectButton
                    style={[styles.actionButton, styles.moreButton]}
                    onPress={() => handleAction(onMore || (() => { }))}
                >
                    <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
                </RectButton>
            </Reanimated.View>
        );
    };

    return (
        <ReanimatedSwipeable
            friction={2}
            enableTrackpadTwoFingerGesture
            rightThreshold={40}
            renderRightActions={renderRightActions}
            containerStyle={styles.swipeableContainer}
        >
            <RectButton style={[styles.container, style]} onPress={handlePress}>
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
                        <View style={styles.nameContainer}>
                            {isPinned && (
                                <Ionicons
                                    name="pin"
                                    size={12}
                                    color="#6366f1"
                                    style={styles.pinIcon}
                                />
                            )}
                            <Text style={styles.name} numberOfLines={1}>{name}</Text>
                        </View>
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
            </RectButton>
        </ReanimatedSwipeable>
    );
}

const styles = StyleSheet.create({
    swipeableContainer: {
        backgroundColor: '#fff',
    },
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
    rightActions: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 4,
    },
    actionButton: {
        width: 48,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    pinButton: {
        backgroundColor: '#6366f1',
    },
    archiveButton: {
        backgroundColor: '#10b981',
    },
    moreButton: {
        backgroundColor: '#6b7280',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    pinIcon: {
        marginRight: 4,
    },
}); 