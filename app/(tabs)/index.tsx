import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUser } from '@/hooks/useUser';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import HomeHeader from '@/components/screens/HomeHeader';
import TodoList from '@/components/screens/TodoList';

export default function HomeScreen() {
  const router = useRouter();
  const { user, userProfile } = useUser();
  const colorScheme = useColorScheme();
  const userName = userProfile?.userProfiles[0]?.name || 'Zen';
  
  // Collection preview data - this would come from a hook in production
  const recentCollections = [
    { id: '1', title: 'Books', icon: 'book', items: 12 },
    { id: '2', title: 'Movies', icon: 'film', items: 8 },
    { id: '3', title: 'Articles', icon: 'newspaper', items: 15 },
  ];

  return (
    <ThemedView className="flex-1">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <HomeHeader userName={userName} />
      
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 150 }}>
        {/* Welcome section */}
        <View className="my-6">
          <ThemedText type="title" className="mb-1">
            Hey {userName}!
          </ThemedText>
          <ThemedText type="subtitle" className="text-indigo-500">
            Welcome back
          </ThemedText>
        </View>

        {/* Todo section */}
        <View className="mb-6">
          <ThemedText type="defaultSemiBold" className="mb-3 text-lg">
            Your tasks for today
          </ThemedText>
          <TodoList />
        </View>

        {/* Collections preview */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-3">
            <ThemedText type="defaultSemiBold" className="text-lg">
              Recent collections
            </ThemedText>
            <Link href="/collections" asChild>
              <TouchableOpacity>
                <ThemedText className="text-indigo-500">See all</ThemedText>
              </TouchableOpacity>
            </Link>
          </View>
          
          <View className="flex-row gap-4">
            {recentCollections.map((collection) => (
              <TouchableOpacity 
                key={collection.id}
                className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 w-28 items-center"
                onPress={() => router.push(`/collections?id=${collection.id}`)}
              >
                <View className="bg-indigo-100 dark:bg-indigo-800/30 w-12 h-12 rounded-full items-center justify-center mb-2">
                  <Ionicons 
                    name={collection.icon as any} 
                    size={22} 
                    color={Colors[colorScheme].tint} 
                  />
                </View>
                <ThemedText className="font-medium text-center">
                  {collection.title}
                </ThemedText>
                <ThemedText className="text-sm text-gray-500 dark:text-gray-400">
                  {collection.items} items
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}