import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { Audio, AVPlaybackStatus } from 'expo-av';

interface AudioMessagePlayerProps {
    uri: string;
    duration?: number;
    messageId: string;
}

const AudioMessagePlayer: React.FC<AudioMessagePlayerProps> = ({
    uri,
    duration = 0,
    messageId
}) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackPosition, setPlaybackPosition] = useState(0);
    const [volume, setVolume] = useState(1.0);
    const [showVolumeControl, setShowVolumeControl] = useState(false);

    const positionUpdateRef = useRef<NodeJS.Timeout | null>(null);
    const audioElementRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Clean up on unmount
        return () => {
            if (positionUpdateRef.current) {
                clearInterval(positionUpdateRef.current);
            }
            if (sound) {
                sound.unloadAsync();
            }
            if (audioElementRef.current) {
                audioElementRef.current.pause();
                audioElementRef.current = null;
            }
        };
    }, []);

    const togglePlayback = async () => {
        if (isPlaying) {
            await pauseAudio();
        } else {
            await playAudio();
        }
    };

    const playAudio = async () => {
        // Check if we're on web
        if (Platform.OS === 'web') {
            try {
                if (!audioElementRef.current) {
                    // Create new audio element
                    const audioElement = new window.Audio(uri);
                    audioElement.volume = volume;

                    audioElement.onended = () => {
                        setIsPlaying(false);
                        setPlaybackPosition(0);
                    };

                    audioElement.ontimeupdate = () => {
                        setPlaybackPosition(audioElement.currentTime);
                    };

                    audioElementRef.current = audioElement;
                }

                await audioElementRef.current.play();
                setIsPlaying(true);

                return;
            } catch (error) {
                console.error('Error playing audio on web:', error);
                return;
            }
        }

        // Native platforms use Expo AV
        try {
            if (!sound) {
                // Load the audio
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri },
                    {
                        shouldPlay: true,
                        volume: volume,
                        progressUpdateIntervalMillis: 100
                    }
                );
                setSound(newSound);

                // Listen for playback status updates
                newSound.setOnPlaybackStatusUpdate(updatePlaybackStatus);

                // Start playing
                await newSound.playAsync();
            } else {
                // Resume existing sound
                await sound.playAsync();
            }

            setIsPlaying(true);

            // Start position update timer
            startPositionUpdateTimer();

        } catch (err) {
            console.error('Failed to play audio', err);
            setIsPlaying(false);
        }
    };

    const pauseAudio = async () => {
        if (Platform.OS === 'web' && audioElementRef.current) {
            audioElementRef.current.pause();
            setIsPlaying(false);
            return;
        }

        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);

            // Stop position update timer
            if (positionUpdateRef.current) {
                clearInterval(positionUpdateRef.current);
                positionUpdateRef.current = null;
            }
        }
    };

    const updatePlaybackStatus = (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
            // Update position
            if (status.positionMillis !== undefined) {
                setPlaybackPosition(status.positionMillis / 1000);
            }

            // Check if playback ended
            if (!status.isPlaying && status.didJustFinish) {
                setIsPlaying(false);
                setPlaybackPosition(0);

                // Stop position update timer
                if (positionUpdateRef.current) {
                    clearInterval(positionUpdateRef.current);
                    positionUpdateRef.current = null;
                }
            }
        }
    };

    const startPositionUpdateTimer = () => {
        // Clear any existing timer
        if (positionUpdateRef.current) {
            clearInterval(positionUpdateRef.current);
        }

        // Update position every 100ms
        positionUpdateRef.current = setInterval(async () => {
            if (sound && isPlaying) {
                const status = await sound.getStatusAsync();
                if (status.isLoaded) {
                    setPlaybackPosition(status.positionMillis / 1000);
                }
            }
        }, 100);
    };

    const handleVolumeChange = async (value: number) => {
        setVolume(value);

        if (Platform.OS === 'web' && audioElementRef.current) {
            audioElementRef.current.volume = value;
            return;
        }

        if (sound) {
            await sound.setVolumeAsync(value);
        }
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Calculate progress percentage
    const progress = duration > 0 ? (playbackPosition / duration) * 100 : 0;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.playButton}
                onPress={togglePlayback}
            >
                <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={20}
                    color="white"
                />
            </TouchableOpacity>

            <View style={styles.progressContainer}>
                <View style={styles.waveformContainer}>
                    {/* Waveform visualization */}
                    {[...Array(20)].map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.waveformBar,
                                {
                                    height: 5 + Math.random() * 15,
                                    backgroundColor: i / 20 * 100 <= progress ? '#8e44ad' : 'rgba(255, 255, 255, 0.3)'
                                }
                            ]}
                        />
                    ))}
                </View>

                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>
                        {formatDuration(playbackPosition)}
                    </Text>
                    <TouchableOpacity
                        onPress={() => setShowVolumeControl(!showVolumeControl)}
                    >
                        <Ionicons
                            name={volume > 0.5 ? "volume-high" : (volume > 0 ? "volume-medium" : "volume-mute")}
                            size={18}
                            color="rgba(255, 255, 255, 0.7)"
                        />
                    </TouchableOpacity>
                </View>

                {showVolumeControl && (
                    <View style={styles.volumeContainer}>
                        <Ionicons name="volume-low" size={16} color="rgba(255, 255, 255, 0.5)" />
                        <Slider
                            style={styles.volumeSlider}
                            minimumValue={0}
                            maximumValue={1}
                            value={volume}
                            onValueChange={handleVolumeChange}
                            minimumTrackTintColor="#8e44ad"
                            maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                            thumbTintColor="#8e44ad"
                        />
                        <Ionicons name="volume-high" size={16} color="rgba(255, 255, 255, 0.5)" />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        width: '100%',
    },
    playButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    progressContainer: {
        flex: 1,
    },
    waveformContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        marginBottom: 4,
    },
    waveformBar: {
        width: 3,
        marginHorizontal: 1,
        borderRadius: 1,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
    volumeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    volumeSlider: {
        flex: 1,
        height: 20,
        marginHorizontal: 8,
    },
});

export default AudioMessagePlayer; 