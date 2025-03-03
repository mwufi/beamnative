import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Mock data for event details
const eventDetails = {
    id: 'event1',
    title: 'Book Club: "The Midnight Library"',
    description: 'Join us for a discussion of Matt Haig\'s bestseller about the choices we make in life. We\'ll explore the themes of regret, possibility, and what makes a life worth living. This virtual event will be hosted by Sarah Johnson, and all participants will have a chance to share their thoughts on the book.',
    date: 'Tomorrow, 7:00 PM',
    endDate: 'Tomorrow, 8:30 PM',
    location: 'Virtual Event',
    image: 'https://m.media-amazon.com/images/I/81tCtHFtOgL._AC_UF1000,1000_QL80_.jpg',
    participants: [
        {
            id: 'user1',
            name: 'Sarah Johnson',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
            isHost: true
        },
        {
            id: 'user2',
            name: 'Mike Chen',
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
            isHost: false
        },
        {
            id: 'user3',
            name: 'Emma Watson',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            isHost: false
        },
        {
            id: 'user4',
            name: 'John Smith',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            isHost: false
        }
    ],
    totalParticipants: 24,
    agenda: [
        {
            time: '7:00 PM',
            title: 'Welcome & Introduction',
            description: 'Brief introduction to the book and format of the discussion'
        },
        {
            time: '7:10 PM',
            title: 'Main Discussion',
            description: 'Guided discussion of key themes and moments'
        },
        {
            time: '8:00 PM',
            title: 'Open Floor',
            description: 'Open discussion for all participants'
        },
        {
            time: '8:25 PM',
            title: 'Wrap-up',
            description: 'Final thoughts and next book announcement'
        }
    ]
};

export default function EventDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [isJoined, setIsJoined] = useState(false);
    const [showAllParticipants, setShowAllParticipants] = useState(false);

    // In a real app, we would fetch the event details based on the ID
    // const { id } = params;

    const handleJoinEvent = () => {
        setIsJoined(!isJoined);
    };

    const displayedParticipants = showAllParticipants
        ? eventDetails.participants
        : eventDetails.participants.slice(0, 3);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#121212', '#1a1a2e']}
                style={styles.gradient}
            >
                <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.header}>
                        <Pressable
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <Text style={styles.headerTitle}>Event Details</Text>
                        <Pressable
                            style={styles.shareButton}
                            onPress={() => { }}
                        >
                            <Ionicons name="share-outline" size={24} color="white" />
                        </Pressable>
                    </View>

                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: eventDetails.image }}
                            style={styles.eventImage}
                            resizeMode="cover"
                        />
                    </View>

                    <View style={styles.eventInfo}>
                        <Text style={styles.eventTitle}>{eventDetails.title}</Text>

                        <View style={styles.eventMetaContainer}>
                            <View style={styles.eventMetaItem}>
                                <Ionicons name="calendar" size={20} color="#8e44ad" />
                                <Text style={styles.eventMetaText}>{eventDetails.date}</Text>
                            </View>
                            <View style={styles.eventMetaItem}>
                                <Ionicons name="time" size={20} color="#8e44ad" />
                                <Text style={styles.eventMetaText}>90 min</Text>
                            </View>
                            <View style={styles.eventMetaItem}>
                                <Ionicons name="location" size={20} color="#8e44ad" />
                                <Text style={styles.eventMetaText}>{eventDetails.location}</Text>
                            </View>
                        </View>

                        <View style={styles.hostContainer}>
                            <Text style={styles.sectionTitle}>Hosted by</Text>
                            <View style={styles.hostInfo}>
                                <Image
                                    source={{ uri: eventDetails.participants[0].avatar }}
                                    style={styles.hostAvatar}
                                />
                                <View style={styles.hostDetails}>
                                    <Text style={styles.hostName}>{eventDetails.participants[0].name}</Text>
                                    <Pressable
                                        style={styles.messageButton}
                                        onPress={() => router.push(`/chat/${eventDetails.participants[0].id}` as any)}
                                    >
                                        <Text style={styles.messageButtonText}>Message</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.sectionTitle}>About this event</Text>
                            <Text style={styles.descriptionText}>{eventDetails.description}</Text>
                        </View>

                        <View style={styles.agendaContainer}>
                            <Text style={styles.sectionTitle}>Agenda</Text>
                            {eventDetails.agenda.map((item, index) => (
                                <View key={index} style={styles.agendaItem}>
                                    <View style={styles.agendaTimeContainer}>
                                        <Text style={styles.agendaTime}>{item.time}</Text>
                                        {index < eventDetails.agenda.length - 1 && (
                                            <View style={styles.timelineLine} />
                                        )}
                                    </View>
                                    <View style={styles.agendaContent}>
                                        <Text style={styles.agendaTitle}>{item.title}</Text>
                                        <Text style={styles.agendaDescription}>{item.description}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <View style={styles.participantsContainer}>
                            <View style={styles.participantsHeader}>
                                <Text style={styles.sectionTitle}>Participants</Text>
                                <Text style={styles.participantsCount}>{eventDetails.totalParticipants} attending</Text>
                            </View>
                            <View style={styles.participantsList}>
                                {displayedParticipants.map(participant => (
                                    <Pressable
                                        key={participant.id}
                                        style={styles.participantItem}
                                        onPress={() => router.push(`/chat/${participant.id}` as any)}
                                    >
                                        <Image
                                            source={{ uri: participant.avatar }}
                                            style={styles.participantAvatar}
                                        />
                                        <Text style={styles.participantName}>{participant.name}</Text>
                                        {participant.isHost && (
                                            <View style={styles.hostBadge}>
                                                <Text style={styles.hostBadgeText}>Host</Text>
                                            </View>
                                        )}
                                    </Pressable>
                                ))}
                                {!showAllParticipants && eventDetails.participants.length > 3 && (
                                    <Pressable
                                        style={styles.showMoreButton}
                                        onPress={() => setShowAllParticipants(true)}
                                    >
                                        <Text style={styles.showMoreText}>
                                            Show all {eventDetails.totalParticipants} participants
                                        </Text>
                                        <Ionicons name="chevron-down" size={16} color="#8e44ad" />
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Pressable
                        style={[
                            styles.joinButton,
                            isJoined && styles.joinedButton
                        ]}
                        onPress={handleJoinEvent}
                    >
                        <Text style={styles.joinButtonText}>
                            {isJoined ? 'Leave Event' : 'Join Event'}
                        </Text>
                        <Ionicons
                            name={isJoined ? 'exit-outline' : 'enter-outline'}
                            size={20}
                            color="white"
                        />
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
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 100,
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
    shareButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 250,
    },
    eventImage: {
        width: '100%',
        height: '100%',
    },
    eventInfo: {
        padding: 16,
    },
    eventTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
    },
    eventMetaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 24,
        gap: 12,
    },
    eventMetaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    eventMetaText: {
        color: 'white',
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 12,
    },
    hostContainer: {
        marginBottom: 24,
    },
    hostInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hostAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    hostDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hostName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    messageButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    messageButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
    descriptionContainer: {
        marginBottom: 24,
    },
    descriptionText: {
        fontSize: 14,
        lineHeight: 22,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    agendaContainer: {
        marginBottom: 24,
    },
    agendaItem: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    agendaTimeContainer: {
        width: 80,
        alignItems: 'center',
        position: 'relative',
    },
    agendaTime: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#8e44ad',
        marginBottom: 8,
    },
    timelineLine: {
        position: 'absolute',
        top: 24,
        width: 2,
        height: '100%',
        backgroundColor: 'rgba(142, 68, 173, 0.3)',
    },
    agendaContent: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        padding: 12,
    },
    agendaTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    agendaDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    participantsContainer: {
        marginBottom: 24,
    },
    participantsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    participantsCount: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    participantsList: {
        gap: 12,
    },
    participantItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    participantAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    participantName: {
        flex: 1,
        fontSize: 16,
        color: 'white',
    },
    hostBadge: {
        backgroundColor: '#8e44ad',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    hostBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    showMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        gap: 8,
    },
    showMoreText: {
        color: '#8e44ad',
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
    joinButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8e44ad',
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
    },
    joinedButton: {
        backgroundColor: '#2980b9',
    },
    joinButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 