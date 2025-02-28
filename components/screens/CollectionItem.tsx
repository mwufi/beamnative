import React from 'react';
import { View, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

type Collection = {
  id: string;
  title: string;
  description?: string;
  icon: string;
  items: number;
  lastUpdated?: string;
};

type CollectionItemProps = {
  collection: Collection;
  isSelected: boolean;
  onPress: () => void;
};

export default function CollectionItem({ collection, isSelected, onPress }: CollectionItemProps) {
  const colorScheme = useColorScheme();
  
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };
  
  return (
    <Pressable 
      onPress={handlePress}
      className={`px-4 py-3.5 ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/10' : ''}`}
      style={({ pressed }) => [
        {
          backgroundColor: pressed 
            ? (colorScheme === 'dark' ? 'rgba(79, 70, 229, 0.1)' : 'rgba(224, 231, 255, 0.6)') 
            : (isSelected 
                ? (colorScheme === 'dark' ? 'rgba(79, 70, 229, 0.1)' : 'rgba(238, 242, 255, 0.9)') 
                : 'transparent')
        }
      ]}
    >
      <View className="flex-row items-center">
        <View className="relative mr-3">
          <View className={`w-12 h-12 rounded-xl ${isSelected ? 'bg-indigo-100 dark:bg-indigo-900/30' : 'bg-gray-100 dark:bg-gray-800/60'} items-center justify-center`}>
            <Ionicons 
              name={collection.icon as any} 
              size={24} 
              color={isSelected ? Colors[colorScheme].tint : (colorScheme === 'dark' ? '#9ca3af' : '#6b7280')} 
            />
          </View>
          
          {/* Item count badge */}
          <View className="absolute -top-1 -right-1 bg-indigo-500 min-w-[18px] h-[18px] rounded-full items-center justify-center px-1">
            <ThemedText className="text-[10px] font-medium text-white">
              {collection.items}
            </ThemedText>
          </View>
        </View>
        
        <View className="flex-1 pr-2">
          <ThemedText className="font-medium text-base">
            {collection.title}
          </ThemedText>
          
          {collection.description && (
            <ThemedText className="text-sm text-gray-500 dark:text-gray-400 mt-0.5" numberOfLines={1}>
              {collection.description}
            </ThemedText>
          )}
          
          {collection.lastUpdated && (
            <ThemedText className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Updated {collection.lastUpdated}
            </ThemedText>
          )}
        </View>
        
        <View className={`p-2 rounded-full ${isSelected ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>
          <Ionicons 
            name="chevron-forward" 
            size={18} 
            color={isSelected ? Colors[colorScheme].tint : (colorScheme === 'dark' ? '#9ca3af' : '#6b7280')} 
          />
        </View>
      </View>
      
      {/* Separator line */}
      <View className="absolute bottom-0 left-16 right-0 h-[0.5px] bg-gray-100 dark:bg-gray-800" />
    </Pressable>
  );
}