import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import AraProfile from '@/components/AraProfile';

type HomeHeaderProps = {
  userName: string;
};

export default function HomeHeader({ userName }: HomeHeaderProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  
  return (
    <View className="flex-row justify-between items-center pt-14 pb-2 px-4 bg-white dark:bg-gray-900">
      <TouchableOpacity 
        onPress={() => router.push('/profile')}
        className="flex-row items-center"
      >
        <View className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full items-center justify-center">
          <Ionicons name="person" size={20} color={colorScheme === 'dark' ? '#a5b4fc' : '#6366f1'} />
        </View>
      </TouchableOpacity>
      
      <View className="flex-row">
        <TouchableOpacity 
          className="mr-4"
          onPress={() => router.push('/search')}
        >
          <Ionicons name="search" size={24} color={colorScheme === 'dark' ? '#e5e7eb' : '#4b5563'} />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => router.push('/chat')}
        >
          <View className="relative">
            <AraProfile size={28} />
            <View className="absolute -top-1 -right-1 bg-indigo-500 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-900" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}