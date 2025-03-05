import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, TextInput, KeyboardAvoidingView, Platform, SafeAreaView, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

// Mock data for tasks (same as in index.tsx)
const tasks = [
    {
        id: '1',
        title: 'Summarize emails',
        completed: false,
        category: 'inbox',
        recurring: { type: 'daily', time: '9 am' },
        participants: [
            { id: 'email-bot', type: 'bot', icon: '📧', name: 'Email Assistant' }
        ],
        description: 'Automatically summarize important emails and create action items.',
        messages: [
            { id: 'm1', sender: 'email-bot', content: 'I found 3 important emails in your inbox today.', timestamp: '9:05 am', type: 'text' },
            { id: 'm2', sender: 'email-bot', content: 'Email from john@example.com: Meeting rescheduled to 3pm tomorrow.', timestamp: '9:06 am', type: 'text' },
            { id: 'm3', sender: 'email-bot', content: 'Email from sales@company.com: Q1 report is ready for review.', timestamp: '9:07 am', type: 'text' },
            { id: 'm4', sender: 'email-bot', content: 'Email from support@service.com: Your ticket #12345 has been resolved.', timestamp: '9:08 am', type: 'text' },
            { id: 'm5', sender: 'system', content: 'Generated summary document', timestamp: '9:10 am', type: 'document', documentTitle: 'Email Summary - Today' },
        ]
    },
    {
        id: '2',
        title: 'Research new AI startups',
        completed: false,
        category: 'inbox',
        participants: [
            { id: 'research-bot', type: 'bot', icon: '🌐', name: 'Research Assistant' },
            { id: 'ai-bot', type: 'bot', icon: '🤖', name: 'AI Expert' }
        ],
        description: 'Find and analyze promising AI startups in the NLP space.',
        messages: [
            { id: 'm1', sender: 'research-bot', content: 'I\'ve started researching AI startups focused on NLP.', timestamp: '10:15 am', type: 'text' },
            { id: 'm2', sender: 'ai-bot', content: 'I\'ll help evaluate their technical approaches and innovations.', timestamp: '10:16 am', type: 'text' },
            { id: 'm3', sender: 'research-bot', content: 'Found 5 promising startups so far. Gathering more details on each.', timestamp: '10:30 am', type: 'text' },
            { id: 'm4', sender: 'system', content: 'Generated research document', timestamp: '11:00 am', type: 'document', documentTitle: 'AI Startup Analysis' },
        ]
    },
    {
        id: '3',
        title: 'Coordinate meeting',
        completed: false,
        category: 'inbox',
        participants: [
            { id: 'calendar-bot', type: 'bot', icon: '📅', name: 'Calendar Assistant' },
            { id: 'user-1', type: 'human', icon: '👤', name: 'John Smith' }
        ],
        description: 'Schedule and prepare for the quarterly planning meeting.',
        messages: [
            { id: 'm1', sender: 'calendar-bot', content: 'I\'ve found a few time slots that work for everyone.', timestamp: '2:00 pm', type: 'text' },
            { id: 'm2', sender: 'user-1', content: 'Thursday afternoon works best for me.', timestamp: '2:15 pm', type: 'text' },
            { id: 'm3', sender: 'calendar-bot', content: 'Great! I\'ve scheduled the meeting for Thursday at 3:00 PM.', timestamp: '2:20 pm', type: 'text' },
            { id: 'm4', sender: 'calendar-bot', content: 'I\'ll prepare the agenda based on previous meetings.', timestamp: '2:21 pm', type: 'text' },
            { id: 'm5', sender: 'system', content: 'Generated meeting document', timestamp: '2:30 pm', type: 'document', documentTitle: 'Meeting Agenda' },
        ]
    },
    {
        id: '4',
        title: 'Revenue report',
        completed: false,
        category: 'finance',
        recurring: { type: 'daily', time: '9 am' },
        participants: [
            { id: 'finance-bot', type: 'bot', icon: '💰', name: 'Finance Assistant' }
        ],
        description: 'Generate daily revenue reports and highlight key metrics.',
        messages: [
            { id: 'm1', sender: 'finance-bot', content: 'I\'ve analyzed today\'s revenue data.', timestamp: '9:15 am', type: 'text' },
            { id: 'm2', sender: 'finance-bot', content: 'Revenue is up 5% compared to yesterday.', timestamp: '9:16 am', type: 'text' },
            { id: 'm3', sender: 'finance-bot', content: 'Key growth areas: Product A (+12%), Service B (+8%)', timestamp: '9:17 am', type: 'text' },
            { id: 'm4', sender: 'finance-bot', content: 'Areas of concern: Product C (-3%)', timestamp: '9:18 am', type: 'text' },
            { id: 'm5', sender: 'system', content: 'Generated finance document', timestamp: '9:20 am', type: 'document', documentTitle: 'Daily Revenue Report' },
        ]
    },
    {
        id: '5',
        title: 'Proposed fix for issue',
        completed: false,
        category: 'code',
        participants: [
            { id: 'code-bot', type: 'bot', icon: '💻', name: 'Code Assistant' },
            { id: 'github-bot', type: 'bot', icon: '🐙', name: 'GitHub Assistant' }
        ],
        description: 'Analyze and fix the performance issue in the authentication module.',
        messages: [
            { id: 'm1', sender: 'github-bot', content: 'I\'ve analyzed issue #123 regarding authentication performance.', timestamp: '3:00 pm', type: 'text' },
            { id: 'm2', sender: 'code-bot', content: 'The issue appears to be in the token validation function.', timestamp: '3:05 pm', type: 'text' },
            { id: 'm3', sender: 'code-bot', content: 'I\'ve identified a potential fix by optimizing the database query.', timestamp: '3:15 pm', type: 'text' },
            { id: 'm4', sender: 'github-bot', content: 'Created a pull request with the proposed fix.', timestamp: '3:30 pm', type: 'text' },
            { id: 'm5', sender: 'system', content: 'Generated code document', timestamp: '3:35 pm', type: 'document', documentTitle: 'PR #456: Auth Performance Fix' },
        ]
    },
];

export default function TaskDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [message, setMessage] = useState('');
    const [showDocumentsModal, setShowDocumentsModal] = useState(false);

    // Find the task based on the ID
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Task not found</Text>
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    // Get documents from messages
    const documents = task.messages
        .filter(msg => msg.type === 'document')
        .map(msg => ({
            id: msg.id,
            title: msg.documentTitle || 'Document',
            timestamp: msg.timestamp,
        }));

    const handleSendMessage = () => {
        if (message.trim()) {
            // In a real app, this would add the message to the task
            console.log('Sending message:', message);
            setMessage('');
        }
    };

    const toggleDocumentsModal = () => {
        setShowDocumentsModal(!showDocumentsModal);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Pressable style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#fff" />
                    </Pressable>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>{task.title}</Text>
                        <View style={styles.participantsRow}>
                            {task.participants.map(participant => (
                                <View key={participant.id} style={styles.participantBadge}>
                                    <Text style={styles.participantIcon}>{participant.icon}</Text>
                                    <Text style={styles.participantName}>{participant.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <Pressable style={styles.headerButton} onPress={toggleDocumentsModal}>
                        <Ionicons name="document-text-outline" size={24} color="#fff" />
                    </Pressable>
                </View>

                <ScrollView style={styles.chatContainer}>
                    <View style={styles.taskDescription}>
                        <Text style={styles.descriptionText}>{task.description}</Text>
                    </View>

                    {task.messages.map(msg => {
                        const isSystem = msg.sender === 'system';
                        const participant = isSystem
                            ? { name: 'System', icon: '🔄' }
                            : task.participants.find(p => p.id === msg.sender);

                        if (isSystem && msg.type === 'document') {
                            return (
                                <View key={msg.id} style={styles.systemMessage}>
                                    <Ionicons name="document-text" size={20} color="#8e8e93" />
                                    <Text style={styles.systemMessageText}>
                                        {msg.content}: <Text style={styles.documentLink}>{msg.documentTitle}</Text>
                                    </Text>
                                    <Text style={styles.messageTime}>{msg.timestamp}</Text>
                                </View>
                            );
                        }

                        return (
                            <View key={msg.id} style={styles.messageContainer}>
                                <View style={styles.messageSender}>
                                    <Text style={styles.senderIcon}>{participant?.icon}</Text>
                                </View>
                                <View style={styles.messageContent}>
                                    <Text style={styles.senderName}>{participant?.name}</Text>
                                    <Text style={styles.messageText}>{msg.content}</Text>
                                    <Text style={styles.messageTime}>{msg.timestamp}</Text>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        placeholderTextColor="#8e8e93"
                        value={message}
                        onChangeText={setMessage}
                        multiline
                    />
                    <Pressable
                        style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
                        onPress={handleSendMessage}
                        disabled={!message.trim()}
                    >
                        <Ionicons name="send" size={20} color={message.trim() ? "#fff" : "#555"} />
                    </Pressable>
                </View>

                {/* Documents Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showDocumentsModal}
                    onRequestClose={toggleDocumentsModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Documents & Outputs</Text>
                                <Pressable onPress={toggleDocumentsModal}>
                                    <Ionicons name="close" size={24} color="#fff" />
                                </Pressable>
                            </View>

                            <ScrollView style={styles.documentsGrid}>
                                {documents.map(doc => (
                                    <Pressable key={doc.id} style={styles.documentCard}>
                                        <View style={styles.documentIconContainer}>
                                            <Ionicons name="document-text" size={24} color="#fff" />
                                        </View>
                                        <View style={styles.documentInfo}>
                                            <Text style={styles.documentTitle}>{doc.title}</Text>
                                            <Text style={styles.documentTimestamp}>{doc.timestamp}</Text>
                                        </View>
                                        <Ionicons name="chevron-forward" size={20} color="#8e8e93" />
                                    </Pressable>
                                ))}
                                <Pressable style={styles.addDocumentCard}>
                                    <Ionicons name="add-circle" size={24} color="#0a84ff" />
                                    <Text style={styles.addDocumentText}>Create New Document</Text>
                                </Pressable>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1c1c1e',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        flex: 1,
        marginLeft: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    participantsRow: {
        flexDirection: 'row',
        marginTop: 4,
    },
    participantBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1c1c1e',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 8,
    },
    participantIcon: {
        marginRight: 4,
    },
    participantName: {
        fontSize: 12,
        color: '#fff',
    },
    headerButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatContainer: {
        flex: 1,
        padding: 16,
    },
    taskDescription: {
        backgroundColor: '#1c1c1e',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: 14,
        color: '#fff',
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    messageSender: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#2c2c2e',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    senderIcon: {
        fontSize: 16,
    },
    messageContent: {
        flex: 1,
        backgroundColor: '#1c1c1e',
        borderRadius: 12,
        padding: 12,
    },
    senderName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
    },
    messageText: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 4,
    },
    messageTime: {
        fontSize: 12,
        color: '#8e8e93',
        alignSelf: 'flex-end',
    },
    systemMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
    },
    systemMessageText: {
        fontSize: 12,
        color: '#8e8e93',
        marginHorizontal: 8,
    },
    documentLink: {
        color: '#0a84ff',
        textDecorationLine: 'underline',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#1c1c1e',
    },
    input: {
        flex: 1,
        backgroundColor: '#1c1c1e',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        color: '#fff',
        maxHeight: 100,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#0a84ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    sendButtonDisabled: {
        backgroundColor: '#2c2c2e',
    },
    errorText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginTop: 100,
    },
    backButtonText: {
        fontSize: 16,
        color: '#0a84ff',
        textAlign: 'center',
        marginTop: 16,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#1c1c1e',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 30,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#2c2c2e',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    documentsGrid: {
        padding: 16,
    },
    documentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2c2c2e',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    documentIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#3a3a3c',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    documentInfo: {
        flex: 1,
    },
    documentTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
    },
    documentTimestamp: {
        fontSize: 12,
        color: '#8e8e93',
    },
    addDocumentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2c2c2e',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        justifyContent: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#3a3a3c',
    },
    addDocumentText: {
        fontSize: 16,
        color: '#0a84ff',
        marginLeft: 8,
    },
}); 