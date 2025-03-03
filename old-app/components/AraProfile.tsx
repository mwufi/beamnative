import { View, Image } from 'react-native';

export interface AraProfileProps {
    size: number;
    className?: string;
}

export default function AraProfile({ size, className = '' }: AraProfileProps) {
    return (
        <View className={`rounded-full overflow-hidden ${className}`} style={{ width: size, height: size }}>
            <Image
                source={require('@/assets/images/blur.png')}
                className="w-full h-full"
            />
        </View>
    );
} 