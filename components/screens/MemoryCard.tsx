import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

type Memory = {
  id: string;
  content: string;
  category: string;
  source: string;
  date: string;
  icon?: string;
};

type MemoryCardProps = {
  memory: Memory;
  isEditing: boolean;
  onUpdate: (id: string, content: string) => void;
};

export default function MemoryCard({ memory, isEditing, onUpdate }: MemoryCardProps) {
  const colorScheme = useColorScheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedContent, setEditedContent] = useState(memory.content);

  // Reset edited content when memory changes
  useEffect(() => {
    setEditedContent(memory.content);
  }, [memory]);

  // Animation value for card expansion
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  // Icon based on category
  const getIcon = () => {
    switch (memory.category) {
      case 'preferences': return 'heart';
      case 'personal': return 'person';
      case 'work': return 'briefcase';
      case 'knowledge': return 'school';
      default: return memory.icon || 'bookmark';
    }
  };

  // Save changes
  const handleSave = () => {
    if (editedContent.trim() !== memory.content) {
      onUpdate(memory.id, editedContent);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditedContent(memory.content);
  };

  return (
    <Animated.View
      className={`bg-white dark:bg-gray-800/40 rounded-xl p-4 mb-4 shadow-sm ${isEditing ? 'border border-indigo-200 dark:border-indigo-800' : ''
        }`}
    >
      <TouchableOpacity
        onPress={() => !isEditing && setIsExpanded(!isExpanded)}
        activeOpacity={isEditing ? 1 : 0.7}
        className="flex-1"
      >
        <View className="flex-row items-center mb-3">
          <View className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 items-center justify-center mr-3">
            <Ionicons
              name={getIcon() as any}
              size={16}
              color={Colors[colorScheme].tint}
            />
          </View>

          <ThemedText className="font-medium flex-1" numberOfLines={1}>
            {memory.category.charAt(0).toUpperCase() + memory.category.slice(1)}
          </ThemedText>

          {!isEditing && (
            <Ionicons
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
            />
          )}
        </View>

        {isEditing ? (
          <View>
            <TextInput
              value={editedContent}
              onChangeText={setEditedContent}
              multiline
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-gray-900 dark:text-white min-h-[100px]"
              placeholder="Edit this memory..."
              placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
            />

            <View className="flex-row justify-end mt-3">
              <TouchableOpacity
                onPress={handleCancel}
                className="px-4 py-2 mr-2 rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <ThemedText>Cancel</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
                className="px-4 py-2 rounded-lg bg-indigo-500"
              >
                <ThemedText className="text-white">Save</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <ThemedText numberOfLines={isExpanded ? undefined : 2}>
              {memory.content}
            </ThemedText>

            {isExpanded && (
              <View className="mt-4">
                <View className="flex-row">
                  <ThemedText className="text-sm text-gray-500 dark:text-gray-400">
                    Source:
                  </ThemedText>
                  <ThemedText className="text-sm ml-1">
                    {memory.source}
                  </ThemedText>
                </View>

                <ThemedText className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Learned on {memory.date}
                </ThemedText>
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}