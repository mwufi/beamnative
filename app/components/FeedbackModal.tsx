import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TextInput,
    Animated,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FeedbackModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (feedback: { type: string; message: string }) => void;
}

export default function FeedbackModal({ isVisible, onClose, onSubmit }: FeedbackModalProps) {
    const [feedbackType, setFeedbackType] = useState<string>('');
    const [message, setMessage] = useState('');
    const slideAnim = React.useRef(new Animated.Value(0)).current;

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

    const handleSubmit = () => {
        if (feedbackType && message.trim()) {
            onSubmit({ type: feedbackType, message: message.trim() });
            setFeedbackType('');
            setMessage('');
            onClose();
        }
    };

    const feedbackTypes = [
        { id: 'suggestion', label: 'Suggestion', icon: 'bulb-outline' },
        { id: 'issue', label: 'Issue', icon: 'warning-outline' },
        { id: 'praise', label: 'Praise', icon: 'heart-outline' },
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
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={styles.keyboardView}
                        >
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
                                    <Text className="text-xl font-semibold text-gray-800">Give Feedback</Text>
                                    <TouchableOpacity onPress={onClose}>
                                        <Ionicons name="close" size={24} color="#6b7280" />
                                    </TouchableOpacity>
                                </View>

                                <Text className="text-base text-gray-500 mb-4">What kind of feedback do you have?</Text>

                                <View className="flex-row justify-between mb-6">
                                    {feedbackTypes.map((type) => (
                                        <TouchableOpacity
                                            key={type.id}
                                            className={`flex-1 items-center p-3 rounded-xl mx-1 ${feedbackType === type.id ? 'bg-indigo-50' : 'bg-gray-50'
                                                }`}
                                            onPress={() => setFeedbackType(type.id)}
                                        >
                                            <Ionicons
                                                name={type.icon as any}
                                                size={24}
                                                color={feedbackType === type.id ? '#6366f1' : '#6b7280'}
                                            />
                                            <Text
                                                className={`mt-2 ${feedbackType === type.id
                                                    ? 'text-indigo-500 font-medium'
                                                    : 'text-gray-500'
                                                    }`}
                                            >
                                                {type.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <TextInput
                                    className="bg-gray-50 rounded-xl p-4 min-h-[120] text-base text-gray-800 mb-6"
                                    placeholder="Tell us more about your feedback..."
                                    multiline
                                    numberOfLines={4}
                                    value={message}
                                    onChangeText={setMessage}
                                />

                                <TouchableOpacity
                                    className={`p-4 rounded-xl items-center ${(!feedbackType || !message.trim())
                                        ? 'bg-gray-200'
                                        : 'bg-indigo-500'
                                        }`}
                                    onPress={handleSubmit}
                                    disabled={!feedbackType || !message.trim()}
                                >
                                    <Text className="text-base font-semibold text-white">
                                        Submit Feedback
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </KeyboardAvoidingView>
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
    keyboardView: {
        width: '100%',
    },
    sheet: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        maxHeight: '90%',
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