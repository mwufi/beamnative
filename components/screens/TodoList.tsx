import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
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
  const getCategoryTextColor = (category?: string) => {
    switch(category) {
      case 'reading': return colorScheme === 'dark' ? '#93c5fd' : '#3b82f6'; // blue
      case 'work': return colorScheme === 'dark' ? '#d8b4fe' : '#8b5cf6'; // purple
      default: return colorScheme === 'dark' ? '#9ca3af' : '#6b7280'; // gray
    }
  };

  return (
    <View style={{ backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff' }} className="rounded-xl p-4 shadow-sm">
      {todos.map((todo) => (
        <TouchableOpacity
          key={todo.id}
          onPress={() => toggleTodo(todo.id)}
          className="flex-row items-center py-3 last:border-b-0"
        >
          <View className={`w-6 h-6 rounded-full border ${todo.completed ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 dark:border-gray-600'} mr-3 items-center justify-center`}>
            {todo.completed && (
              <Ionicons name="checkmark" size={14} color="#fff" />
            )}
          </View>
          
          <View className="flex-1">
            <Text 
              style={{ 
                color: todo.completed 
                  ? (colorScheme === 'dark' ? '#9ca3af' : '#6b7280') 
                  : (colorScheme === 'dark' ? '#e5e7eb' : '#1f2937'),
                textDecorationLine: todo.completed ? 'line-through' : 'none',
                fontSize: 16,
                lineHeight: 24
              }}
            >
              {todo.text}
            </Text>
            
            {todo.category && (
              <Text 
                style={{
                  fontSize: 12,
                  marginTop: 4,
                  color: getCategoryTextColor(todo.category)
                }}
              >
                #{todo.category}
              </Text>
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
        <Text style={{ color: Colors[colorScheme].tint, fontSize: 16 }}>
          Add new task
        </Text>
      </TouchableOpacity>
    </View>
  );
}