import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useMemories } from '@/hooks/memory/useMemories';
import MemoryCard from '@/components/screens/MemoryCard';

export default function MemoryScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');

  // This would be a real hook in the production app
  const { categories, memories, isEditing, setIsEditing, updateMemory } = useMemories();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter memories based on search and category
  const filteredMemories = memories.filter(memory => {
    const matchesSearch = searchQuery === '' ||
      memory.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || memory.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ThemedView className="flex-1">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* Header */}
      <View className="pt-14 pb-2 px-4 bg-white dark:bg-gray-900">
        <View className="flex-row justify-between items-center mb-4">
          <ThemedText type="defaultSemiBold" className="text-xl">Memories</ThemedText>

          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Ionicons
              name={isEditing ? "checkmark-circle" : "pencil"}
              size={24}
              color={isEditing ? Colors[colorScheme].tint : (colorScheme === 'dark' ? '#e5e7eb' : '#4b5563')}
            />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mb-2">
          <Ionicons name="search" size={20} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} style={{ marginRight: 8 }} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search memories..."
            placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
            className="flex-1 text-gray-900 dark:text-white"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 py-3 border-b border-gray-100 dark:border-gray-800"
      >
        <TouchableOpacity
          onPress={() => setSelectedCategory('all')}
          className={`mr-4 px-4 py-2 rounded-full ${selectedCategory === 'all' ? 'bg-indigo-500' : 'bg-gray-100 dark:bg-gray-800'}`}
        >
          <ThemedText className={selectedCategory === 'all' ? 'text-white' : ''}>
            All
          </ThemedText>
        </TouchableOpacity>

        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            className={`mr-4 px-4 py-2 rounded-full flex-row items-center ${selectedCategory === category.id ? 'bg-indigo-500' : 'bg-gray-100 dark:bg-gray-800'}`}
          >
            <Ionicons
              name={category.icon as any}
              size={16}
              color={selectedCategory === category.id ? 'white' : (colorScheme === 'dark' ? '#e5e7eb' : '#4b5563')}
              style={{ marginRight: 6 }}
            />
            <ThemedText className={selectedCategory === category.id ? 'text-white' : ''}>
              {category.name}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Memory list */}
      <FlatList
        data={filteredMemories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MemoryCard
            memory={item}
            isEditing={isEditing}
            onUpdate={updateMemory}
          />
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      />
    </ThemedView>
  );
}