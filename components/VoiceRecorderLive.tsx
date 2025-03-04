import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Platform,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { BlurView } from 'expo-blur';

interface VoiceRecorderLiveProps {
    onRecordingComplete: (uri: string, duration: number) => void;
    onCancel: () => void;
}

const VoiceRecorderLive: React.FC<VoiceRecorderLiveProps> = ({
    onRecordingComplete,
    onCancel
}) => {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [volumeLevel, setVolumeLevel] = useState<number[]>(Array(10).fill(0.3));
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
    const volumeUpdateRef = useRef<NodeJS.Timeout | null>(null);
    const animatedValues = useRef<Animated.Value[]>(
        Array(10).fill(0).map(() => new Animated.Value(0.3))
    );

    useEffect(() => {
        // Start recording immediately
        startRecording();

        // Clean up on unmount
        return () => {
            if (recordingTimerRef.current) {
                clearInterval(recordingTimerRef.current);
            }
            if (volumeUpdateRef.current) {
                clearInterval(volumeUpdateRef.current);
            }
            if (recording) {
                recording.stopAndUnloadAsync();
            }
        };
    }, []);

    // Animate volume bars when volume levels change
    useEffect(() => {
        volumeLevel.forEach((level, index) => {
            Animated.timing(animatedValues.current[index], {
                toValue: level,
                duration: 100,
                useNativeDriver: true,
            }).start();
        });
    }, [volumeLevel]);

    const startRecording = async () => {
        try {
            // Check if we're on web - audio recording not supported
            if (Platform.OS === 'web') {
                Alert.alert(
                    'Not Supported',
                    'Audio recording is not supported on web. Please use a mobile device for this feature.',
                    [{ text: 'OK' }]
                );
                onCancel();
                return;
            }

            setRecordingDuration(0);

            // Start timer for recording duration
            recordingTimerRef.current = setInterval(() => {
                setRecordingDuration(prev => prev + 1);
            }, 1000);

            // Configure recording
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // Create and start recording with metering enabled
            const { recording } = await Audio.Recording.createAsync(
                {
                    ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
                    android: {
                        ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
                    },
                    ios: {
                        ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
                        extension: '.m4a',
                        outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
                        audioQuality: Audio.IOSAudioQuality.HIGH,
                        sampleRate: 44100,
                        numberOfChannels: 2,
                        bitRate: 128000,
                        linearPCMBitDepth: 16,
                        linearPCMIsBigEndian: false,
                        linearPCMIsFloat: false,
                    },
                }
            );
            setRecording(recording);
            setIsAnalyzing(true);

            // Start volume level analysis
            startVolumeAnalysis(recording);

        } catch (err) {
            console.error('Failed to start recording', err);
            onCancel();
        }
    };

    const startVolumeAnalysis = (recording: Audio.Recording) => {
        // Update volume levels periodically
        volumeUpdateRef.current = setInterval(async () => {
            try {
                if (recording && Platform.OS !== 'web') {
                    const status = await recording.getStatusAsync();

                    // On iOS, we can get the metering level
                    if (Platform.OS === 'ios' && status.metering !== undefined) {
                        // Convert dB to a value between 0 and 1
                        // Typical values are between -160 and 0 dB
                        const db = status.metering ?? -160;
                        const normalized = Math.max(0, (db + 160) / 160); // Normalize to 0-1

                        // Update volume levels with a rolling effect
                        updateVolumeLevels(normalized);
                    } else {
                        // On Android or if metering is not available, use random values for visualization
                        const randomLevel = 0.3 + Math.random() * 0.7;
                        updateVolumeLevels(randomLevel);
                    }
                }
            } catch (error) {
                console.error('Error getting recording status:', error);
            }
        }, 100);
    };

    const updateVolumeLevels = (newLevel: number) => {
        // Create a rolling effect by shifting values and adding the new one
        setVolumeLevel(prev => {
            const updated = [...prev];
            updated.shift(); // Remove the first element
            updated.push(newLevel); // Add new level at the end
            return updated;
        });
    };

    const stopRecording = async () => {
        if (!recording) return;

        try {
            setIsAnalyzing(false);

            // Stop volume analysis
            if (volumeUpdateRef.current) {
                clearInterval(volumeUpdateRef.current);
            }

            // Stop timer
            if (recordingTimerRef.current) {
                clearInterval(recordingTimerRef.current);
            }

            // Stop recording
            await recording.stopAndUnloadAsync();

            // Get recording URI
            const uri = recording.getURI();

            // Reset recording state
            setRecording(null);

            // If we have a URI, send it back
            if (uri) {
                onRecordingComplete(uri, recordingDuration);
            } else {
                onCancel();
            }

        } catch (err) {
            console.error('Failed to stop recording', err);
            onCancel();
        }
    };

    const cancelRecording = async () => {
        if (!recording) return;

        try {
            setIsAnalyzing(false);

            // Stop volume analysis
            if (volumeUpdateRef.current) {
                clearInterval(volumeUpdateRef.current);
            }

            // Stop timer
            if (recordingTimerRef.current) {
                clearInterval(recordingTimerRef.current);
            }

            // Stop recording without saving
            await recording.stopAndUnloadAsync();

            // Reset recording state
            setRecording(null);

            // Notify parent component
            onCancel();

        } catch (err) {
            console.error('Failed to cancel recording', err);
            onCancel();
        }
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <BlurView intensity={30} tint="dark" style={styles.container}>
            <View style={styles.content}>
                <View style={styles.waveformContainer}>
                    {volumeLevel.map((level, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.waveformBar,
                                {
                                    transform: [{
                                        scaleY: animatedValues.current[index].interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0.125, 1]
                                        })
                                    }],
                                    opacity: isAnalyzing ? 1 : 0.5
                                }
                            ]}
                        />
                    ))}
                </View>

                <Text style={styles.timer}>
                    {formatDuration(recordingDuration)}
                </Text>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={cancelRecording}
                    >
                        <Ionicons name="close" size={24} color="white" />
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.sendButton]}
                        onPress={stopRecording}
                    >
                        <Ionicons name="send" size={24} color="white" />
                        <Text style={styles.buttonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    content: {
        alignItems: 'center',
    },
    waveformContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginBottom: 16,
    },
    waveformBar: {
        width: 4,
        height: 40, // Set a fixed height that will be scaled
        backgroundColor: '#8e44ad',
        borderRadius: 2,
        marginHorizontal: 3,
    },
    timer: {
        color: 'white',
        fontSize: 18,
        marginBottom: 16,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        minWidth: 120,
    },
    cancelButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    sendButton: {
        backgroundColor: '#8e44ad',
    },
    buttonText: {
        color: 'white',
        marginLeft: 8,
        fontSize: 16,
    },
});

export default VoiceRecorderLive; 