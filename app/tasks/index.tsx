import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

// Mock data for tasks
const tasks = [
    {
        id: '1',
        title: 'Summarize emails',
        completed: false,
        category: 'inbox',
        recurring: { type: 'daily', time: '9 am' },
        participants: [
            { id: 'email-bot', type: 'bot', icon: '📧' }
        ]
    },
    {
        id: '2',
        title: 'Research new AI startups',
        completed: false,
        category: 'inbox',
        participants: [
            { id: 'research-bot', type: 'bot', icon: '🌐' },
            { id: 'ai-bot', type: 'bot', icon: '🤖' }
        ]
    },
    {
        id: '3',
        title: 'Coordinate meeting',
        completed: false,
        category: 'inbox',
        participants: [
            { id: 'calendar-bot', type: 'bot', icon: '📅' },
            { id: 'user-1', type: 'human', icon: '👤' }
        ]
    },
    {
        id: '4',
        title: 'Revenue report',
        completed: false,
        category: 'finance',
        recurring: { type: 'daily', time: '9 am' },
        participants: [
            { id: 'finance-bot', type: 'bot', icon: '💰' }
        ]
    },
    {
        id: '5',
        title: 'Proposed fix for issue',
        completed: false,
        category: 'code',
        participants: [
            { id: 'code-bot', type: 'bot', icon: '💻' },
            { id: 'github-bot', type: 'bot', icon: '🐙' }
        ]
    },
];

export default function TasksScreen() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredTasks = tasks;

    const handleTaskPress = (taskId: string) => {
        router.push(`/tasks/${taskId}`);
    };

    // Group tasks by category for display
    const tasksByCategory = filteredTasks.reduce((acc, task) => {
        if (!acc[task.category]) {
            acc[task.category] = [];
        }
        acc[task.category].push(task);
        return acc;
    }, {} as Record<string, typeof tasks>);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => router.replace('/')}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </Pressable>
                <Text style={styles.headerTitle}>Tasks</Text>
                <Pressable style={styles.headerButton}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
                </Pressable>
            </View>

            <ScrollView style={styles.tasksContainer}>
                {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
                    <View key={category} style={styles.categorySection}>
                        <View style={styles.categorySectionHeader}>
                            <Text style={styles.categorySectionTitle}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </Text>
                            <Ionicons name="chevron-forward" size={20} color="#8e8e93" />
                        </View>

                        {categoryTasks.map(task => (
                            <Pressable
                                key={task.id}
                                style={styles.taskItem}
                                onPress={() => handleTaskPress(task.id)}
                            >
                                <Pressable style={styles.checkbox}>
                                    <Ionicons
                                        name={task.completed ? "checkmark-circle" : "ellipse-outline"}
                                        size={24}
                                        color={task.completed ? "#4cd964" : "#8e8e93"}
                                    />
                                </Pressable>

                                <View style={styles.taskContent}>
                                    <Text style={styles.taskTitle}>{task.title}</Text>
                                    {task.recurring && (
                                        <View style={styles.recurringIndicator}>
                                            <Ionicons name="repeat" size={14} color="#8e8e93" />
                                            <Text style={styles.recurringText}>Daily {task.recurring.time}</Text>
                                        </View>
                                    )}
                                </View>

                                <View style={styles.participantsContainer}>
                                    {task.participants.map((participant, index) => (
                                        <View
                                            key={participant.id}
                                            style={[
                                                styles.participantIcon,
                                                { zIndex: task.participants.length - index }
                                            ]}
                                        >
                                            <Text>{participant.icon}</Text>
                                        </View>
                                    ))}
                                </View>

                                <Ionicons name="chevron-forward" size={20} color="#8e8e93" />
                            </Pressable>
                        ))}
                    </View>
                ))}
            </ScrollView>

            <Pressable style={styles.addButton}>
                <Ionicons name="add" size={30} color="#fff" />
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tasksContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    categorySection: {
        marginBottom: 24,
    },
    categorySectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    categorySectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1c1c1e',
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
    },
    checkbox: {
        marginRight: 12,
    },
    taskContent: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 4,
    },
    recurringIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recurringText: {
        fontSize: 12,
        color: '#8e8e93',
        marginLeft: 4,
    },
    participantsContainer: {
        flexDirection: 'row',
        marginRight: 12,
    },
    participantIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#2c2c2e',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -8,
        borderWidth: 1,
        borderColor: '#000',
    },
    addButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0a84ff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 