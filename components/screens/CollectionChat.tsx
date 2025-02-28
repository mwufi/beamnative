import React from 'react';
import { View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import AraProfile from '@/components/AraProfile';
import { Colors } from '@/constants/Colors';

type Collection = {
  id: string;
  title: string;
  description?: string;
  icon: string;
  items: number;
};

type Message = {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
};

type CollectionChatProps = {
  collection: Collection;
};

export default function CollectionChat({ collection }: CollectionChatProps) {
  const colorScheme = useColorScheme();
  
  // This would come from a collection chat hook
  const messages: Message[] = [
    {
      id: '1',
      sender: 'assistant',
      text: `Hi! I can help you with your ${collection.title.toLowerCase()} collection. What would you like to know?`,
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      sender: 'user',
      text: 'What\'s my favorite book in this collection?',
      timestamp: '10:31 AM'
    },
    {
      id: '3',
      sender: 'assistant',
      text: 'Based on our previous conversations, your favorite book in this collection is "Designing Data-Intensive Applications" by Martin Kleppmann. You mentioned it was particularly useful for your work on distributed systems.',
      timestamp: '10:31 AM'
    }
  ];

  return (
    <View className="flex-1">
      <View className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60">
        <View className={`w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 items-center justify-center mr-3`}>
          <Ionicons 
            name={collection.icon as any} 
            size={16} 
            color={Colors[colorScheme].tint} 
          />
        </View>
        <ThemedText className="font-medium flex-1">{collection.title}</ThemedText>
      </View>
      
      <ScrollView 
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages.map((message) => (
          <View 
            key={message.id}
            className={`flex-row mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'assistant' && (
              <View className="mr-2 mt-1">
                <AraProfile size={28} />
              </View>
            )}
            
            <View 
              className={`px-4 py-3 rounded-2xl max-w-[85%] ${
                message.sender === 'user' 
                  ? 'bg-indigo-500 rounded-tr-none' 
                  : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
              }`}
            >
              <ThemedText 
                className={message.sender === 'user' ? 'text-white' : ''}
              >
                {message.text}
              </ThemedText>
              <ThemedText 
                className={`text-xs mt-1 ${
                  message.sender === 'user' 
                    ? 'text-indigo-200' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {message.timestamp}
              </ThemedText>
            </View>
            
            {message.sender === 'user' && (
              <View className="ml-2 mt-1 bg-gray-200 dark:bg-gray-700 w-7 h-7 rounded-full items-center justify-center">
                <Ionicons name="person" size={16} color={colorScheme === 'dark' ? '#e5e7eb' : '#4b5563'} />
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}