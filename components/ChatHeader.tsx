import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Profile = {
    name: string;
    profilePic?: string;
    subtitle?: string;
};

type ChatHeaderProps = {
    profile: Profile;
    onProfilePress?: () => void;
    children?: React.ReactNode;
};

type RightButtonsProps = {
    children: React.ReactNode;
};

const RightButtons: React.FC<RightButtonsProps> = ({ children }) => {
    return (
        <View style={styles.rightButtons}>
            {children}
        </View>
    );
};

const ChatHeader = ({ profile, onProfilePress, children }: ChatHeaderProps) => {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="#6b7280" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.profileSection}
                onPress={onProfilePress}
                disabled={!onProfilePress}
            >
                {profile.profilePic ? (
                    <Image
                        source={{ uri: profile.profilePic }}
                        style={styles.profilePic}
                    />
                ) : (
                    <View style={styles.profilePicPlaceholder}>
                        <Ionicons name="person-circle" size={32} color="#6366f1" />
                    </View>
                )}

                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>{profile.name}</Text>
                    {profile.subtitle && (
                        <Text style={styles.subtitle}>{profile.subtitle}</Text>
                    )}
                </View>
            </TouchableOpacity>

            {children}
        </View>
    );
};

// Attach RightButtons as a static property
ChatHeader.RightButtons = RightButtons;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        backgroundColor: '#fff',
    },
    backButton: {
        marginRight: 12,
    },
    profileSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 12,
    },
    profilePicPlaceholder: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#e0e7ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
    },
    subtitle: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
    },
    rightButtons: {
        flexDirection: 'row',
        gap: 16,
        marginLeft: 12,
    },
});

export default ChatHeader; 