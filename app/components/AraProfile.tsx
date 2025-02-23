import { View, Image } from 'react-native';

export interface AraProfileProps {
    size: number;
    className?: string;
}

export default function AraProfile({ size, className = '' }: AraProfileProps) {
    return (
        <View className={`rounded-full overflow-hidden ${className}`} style={{ width: size, height: size }}>
            <Image
                source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Ara' }}
                className="w-full h-full"
            />
        </View>
    );
} 