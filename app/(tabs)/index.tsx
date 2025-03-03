import { StyleSheet, ScrollView, View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

// Mock data for the cards
const todoItems = [
    { id: '1', text: 'Finish project proposal', completed: false },
    { id: '2', text: 'Call mom', completed: false },
    { id: '3', text: 'Buy groceries', completed: true },
];

const recommendations = [
    {
        id: '1',
        title: 'The Hobbit: An Unexpected Journey',
        type: 'movie',
        image: 'https://m.media-amazon.com/images/M/MV5BMTcwNTE4MTUxMl5BMl5BanBnXkFtZTcwMDIyODM4OA@@._V1_SX300.jpg'
    },
    {
        id: '2',
        title: 'The Fellowship of the Ring',
        type: 'book',
        image: 'https://m.media-amazon.com/images/I/81EtUYPcuUL._AC_UF1000,1000_QL80_.jpg'
    },
];

const updates = [
    { id: '1', name: 'Sarah', message: 'Just posted a new photo', time: '2h ago' },
    { id: '2', name: 'Mike', message: 'Started a new job at Google', time: '5h ago' },
];

const followUps = [
    {
        id: '1',
        title: 'Lord of the Rings Quote',
        content: '"Not all those who wander are lost." - J.R.R. Tolkien',
        type: 'quote'
    },
];

export default function HomeScreen() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.greeting}>Hello, User</Text>

            {/* Todo Card */}
            <Pressable
                style={styles.card}
                onPress={() => router.push('/chat/todos' as any)}
            >
                <LinearGradient
                    colors={['#2c3e50', '#1a1a2e']}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Todos</Text>
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </View>
                    <View style={styles.todoList}>
                        {todoItems.map(item => (
                            <View key={item.id} style={styles.todoItem}>
                                <Ionicons
                                    name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                                    size={20}
                                    color={item.completed ? "#4cd964" : "white"}
                                />
                                <Text
                                    style={[
                                        styles.todoText,
                                        item.completed && styles.completedTodo
                                    ]}
                                >
                                    {item.text}
                                </Text>
                            </View>
                        ))}
                    </View>
                </LinearGradient>
            </Pressable>

            {/* You might like Card */}
            <Pressable
                style={styles.card}
                onPress={() => router.push('/recommendations' as any)}
            >
                <LinearGradient
                    colors={['#4a69bd', '#1e3799']}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>You might like</Text>
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendationScroll}>
                        {recommendations.map(item => (
                            <Pressable
                                key={item.id}
                                style={styles.recommendationItem}
                                onPress={() => router.push(`/chat/${item.id}` as any)}
                            >
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.recommendationImage}
                                />
                                <Text style={styles.recommendationTitle}>{item.title}</Text>
                                <Text style={styles.recommendationType}>{item.type}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </LinearGradient>
            </Pressable>

            {/* What's happening Card */}
            <Pressable
                style={styles.card}
                onPress={() => router.push('/discover' as any)}
            >
                <LinearGradient
                    colors={['#6a5acd', '#483d8b']}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>What's happening</Text>
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </View>
                    <View style={styles.updatesList}>
                        {updates.map(item => (
                            <View key={item.id} style={styles.updateItem}>
                                <View style={styles.updateAvatar}>
                                    <Text style={styles.updateAvatarText}>{item.name[0]}</Text>
                                </View>
                                <View style={styles.updateContent}>
                                    <Text style={styles.updateName}>{item.name}</Text>
                                    <Text style={styles.updateMessage}>{item.message}</Text>
                                </View>
                                <Text style={styles.updateTime}>{item.time}</Text>
                            </View>
                        ))}
                    </View>
                </LinearGradient>
            </Pressable>

            {/* Follow ups from Ara Card */}
            <Pressable
                style={styles.card}
                onPress={() => router.push('/chat/followup' as any)}
            >
                <LinearGradient
                    colors={['#8e44ad', '#5b2c6f']}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>From Ara</Text>
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </View>
                    <View style={styles.followUpsList}>
                        {followUps.map(item => (
                            <View key={item.id} style={styles.followUpItem}>
                                <Text style={styles.followUpTitle}>{item.title}</Text>
                                <Text style={styles.followUpContent}>{item.content}</Text>
                                <Text style={styles.followUpType}>{item.type}</Text>
                            </View>
                        ))}
                    </View>
                </LinearGradient>
            </Pressable>

            {/* See more recommendations button */}
            <Pressable
                style={styles.seeMoreButton}
                onPress={() => router.push('/recommendations' as any)}
            >
                <LinearGradient
                    colors={['#2c3e50', '#1a1a2e']}
                    style={styles.seeMoreGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.seeMoreText}>See more recommendations</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                </LinearGradient>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    card: {
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardGradient: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    todoList: {
        gap: 8,
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    todoText: {
        color: 'white',
        fontSize: 16,
    },
    completedTodo: {
        textDecorationLine: 'line-through',
        opacity: 0.7,
    },
    recommendationScroll: {
        marginHorizontal: -8,
    },
    recommendationItem: {
        width: 120,
        marginHorizontal: 8,
    },
    recommendationImage: {
        width: 120,
        height: 180,
        borderRadius: 8,
        marginBottom: 8,
    },
    recommendationTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    recommendationType: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
    updatesList: {
        gap: 12,
    },
    updateItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    updateAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    updateAvatarText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    updateContent: {
        flex: 1,
    },
    updateName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    updateMessage: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
    },
    updateTime: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
    },
    followUpsList: {
        gap: 12,
    },
    followUpItem: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 12,
        borderRadius: 8,
    },
    followUpTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    followUpContent: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        marginBottom: 8,
        fontStyle: 'italic',
    },
    followUpType: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
        alignSelf: 'flex-end',
    },
    seeMoreButton: {
        marginTop: 8,
        borderRadius: 12,
        overflow: 'hidden',
    },
    seeMoreGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        gap: 8,
    },
    seeMoreText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 