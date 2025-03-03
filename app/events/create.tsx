import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, TextInput, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

export default function CreateEventScreen() {
    const router = useRouter();

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [isVirtual, setIsVirtual] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [duration, setDuration] = useState('60');
    const [isPublic, setIsPublic] = useState(true);

    // Date/time picker state
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleCreateEvent = () => {
        // In a real app, we would send the event data to the server
        // For now, just navigate back to the events tab
        router.push('/discover' as any);
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const onTimeChange = (event: any, selectedTime?: Date) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(Platform.OS === 'ios');
        setTime(currentTime);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const formatTime = (time: Date) => {
        return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#121212', '#1a1a2e']}
                style={styles.gradient}
            >
                <View style={styles.header}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Text style={styles.headerTitle}>Create Event</Text>
                    <View style={styles.placeholderButton} />
                </View>

                <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>Event Details</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Title</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter event title"
                                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Description</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="What's your event about?"
                                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                        </View>
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>Location</Text>

                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Virtual Event</Text>
                            <Switch
                                value={isVirtual}
                                onValueChange={setIsVirtual}
                                trackColor={{ false: '#767577', true: '#8e44ad' }}
                                thumbColor={isVirtual ? '#f4f3f4' : '#f4f3f4'}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>{isVirtual ? 'Meeting Link' : 'Location'}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={isVirtual ? "Enter meeting link" : "Enter location"}
                                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                                value={location}
                                onChangeText={setLocation}
                            />
                        </View>
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>Date & Time</Text>

                        <Pressable
                            style={styles.dateTimeButton}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <View style={styles.dateTimeButtonContent}>
                                <Ionicons name="calendar" size={20} color="#8e44ad" />
                                <Text style={styles.dateTimeButtonText}>
                                    {formatDate(date)}
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                        </Pressable>

                        <Pressable
                            style={styles.dateTimeButton}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <View style={styles.dateTimeButtonContent}>
                                <Ionicons name="time" size={20} color="#8e44ad" />
                                <Text style={styles.dateTimeButtonText}>
                                    {formatTime(time)}
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                        </Pressable>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Duration (minutes)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="60"
                                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                                value={duration}
                                onChangeText={setDuration}
                                keyboardType="number-pad"
                            />
                        </View>

                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                                minimumDate={new Date()}
                            />
                        )}

                        {showTimePicker && (
                            <DateTimePicker
                                value={time}
                                mode="time"
                                display="default"
                                onChange={onTimeChange}
                            />
                        )}
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>Privacy</Text>

                        <View style={styles.switchContainer}>
                            <View>
                                <Text style={styles.switchLabel}>Public Event</Text>
                                <Text style={styles.switchDescription}>
                                    Anyone can discover and join your event
                                </Text>
                            </View>
                            <Switch
                                value={isPublic}
                                onValueChange={setIsPublic}
                                trackColor={{ false: '#767577', true: '#8e44ad' }}
                                thumbColor={isPublic ? '#f4f3f4' : '#f4f3f4'}
                            />
                        </View>
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>Invite Friends</Text>

                        <Pressable
                            style={styles.inviteButton}
                            onPress={() => { }}
                        >
                            <Ionicons name="person-add" size={20} color="white" />
                            <Text style={styles.inviteButtonText}>Invite Friends</Text>
                        </Pressable>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Pressable
                        style={[
                            styles.createButton,
                            (!title || !description || !location) && styles.disabledButton
                        ]}
                        onPress={handleCreateEvent}
                        disabled={!title || !description || !location}
                    >
                        <Text style={styles.createButtonText}>Create Event</Text>
                    </Pressable>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    gradient: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    placeholderButton: {
        width: 40,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 100,
    },
    formSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 8,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: 12,
        color: 'white',
        fontSize: 16,
    },
    textArea: {
        height: 100,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    switchLabel: {
        fontSize: 16,
        color: 'white',
    },
    switchDescription: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 4,
    },
    dateTimeButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    dateTimeButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    dateTimeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    inviteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: 12,
        gap: 8,
    },
    inviteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(18, 18, 18, 0.9)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        padding: 16,
    },
    createButton: {
        backgroundColor: '#8e44ad',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: 'rgba(142, 68, 173, 0.5)',
    },
    createButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 