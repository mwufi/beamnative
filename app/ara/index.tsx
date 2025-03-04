import { View, StyleSheet } from 'react-native';
import AraChat from './chat';

export default function AraScreen() {
    return (
        <View style={styles.container}>
            <AraChat />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
}); 