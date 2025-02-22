import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BaseCard } from './BaseCard';

export interface ChatCardProps {
    title: string;
    description: string;
    onPress?: () => void;
    ctaText?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
}

export function ChatCard({
    title,
    description,
    onPress,
    ctaText = "Start practice",
    icon = "barbell-outline",
    iconColor = "#000"
}: ChatCardProps) {
    return (
        <BaseCard onPress={onPress}>
            <View style={styles.chatIconContainer}>
                <Ionicons name={icon} size={24} color={iconColor} />
            </View>
            <View style={styles.chatContent}>
                <Text style={styles.chatTitle}>{title}</Text>
                <Text style={styles.chatDescription}>{description}</Text>
            </View>
            <TouchableOpacity style={styles.startButton} onPress={onPress}>
                <Text style={styles.startButtonText}>{ctaText}</Text>
            </TouchableOpacity>
        </BaseCard>
    );
}

const styles = StyleSheet.create({
    chatIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8FB60',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    chatContent: {
        marginBottom: 16,
    },
    chatTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    chatDescription: {
        fontSize: 16,
        color: '#6b7280',
    },
    startButton: {
        backgroundColor: '#E8FB60',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    startButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
}); 