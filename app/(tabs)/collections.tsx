import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, FlatList, Animated, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import AraProfile from '@/components/AraProfile';
import CollectionItem from '@/components/screens/CollectionItem';
import { useCollections } from '@/hooks/collections/useCollections';

export default function CollectionsScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const inputRef = useRef<TextInput>(null);
  const [message, setMessage] = useState('');
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const chatHeight = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');
  
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
  
  // Animate chat panel
  useEffect(() => {
    Animated.timing(chatHeight, {
      toValue: isChatExpanded ? 300 : 60,
      duration: 300,
      useNativeDriver: false
    }).start();
    
    if (isChatExpanded) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatExpanded]);
  
  // Toggle chat panel
  const toggleChat = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsChatExpanded(!isChatExpanded);
  };
  
  const sendMessage = () => {
    if (message.trim().length === 0) return;
    
    // Provide haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // This would be handled by the collection chat hook
    console.log('Sending message:', message);
    setMessage('');
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
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="px-4 py-3 border-b border-gray-100 dark:border-gray-800"
      >
        <View className="flex-row">
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setActiveCategory(category.id)}
              className={`mr-3 py-2 px-4 rounded-full ${activeCategory === category.id ? 'bg-indigo-500' : 'bg-gray-100 dark:bg-gray-800'}`}
              style={{ minWidth: 'auto' }}
            >
              <ThemedText className={activeCategory === category.id ? 'text-white' : ''}>
                {category.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      {/* Main Collections List */}
      <View className="flex-1" style={{ marginBottom: 60 }}>
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
      
      {/* Floating Chat Panel */}
      <Animated.View 
        className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-2xl"
        style={{ 
          height: chatHeight, 
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 10,
          borderTopWidth: 1,
          borderTopColor: colorScheme === 'dark' ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.8)'
        }}
      >
        {/* Chat Header - Always visible */}
        <TouchableOpacity 
          onPress={toggleChat}
          className="flex-row items-center p-3 px-4"
          activeOpacity={0.7}
        >
          <View className="flex-row items-center flex-1">
            <AraProfile size={30} />
            <ThemedText className="font-medium ml-2">
              {isChatExpanded 
                ? (selectedCollection 
                    ? `Chat about ${selectedCollection.title}` 
                    : 'Ask Ara about your collections')
                : 'Chat with Ara'}
            </ThemedText>
          </View>
          
          <View className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-gray-800 items-center justify-center">
            <Ionicons 
              name={isChatExpanded ? 'chevron-down' : 'chevron-up'} 
              size={18} 
              color={Colors[colorScheme].tint} 
            />
          </View>
        </TouchableOpacity>
        
        {/* Chat Input - Visible when expanded */}
        {isChatExpanded && (
          <View className="flex-1 px-4 pt-2 pb-4">
            {!selectedCollection && (
              <View className="bg-gray-50 dark:bg-gray-800/40 rounded-lg p-3 mb-3">
                <ThemedText className="text-gray-500 dark:text-gray-400 text-sm">
                  {collections.length > 0 
                    ? "You can ask about any of your collections. Try: 'What books do I have?' or 'Tell me about my movie collection'"
                    : "You don't have any collections yet. Add one to start tracking items!"}
                </ThemedText>
              </View>
            )}
            
            {/* Messages would go here */}
            
            <View className="mt-auto flex-row items-center">
              <TextInput
                ref={inputRef}
                value={message}
                onChangeText={setMessage}
                placeholder={selectedCollection 
                  ? `Ask about your ${selectedCollection.title.toLowerCase()}...` 
                  : "Ask about your collections..."}
                placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
                className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2.5 mr-2 text-gray-900 dark:text-white"
              />
              <TouchableOpacity
                onPress={sendMessage}
                disabled={message.trim().length === 0}
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  message.trim().length > 0 ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <Ionicons name="send" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animated.View>
    </ThemedView>
  );
}