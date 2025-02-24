import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SelectModalProps {
    isVisible: boolean;
    onClose: () => void;
    title: string;
    options: string[];
    selectedValue: string;
    onSelect: (value: string) => void;
}

export default function SelectModal({
    isVisible,
    onClose,
    title,
    options,
    selectedValue,
    onSelect
}: SelectModalProps) {
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

    const handleSelect = (value: string) => {
        onSelect(value);
        onClose();
    };

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
                                styles.modalContent,
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
                            <View style={styles.header}>
                                <Text style={styles.title}>{title}</Text>
                                <TouchableOpacity onPress={onClose}>
                                    <Ionicons name="close" size={24} color="#6b7280" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.optionsList}>
                                {options.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[
                                            styles.optionButton,
                                            selectedValue === option && styles.optionButtonSelected
                                        ]}
                                        onPress={() => handleSelect(option)}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                selectedValue === option && styles.optionTextSelected
                                            ]}
                                        >
                                            {option}
                                        </Text>
                                        {selectedValue === option && (
                                            <Ionicons name="checkmark" size={24} color="#6366f1" />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
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
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
    },
    optionsList: {
        marginBottom: 20,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    optionButtonSelected: {
        backgroundColor: '#f5f3ff',
    },
    optionText: {
        fontSize: 16,
        color: '#1f2937',
    },
    optionTextSelected: {
        color: '#6366f1',
        fontWeight: '600',
    },
}); 