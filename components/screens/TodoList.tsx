import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  category?: string;
};

export default function TodoList() {
  const colorScheme = useColorScheme();
  // This would normally come from a custom hook that manages todos
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Review yesterday\'s chat with Ara', completed: true },
    { id: '2', text: 'Complete reading "Designing Data-Intensive Applications"', completed: false, category: 'reading' },
    { id: '3', text: 'Plan weekend trip', completed: false },
    { id: '4', text: 'Update project timeline', completed: false, category: 'work' },
  ]);

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Get category color
  const getCategoryColor = (category?: string) => {
    switch(category) {
      case 'reading': return 'text-blue-500';
      case 'work': return 'text-purple-500';
      default: return 'text-gray-500 dark:text-gray-400';
    }
  };

  return (
    <View className="bg-white dark:bg-gray-800/40 rounded-xl p-4 shadow-sm">
      {todos.map((todo) => (
        <TouchableOpacity
          key={todo.id}
          onPress={() => toggleTodo(todo.id)}
          className="flex-row items-center py-3 border-b border-gray-100 dark:border-gray-700/30 last:border-b-0"
        >
          <View className={`w-6 h-6 rounded-full border ${todo.completed ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 dark:border-gray-600'} mr-3 items-center justify-center`}>
            {todo.completed && (
              <Ionicons name="checkmark" size={14} color="#fff" />
            )}
          </View>
          
          <View className="flex-1">
            <ThemedText 
              className={`${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}
            >
              {todo.text}
            </ThemedText>
            
            {todo.category && (
              <ThemedText className={`text-xs mt-1 ${getCategoryColor(todo.category)}`}>
                #{todo.category}
              </ThemedText>
            )}
          </View>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity 
        className="flex-row items-center mt-2 pt-3"
      >
        <View className="w-6 h-6 rounded-full border border-dashed border-indigo-400 mr-3 items-center justify-center">
          <Ionicons name="add" size={16} color={Colors[colorScheme].tint} />
        </View>
        <ThemedText className="text-indigo-500">
          Add new task
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}