import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BaseCard } from './BaseCard';

export interface TutorialCardProps {
    title: string;
    description: string;
    onPress?: () => void;
    ctaText?: string;
}

export function TutorialCard({
    title,
    description,
    onPress,
    ctaText = "Start Tutorial"
}: TutorialCardProps) {
    return (
        <BaseCard style={styles.tutorialCard}>
            <Text style={styles.tutorialTitle}>{title}</Text>
            <Text style={styles.tutorialText}>{description}</Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>{ctaText}</Text>
            </TouchableOpacity>
        </BaseCard>
    );
}

const styles = StyleSheet.create({
    tutorialCard: {
        backgroundColor: '#f9fafb',
    },
    tutorialTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    tutorialText: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 20,
        marginTop: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#6366f1',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
}); 