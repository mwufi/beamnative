import { StyleSheet, ScrollView, View, Text, Pressable, Image, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function MeScreen() {
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [dataUsage, setDataUsage] = useState(false);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.profileSection}>
                <LinearGradient
                    colors={['#8e44ad', '#3498db']}
                    style={styles.avatarGradient}
                >
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                        style={styles.avatar}
                    />
                </LinearGradient>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.username}>@johndoe</Text>
                <Pressable style={styles.editProfileButton}>
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                </Pressable>
            </View>

            <View style={styles.statsSection}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>42</Text>
                    <Text style={styles.statLabel}>Friends</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>156</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>28</Text>
                    <Text style={styles.statLabel}>Chats</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Activities</Text>

                <Pressable
                    style={styles.menuItem}
                    onPress={() => router.push('/challenges/my' as any)}
                >
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="trophy-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>My Challenges</Text>
                    </View>
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>

                <Pressable
                    style={styles.menuItem}
                    onPress={() => router.push('/events/my' as any)}
                >
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="calendar-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>My Events</Text>
                    </View>
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>2</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>

                <Pressable
                    style={styles.menuItem}
                    onPress={() => router.push('/learning/my' as any)}
                >
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="school-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>My Learning Paths</Text>
                    </View>
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>1</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>

                <Pressable
                    style={styles.menuItem}
                    onPress={() => router.push('/ara/creations' as any)}
                >
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="document-text-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>My Creations</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ara Features</Text>

                <Pressable
                    style={styles.menuItem}
                    onPress={() => router.push('/ara/labs' as any)}
                >
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="flask-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>Ara Labs</Text>
                    </View>
                    <View style={styles.newFeatureBadge}>
                        <Text style={styles.newFeatureText}>NEW</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>

                <Pressable
                    style={styles.menuItem}
                    onPress={() => router.push('/ara/create' as any)}
                >
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="create-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>Creative Studio</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>

                <Pressable style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="person-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>Personal Information</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>

                <Pressable style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="lock-closed-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>Privacy & Security</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>

                <Pressable style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="notifications-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>Notifications</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preferences</Text>

                <View style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="moon-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>Dark Mode</Text>
                    </View>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        trackColor={{ false: '#767577', true: '#8e44ad' }}
                        thumbColor={darkMode ? '#f4f3f4' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="notifications-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>Enable Notifications</Text>
                    </View>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ false: '#767577', true: '#8e44ad' }}
                        thumbColor={notifications ? '#f4f3f4' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="cellular-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>Reduce Data Usage</Text>
                    </View>
                    <Switch
                        value={dataUsage}
                        onValueChange={setDataUsage}
                        trackColor={{ false: '#767577', true: '#8e44ad' }}
                        thumbColor={dataUsage ? '#f4f3f4' : '#f4f3f4'}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>

                <Pressable style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="help-circle-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>Help & Support</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>

                <Pressable style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="document-text-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>Terms & Policies</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>

                <Pressable style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="information-circle-outline" size={24} color="white" />
                        <Text style={styles.menuItemText}>About Ara</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>
            </View>

            <Pressable style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log Out</Text>
            </Pressable>

            <Text style={styles.versionText}>Version 1.0.0</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarGradient: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 92,
        height: 92,
        borderRadius: 46,
        borderWidth: 2,
        borderColor: '#121212',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    username: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 16,
    },
    editProfileButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
    },
    editProfileText: {
        color: 'white',
        fontWeight: '500',
    },
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    statDivider: {
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuItemText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 12,
    },
    badgeContainer: {
        backgroundColor: '#8e44ad',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 8,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    newFeatureBadge: {
        backgroundColor: '#e74c3c',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 8,
    },
    newFeatureText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#e74c3c',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    versionText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 14,
        textAlign: 'center',
    },
}); 