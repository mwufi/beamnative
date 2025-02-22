import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

export interface BaseCardProps {
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
}

export function BaseCard({ onPress, style, children }: BaseCardProps) {
    const Container = onPress ? TouchableOpacity : View;

    return (
        <Container
            style={[styles.card, style]}
            onPress={onPress}
        >
            {children}
        </Container>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        marginBottom: 16,
    },
}); 