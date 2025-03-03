import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
export default function StreakHeader() {
    const router = useRouter();

    return (
        <>
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcomeText}>For you</Text>
                </View>
                <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
                    <View style={styles.profileButton}>
                        <Text style={styles.streakCount}>1</Text>
                        <MaterialCommunityIcons name="lightning-bolt" size={16} color="#000" />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Streak indicators */}
            <View style={styles.streakContainer}>
                {['W', 'Th', 'F', 'S', 'Su'].map((day, index) => (
                    <View key={day} style={styles.streakDay}>
                        <View style={[
                            styles.streakIndicator,
                            index === 0 && styles.streakIndicatorActive
                        ]}>
                            <MaterialCommunityIcons
                                name="lightning-bolt"
                                size={20}
                                color="#000"
                                style={[
                                    styles.streakDayIcon,
                                    index === 0 && styles.streakDayIconActive
                                ]}
                            />
                        </View>
                        <Text style={styles.streakDayText}>{day}</Text>
                    </View>
                ))}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 20,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: '700',
        color: '#000',
    },
    profileButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8FB60',
        padding: 8,
        borderRadius: 20,
        gap: 4,
    },
    streakCount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    streakContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 40,
        marginBottom: 20,
    },
    streakDay: {
        alignItems: 'center',
        gap: 4,
    },
    streakIndicator: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    streakIndicatorActive: {
        backgroundColor: '#E8FB60',
    },
    streakDayIcon: {
        opacity: 0.3,
    },
    streakDayIconActive: {
        opacity: 1,
    },
    streakDayText: {
        fontSize: 14,
        color: '#6b7280',
    },
}); 