import { useState } from 'react';

export type Memory = {
  id: string;
  content: string;
  category: string;
  source: string;
  date: string;
  icon?: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export function useMemories() {
  // Memory editing state
  const [isEditing, setIsEditing] = useState(false);

  // Mock categories
  const categories: Category[] = [
    { id: 'preferences', name: 'Preferences', icon: 'heart' },
    { id: 'personal', name: 'Personal', icon: 'person' },
    { id: 'work', name: 'Work', icon: 'briefcase' },
    { id: 'knowledge', name: 'Knowledge', icon: 'school' }
  ];

  // Mock memories data
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: '1',
      content: 'You prefer dark mode in apps and on your devices.',
      category: 'preferences',
      source: 'App interaction',
      date: 'Jan 15, 2024'
    },
    {
      id: '2',
      content: 'Your favorite book is "Designing Data-Intensive Applications" by Martin Kleppmann, which you mentioned when discussing distributed systems.',
      category: 'preferences',
      source: 'Conversation',
      date: 'Feb 2, 2024'
    },
    {
      id: '3',
      content: 'You have a cat named Whiskers who is 3 years old.',
      category: 'personal',
      source: 'Conversation',
      date: 'Dec 10, 2023'
    },
    {
      id: '4',
      content: 'You work as a software engineer focusing on frontend development with React and React Native.',
      category: 'work',
      source: 'Profile information',
      date: 'Nov 5, 2023'
    },
    {
      id: '5',
      content: "You're learning Spanish and try to practice for at least 15 minutes every day.",
      category: 'personal',
      source: 'Conversation',
      date: 'Jan 30, 2024'
    },
    {
      id: '6',
      content: 'The capital of France is Paris. This came up during our travel planning discussion.',
      category: 'knowledge',
      source: 'Conversation',
      date: 'Feb 10, 2024'
    },
    {
      id: '7',
      content: 'You prefer tea over coffee, especially green tea in the morning.',
      category: 'preferences',
      source: 'Conversation',
      date: 'Dec 22, 2023'
    }
  ]);

  // Update a memory
  const updateMemory = (id: string, newContent: string) => {
    setMemories(memories.map(memory =>
      memory.id === id ? { ...memory, content: newContent } : memory
    ));
  };

  // In a real app, this would fetch from a database
  const fetchMemories = async () => {
    try {
      // This would be replaced with a real database query
      // const result = await db.query({ ... });
      // setMemories(result.memories);
    } catch (error) {
      console.error('Error fetching memories:', error);
    }
  };

  // Add a new memory
  const addMemory = (memory: Omit<Memory, 'id'>) => {
    const newMemory = {
      ...memory,
      id: Date.now().toString(), // Simple ID generation for mock data
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setMemories([newMemory, ...memories]);
  };

  return {
    memories,
    categories,
    isEditing,
    setIsEditing,
    updateMemory,
    fetchMemories,
    addMemory
  };
}