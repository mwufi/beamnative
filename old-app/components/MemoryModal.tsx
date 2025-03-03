import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Animated,
    Platform,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MemoryItem {
    id: string;
    type: 'fact' | 'preference' | 'context';
    content: string;
    timestamp: string;
}

interface MemoryModalProps {
    isVisible: boolean;
    onClose: () => void;
    onClearMemory: () => void;
}

export default function MemoryModal({ isVisible, onClose, onClearMemory }: MemoryModalProps) {
    const slideAnim = React.useRef(new Animated.Value(0)).current;
    const [selectedType, setSelectedType] = useState<string>('all');

    // Example memory items - replace with actual data
    const memoryItems: MemoryItem[] = [
        {
            id: '1',
            type: 'fact',
            content: 'User prefers dark mode',
            timestamp: '2 hours ago',
        },
        {
            id: '2',
            type: 'preference',
            content: 'Likes technical, detailed responses',
            timestamp: '1 day ago',
        },
        {
            id: '3',
            type: 'context',
            content: 'Working on a React Native project',
            timestamp: '3 days ago',
        },
    ];

    React.useEffect(() => {
        if (isVisible) {
            Animated.spring(slideAnim, {
                toValue: 1,
                useNativeDriver: true,
                damping: 20,
                stiffness: 90,
            }).start();
        } else {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                damping: 20,
                stiffness: 90,
            }).start();
        }
    }, [isVisible]);

    const filteredItems = selectedType === 'all'
        ? memoryItems
        : memoryItems.filter(item => item.type === selectedType);

    const memoryTypes = [
        { id: 'all', label: 'All' },
        { id: 'fact', label: 'Facts' },
        { id: 'preference', label: 'Preferences' },
        { id: 'context', label: 'Context' },
    ];

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                styles.sheet,
                                {
                                    transform: [{
                                        translateY: slideAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [600, 0],
                                        })
                                    }]
                                }
                            ]}
                        >
                            <View className="flex-row justify-between items-center mb-5">
                                <Text className="text-xl font-semibold text-gray-800">Memory & Context</Text>
                                <TouchableOpacity onPress={onClose}>
                                    <Ionicons name="close" size={24} color="#6b7280" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                className="mb-5"
                                contentContainerClassName="px-1"
                            >
                                {memoryTypes.map((type) => (
                                    <TouchableOpacity
                                        key={type.id}
                                        className={`px-4 py-2 rounded-full mr-2 ${selectedType === type.id ? 'bg-indigo-50' : 'bg-gray-50'}`}
                                        onPress={() => setSelectedType(type.id)}
                                    >
                                        <Text
                                            className={`${selectedType === type.id ? 'text-indigo-500 font-medium' : 'text-gray-500'}`}
                                        >
                                            {type.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            <ScrollView className="max-h-[60%]">
                                {filteredItems.map((item) => (
                                    <View key={item.id} className="bg-gray-50 rounded-xl p-4 mb-3">
                                        <View className="flex-row justify-between items-center mb-2">
                                            <View className="bg-indigo-50 px-2 py-1 rounded-lg">
                                                <Text className="text-xs font-medium text-indigo-500">
                                                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                                </Text>
                                            </View>
                                            <Text className="text-xs text-gray-500">{item.timestamp}</Text>
                                        </View>
                                        <Text className="text-sm text-gray-800 leading-5">{item.content}</Text>
                                    </View>
                                ))}
                            </ScrollView>

                            <TouchableOpacity
                                className="flex-row items-center justify-center p-4 rounded-xl bg-red-50 mt-5"
                                onPress={onClearMemory}
                            >
                                <Ionicons name="trash-outline" size={20} color="#ef4444" />
                                <Text className="ml-2 text-base font-semibold text-red-500">
                                    Clear All Memory
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 5,
        ...(Platform.OS === 'web' ? {
            width: '100%',
            maxWidth: '100%',
            boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.1)',
        } : {}),
    },
}); 