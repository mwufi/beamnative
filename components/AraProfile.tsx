import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type AraProfileProps = {
    size?: number;
    style?: any;
};

export default function AraProfile({ size = 32, style }: AraProfileProps) {
    const [hasProfilePic, setHasProfilePic] = useState(true);

    const styles = StyleSheet.create({
        container: {
            width: size,
            height: size,
            borderRadius: size / 2,
            overflow: 'hidden',
            backgroundColor: '#e0e7ff',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        fallback: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    return (
        <View style={[styles.container, style]}>
            {hasProfilePic ? (
                <Image
                    source={require('@/assets/images/0_0.webp')}
                    style={styles.image}
                    onError={() => setHasProfilePic(false)}
                />
            ) : (
                <View style={styles.fallback}>
                    <Ionicons name="person-circle" size={size} color="#6366f1" />
                </View>
            )}
        </View>
    );
} 