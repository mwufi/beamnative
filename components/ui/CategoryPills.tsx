import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Haptics } from '@/util/haptics';

export type Category = {
  id: string;
  name: string;
  icon?: string;
  count?: number;
};

type CategoryPillsProps = {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
  compact?: boolean;
};

export default function CategoryPills({ categories, selectedId, onSelect, compact = false }: CategoryPillsProps) {
  const colorScheme = useColorScheme();
  
  const handleSelect = (id: string) => {
    Haptics.selection();
    onSelect(id);
  };
  
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className={`${compact ? 'py-2' : 'py-3'} px-1`}
      contentContainerStyle={{ paddingHorizontal: 12 }}
    >
      <View className="flex-row">
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleSelect(category.id)}
            className={`mr-2 py-1.5 px-3 rounded-full flex-row items-center ${
              selectedId === category.id 
                ? 'bg-indigo-500' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
            style={{ minWidth: 'auto' }}
          >
            {category.icon && (
              <Ionicons 
                name={category.icon as any} 
                size={14} 
                color={selectedId === category.id ? 'white' : (colorScheme === 'dark' ? '#d1d5db' : '#6b7280')} 
                style={{ marginRight: 4 }}
              />
            )}
            <ThemedText className={`text-sm ${selectedId === category.id ? 'text-white font-medium' : ''}`}>
              {category.name}
            </ThemedText>
            
            {category.count !== undefined && (
              <View className={`ml-1.5 px-1.5 min-w-5 h-5 rounded-full items-center justify-center ${
                selectedId === category.id 
                  ? 'bg-indigo-400' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                <ThemedText className={`text-xs ${selectedId === category.id ? 'text-white' : ''}`}>
                  {category.count}
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}