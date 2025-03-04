import { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
    Dimensions,
    Animated,
    PanResponder,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.7;

// Mock data for recommendations
const recommendations = [
    {
        id: '1',
        title: 'The Hobbit: An Unexpected Journey',
        type: 'movie',
        image: 'https://m.media-amazon.com/images/M/MV5BMTcwNTE4MTUxMl5BMl5BanBnXkFtZTcwMDIyODM4OA@@._V1_SX300.jpg',
        description: 'A reluctant Hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and the gold within it from the dragon Smaug.',
        rating: 4.5,
        year: 2012,
    },
    {
        id: '2',
        title: 'The Fellowship of the Ring',
        type: 'book',
        image: 'https://m.media-amazon.com/images/I/81EtUYPcuUL._AC_UF1000,1000_QL80_.jpg',
        description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
        rating: 4.9,
        year: 1954,
    },
    {
        id: '3',
        title: 'Dune',
        type: 'book',
        image: 'https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg',
        description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.',
        rating: 4.7,
        year: 1965,
    },
    {
        id: '4',
        title: 'Inception',
        type: 'movie',
        image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        rating: 4.8,
        year: 2010,
    },
    {
        id: '5',
        title: 'The Midnight Library',
        type: 'book',
        image: 'https://m.media-amazon.com/images/I/81tCtHFtOgL._AC_UF1000,1000_QL80_.jpg',
        description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
        rating: 4.6,
        year: 2020,
    },
];

export default function RecommendationsScreen() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const position = useRef(new Animated.ValueXY()).current;
    const rotation = position.x.interpolate({
        inputRange: [-width / 2, 0, width / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp',
    });

    // Threshold for swipe detection - lower for iOS
    const SWIPE_THRESHOLD = Platform.OS === 'ios' ? 80 : 120;

    // Reset position when currentIndex changes
    useEffect(() => {
        position.setValue({ x: 0, y: 0 });
        setIsTransitioning(false);
    }, [currentIndex]);

    const panResponder = useRef(
        PanResponder.create({
            // Always claim responder status to prevent propagation to parent views
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: () => {
                // No need to do anything on grant
            },
            onPanResponderMove: (_, gesture) => {
                // Only handle horizontal movements for card swiping
                // Vertical movements are captured but not used
                if (Math.abs(gesture.dx) > Math.abs(gesture.dy)) {
                    position.setValue({ x: gesture.dx, y: 0 }); // No vertical movement for cards
                }
            },
            onPanResponderRelease: (_, gesture) => {
                // Only trigger swipe actions if the gesture was primarily horizontal
                if (Math.abs(gesture.dx) > Math.abs(gesture.dy)) {
                    if (gesture.dx > SWIPE_THRESHOLD) {
                        // Swiped right (like)
                        swipeRight();
                    } else if (gesture.dx < -SWIPE_THRESHOLD) {
                        // Swiped left (dislike)
                        swipeLeft();
                    } else {
                        // Return to center with spring animation
                        Animated.spring(position, {
                            toValue: { x: 0, y: 0 },
                            friction: 7,
                            tension: 40,
                            useNativeDriver: true,
                        }).start();
                    }
                } else {
                    // If it was primarily a vertical gesture, just reset the card position
                    Animated.spring(position, {
                        toValue: { x: 0, y: 0 },
                        friction: 7,
                        tension: 40,
                        useNativeDriver: true,
                    }).start();
                }
            },
            onPanResponderTerminate: () => {
                // If the gesture is terminated for any reason, reset position
                Animated.spring(position, {
                    toValue: { x: 0, y: 0 },
                    friction: 7,
                    tension: 40,
                    useNativeDriver: true,
                }).start();
            },
            // Prevent the gesture from bubbling to parent views
            onPanResponderTerminationRequest: () => false
        })
    ).current;

    const swipeRight = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);

        Animated.timing(position, {
            toValue: { x: width * 1.5, y: 0 },
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            // Move to next card
            setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
        });
    };

    const swipeLeft = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);

        Animated.timing(position, {
            toValue: { x: -width * 1.5, y: 0 },
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            // Move to next card
            setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
        });
    };

    const cardStyle = {
        transform: [
            { translateX: position.x },
            { translateY: position.y },
            { rotate: rotation },
        ],
    };

    // Next card animation
    const nextCardTranslateY = position.x.interpolate({
        inputRange: [-width / 2, 0, width / 2],
        outputRange: [0, 10, 0],
        extrapolate: 'clamp',
    });

    const nextCardScale = position.x.interpolate({
        inputRange: [-width / 2, 0, width / 2],
        outputRange: [1, 0.9, 1],
        extrapolate: 'clamp',
    });

    const nextCardStyle = {
        transform: [
            { translateY: nextCardTranslateY },
            { scale: nextCardScale }
        ],
    };

    // Prepare next index for rendering
    const nextIndex = (currentIndex + 1) % recommendations.length;

    // Like/dislike indicators
    const likeOpacity = position.x.interpolate({
        inputRange: [0, width / 4],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const dislikeOpacity = position.x.interpolate({
        inputRange: [-width / 4, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const renderCurrentCard = () => {
        const item = recommendations[currentIndex];
        return (
            <Animated.View
                key={`current-${item.id}`}
                style={[styles.card, cardStyle]}
                {...panResponder.panHandlers}
                pointerEvents="box-only"
            >
                <Image
                    source={{ uri: item.image }}
                    style={styles.cardImage}
                />

                {/* Like indicator */}
                <Animated.View
                    style={[styles.indicatorContainer, styles.likeIndicator, { opacity: likeOpacity }]}
                    pointerEvents="none"
                >
                    <Ionicons name="heart" size={80} color="white" />
                </Animated.View>

                {/* Dislike indicator */}
                <Animated.View
                    style={[styles.indicatorContainer, styles.dislikeIndicator, { opacity: dislikeOpacity }]}
                    pointerEvents="none"
                >
                    <Ionicons name="close" size={80} color="white" />
                </Animated.View>

                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.cardGradient}
                    pointerEvents="none"
                >
                    <View style={styles.cardContent} pointerEvents="box-none">
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <View style={styles.cardMeta}>
                            <Text style={styles.cardType}>{item.type}</Text>
                            <Text style={styles.cardDot}>•</Text>
                            <Text style={styles.cardYear}>{item.year}</Text>
                            <Text style={styles.cardDot}>•</Text>
                            <View style={styles.ratingContainer}>
                                <Ionicons name="star" size={16} color="#FFD700" />
                                <Text style={styles.cardRating}>{item.rating}</Text>
                            </View>
                        </View>
                        <Text style={styles.cardDescription}>{item.description}</Text>
                        <Pressable
                            style={styles.chatButton}
                            onPress={() => router.push(`/chat/${item.id}` as any)}
                        >
                            <Text style={styles.chatButtonText}>Chat about this</Text>
                            <Ionicons name="chatbubble" size={16} color="white" />
                        </Pressable>
                    </View>
                </LinearGradient>
            </Animated.View>
        );
    };

    const renderNextCard = () => {
        const item = recommendations[nextIndex];
        return (
            <Animated.View
                key={`next-${item.id}`}
                style={[styles.card, styles.nextCard, nextCardStyle]}
                pointerEvents="none"
            >
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <View style={styles.cardMeta}>
                            <Text style={styles.cardType}>{item.type}</Text>
                            <Text style={styles.cardDot}>•</Text>
                            <Text style={styles.cardYear}>{item.year}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Recommendations</Text>
                <Text style={styles.headerSubtitle}>Swipe to browse</Text>
            </View>

            {/* Card container with gesture handling */}
            <View
                style={styles.cardsContainer}
                // This prevents touch events from propagating through to the underlying sheet
                onStartShouldSetResponder={() => true}
                onMoveShouldSetResponder={() => true}
                onResponderTerminationRequest={() => false}
            >
                {renderNextCard()}
                {renderCurrentCard()}
            </View>

            <View style={styles.actionsContainer}>
                <Pressable
                    style={[styles.actionButton, styles.dislikeButton, isTransitioning && styles.disabledButton]}
                    onPress={swipeLeft}
                    disabled={isTransitioning}
                >
                    <Ionicons name="close" size={30} color="white" />
                </Pressable>

                <Pressable
                    style={[styles.actionButton, styles.likeButton, isTransitioning && styles.disabledButton]}
                    onPress={swipeRight}
                    disabled={isTransitioning}
                >
                    <Ionicons name="heart" size={30} color="white" />
                </Pressable>
            </View>

            <View style={styles.progressContainer}>
                {recommendations.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.progressDot,
                            index === currentIndex && styles.progressDotActive
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        paddingTop: 16,
        paddingBottom: 8,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    cardsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Ensure it covers the full width
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'absolute',
        backgroundColor: '#2c3e50',
    },
    nextCard: {
        top: 10,
        zIndex: -1,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        justifyContent: 'flex-end',
    },
    cardContent: {
        padding: 20,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    cardMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardType: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        textTransform: 'capitalize',
    },
    cardDot: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.5)',
        marginHorizontal: 6,
    },
    cardYear: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardRating: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        marginLeft: 4,
    },
    cardDescription: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: 22,
        marginBottom: 16,
    },
    chatButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignSelf: 'center',
        gap: 8,
    },
    chatButtonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 20,
    },
    actionButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dislikeButton: {
        backgroundColor: '#e74c3c',
    },
    likeButton: {
        backgroundColor: '#2ecc71',
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    progressDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginHorizontal: 4,
    },
    progressDotActive: {
        backgroundColor: 'white',
        width: 16,
    },
    indicatorContainer: {
        position: 'absolute',
        top: 50,
        zIndex: 10,
        padding: 10,
        borderWidth: 4,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    likeIndicator: {
        right: 20,
        borderColor: '#2ecc71',
        transform: [{ rotate: '10deg' }],
    },
    dislikeIndicator: {
        left: 20,
        borderColor: '#e74c3c',
        transform: [{ rotate: '-10deg' }],
    },
    disabledButton: {
        opacity: 0.5,
    },
}); 