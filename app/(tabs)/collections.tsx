import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, FlatList, Animated, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import * as ExpoHaptics from 'expo-haptics';
import { Haptics } from '@/util/haptics';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import AraProfile from '@/components/AraProfile';
import CollectionItem from '@/components/screens/CollectionItem';
import { useCollections } from '@/hooks/collections/useCollections';
import CategoryPills from '@/components/ui/CategoryPills';

export default function CollectionsScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  
  // This would be replaced with a real hook implementation
  const { collections, selectedCollection, setSelectedCollection } = useCollections(id as string);
  
  // Categories for filtering collections
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'books', name: 'Books' },
    { id: 'movies', name: 'Movies' },
    { id: 'articles', name: 'Articles' }
  ];
  
  const [activeCategory, setActiveCategory] = useState('all');
  
  
  const sendMessage = (msg: string) => {
    // This would be handled by the collection chat hook
    console.log('Sending message:', msg);
  };

  return (
    <ThemedView className="flex-1">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View className="flex-row justify-between items-center pt-14 pb-2 px-4 bg-white dark:bg-gray-900">
        <ThemedText type="defaultSemiBold" className="text-xl">Collections</ThemedText>
        
        <TouchableOpacity>
          <Ionicons 
            name="add-circle" 
            size={24} 
            color={Colors[colorScheme].tint} 
          />
        </TouchableOpacity>
      </View>
      
      {/* Categories */}
      <View className="border-b border-gray-100 dark:border-gray-800">
        <CategoryPills 
          categories={categories.map(cat => ({ id: cat.id, name: cat.name }))} 
          selectedId={activeCategory}
          onSelect={setActiveCategory}
          compact
        />
      </View>
      
      {/* Main Collections List */}
      <View className="flex-1" style={{ marginBottom: 150 }}>
        <FlatList
          data={collections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CollectionItem 
              collection={item}
              isSelected={selectedCollection?.id === item.id}
              onPress={() => setSelectedCollection(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
      
    </ThemedView>
  );
}