import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AraProfile from '@/components/AraProfile';

type SettingsItem = {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value?: string;
    color?: string;
    onPress?: () => void;
};

const settingsItems: SettingsItem[] = [
    {
        id: 'profile',
        icon: 'person-outline',
        label: 'Profile',
    },
    {
        id: 'search',
        icon: 'search-outline',
        label: 'Search',
    },
    {
        id: 'mute',
        icon: 'notifications-outline',
        label: 'Mute',
    },
    {
        id: 'options',
        icon: 'ellipsis-horizontal',
        label: 'Options',
    },
];

const menuItems: SettingsItem[] = [
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

export default function ChatDetailsScreen() {
    const router = useRouter();

    const renderSettingsItem = (item: SettingsItem) => (
        <TouchableOpacity
            key={item.id}
            style={styles.settingsItem}
            onPress={item.onPress}
        >
            <View style={styles.settingsItemLeft}>
                <Ionicons
                    name={item.icon}
                    size={24}
                    color={item.color || '#6b7280'}
                />
                <Text style={[
                    styles.settingsItemLabel,
                    item.color && { color: item.color }
                ]}>
                    {item.label}
                </Text>
            </View>
            {item.value && (
                <View style={styles.settingsItemRight}>
                    <Text style={styles.settingsItemValue}>{item.value}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color="#6b7280" />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.content}>
                    <View style={styles.profileSection}>
                        <AraProfile size={96} style={styles.profilePic} />
                        <Text style={styles.profileName}>Ara</Text>
                    </View>

                    <View style={styles.quickActions}>
                        {settingsItems.map(item => (
                            <TouchableOpacity key={item.id} style={styles.quickActionItem}>
                                <Ionicons name={item.icon} size={24} color="#6b7280" />
                                <Text style={styles.quickActionLabel}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.menuSection}>
                        {menuItems.map(renderSettingsItem)}
                    </View>

                    <View style={styles.mediaSection}>
                        <Text style={styles.sectionTitle}>Shared media</Text>
                        <Text style={styles.mediaPlaceholder}>
                            Photos and videos shared in this chat will appear here.
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    backButton: {
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    profilePic: {
        marginBottom: 12,
    },
    profileName: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1f2937',
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    quickActionItem: {
        alignItems: 'center',
        gap: 4,
    },
    quickActionLabel: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 4,
    },
    menuSection: {
        paddingTop: 8,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    settingsItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    settingsItemLabel: {
        fontSize: 16,
        color: '#1f2937',
    },
    settingsItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    settingsItemValue: {
        fontSize: 14,
        color: '#6b7280',
    },
    mediaSection: {
        padding: 16,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 8,
    },
    mediaPlaceholder: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
    },
}); 