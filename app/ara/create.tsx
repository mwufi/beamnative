import { StyleSheet, ScrollView, View, Text, Pressable, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';

// Mock data for creation tools
const creationTools = [
    {
        id: 'post',
        title: 'Create Post',
        description: 'Create a social media post with AI assistance',
        icon: 'newspaper',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29jaWFsJTIwbWVkaWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 'story',
        title: 'Write a Story',
        description: 'Collaborate with Ara to write creative stories',
        icon: 'book',
        image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3Rvcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 'photo',
        title: 'Edit Photos',
        description: 'Enhance your photos with AI-powered editing tools',
        icon: 'image',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG8lMjBlZGl0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 'meme',
        title: 'Meme Generator',
        description: 'Create funny memes with smart suggestions',
        icon: 'happy',
        image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVtZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
];

// Mock data for recent creations
const recentCreations = [
    {
        id: 'doc1',
        title: 'Travel Plans 2023',
        type: 'document',
        date: '2 days ago',
        preview: 'My travel plans for the summer include visiting...'
    },
    {
        id: 'story1',
        title: 'The Lost City',
        type: 'story',
        date: '1 week ago',
        preview: 'In the heart of the Amazon rainforest, there lies a city...'
    },
];

export default function CreativeStudioScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

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
                    <Text style={styles.headerTitle}>Creative Studio</Text>
                    <Pressable
                        style={styles.docsButton}
                        onPress={() => router.push('/ara/creations' as any)}
                    >
                        <Ionicons name="document-text" size={24} color="white" />
                    </Pressable>
                </View>

                <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.5)" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search your creations..."
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    <Text style={styles.sectionTitle}>Create Something New</Text>

                    <View style={styles.toolsGrid}>
                        {creationTools.map(tool => (
                            <Pressable
                                key={tool.id}
                                style={styles.toolCard}
                                onPress={() => router.push(`/ara/create/${tool.id}` as any)}
                            >
                                <Image
                                    source={{ uri: tool.image }}
                                    style={styles.toolImage}
                                />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    style={styles.toolGradient}
                                >
                                    <Ionicons name={tool.icon as any} size={24} color="white" />
                                    <Text style={styles.toolTitle}>{tool.title}</Text>
                                    <Text style={styles.toolDescription} numberOfLines={2}>{tool.description}</Text>
                                </LinearGradient>
                            </Pressable>
                        ))}
                    </View>

                    {recentCreations.length > 0 && (
                        <>
                            <Text style={styles.sectionTitle}>Recent Creations</Text>

                            {recentCreations.map(creation => (
                                <Pressable
                                    key={creation.id}
                                    style={styles.creationItem}
                                    onPress={() => router.push(`/ara/creations/${creation.id}` as any)}
                                >
                                    <View style={styles.creationIconContainer}>
                                        <Ionicons
                                            name={creation.type === 'document' ? 'document-text' : 'book'}
                                            size={24}
                                            color="white"
                                        />
                                    </View>
                                    <View style={styles.creationContent}>
                                        <Text style={styles.creationTitle}>{creation.title}</Text>
                                        <Text style={styles.creationPreview} numberOfLines={1}>{creation.preview}</Text>
                                        <Text style={styles.creationDate}>{creation.date}</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                                </Pressable>
                            ))}
                        </>
                    )}

                    <View style={styles.inspirationContainer}>
                        <LinearGradient
                            colors={['#8e44ad', '#3498db']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.inspirationGradient}
                        >
                            <Text style={styles.inspirationTitle}>Need inspiration?</Text>
                            <Text style={styles.inspirationText}>
                                Ask Ara for creative ideas or start with a template
                            </Text>
                            <Pressable
                                style={styles.inspirationButton}
                                onPress={() => router.push('/ara' as any)}
                            >
                                <Text style={styles.inspirationButtonText}>Get Ideas from Ara</Text>
                                <Ionicons name="bulb" size={16} color="white" />
                            </Pressable>
                        </LinearGradient>
                    </View>
                </ScrollView>
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
    docsButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 24,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 44,
        color: 'white',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
    },
    toolsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    toolCard: {
        width: '48%',
        height: 160,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
    },
    toolImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    toolGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        padding: 12,
    },
    toolTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 4,
    },
    toolDescription: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
    },
    creationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    creationIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    creationContent: {
        flex: 1,
    },
    creationTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    creationPreview: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        marginBottom: 4,
    },
    creationDate: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 12,
    },
    inspirationContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: 8,
    },
    inspirationGradient: {
        padding: 20,
        alignItems: 'center',
    },
    inspirationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    inspirationText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        opacity: 0.9,
        marginBottom: 16,
    },
    inspirationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        gap: 8,
    },
    inspirationButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
}); 