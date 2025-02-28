import { useState, useEffect } from 'react';
import { db } from '@/util/instant';

export type Collection = {
  id: string;
  title: string;
  description?: string;
  icon: string;
  items: number;
  lastUpdated?: string;
};

export function useCollections(initialSelectedId?: string) {
  // Mock data for collections
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: '1',
      title: 'Books',
      description: 'Favorite books and reading list',
      icon: 'book',
      items: 12,
      lastUpdated: '2 days ago'
    },
    {
      id: '2',
      title: 'Movies',
      description: 'Films to watch and recommendations',
      icon: 'film',
      items: 8,
      lastUpdated: '1 week ago'
    },
    {
      id: '3',
      title: 'Articles',
      description: 'Saved articles from around the web',
      icon: 'newspaper',
      items: 15,
      lastUpdated: 'Yesterday'
    },
    {
      id: '4',
      title: 'Recipes',
      description: 'Favorite cooking recipes',
      icon: 'restaurant',
      items: 6
    },
    {
      id: '5',
      title: 'Travel',
      description: 'Places to visit and travel plans',
      icon: 'airplane',
      items: 4,
      lastUpdated: '3 weeks ago'
    }
  ]);
  
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  
  // Set initial selected collection if ID is provided
  useEffect(() => {
    if (initialSelectedId) {
      const collection = collections.find(c => c.id === initialSelectedId);
      if (collection) {
        setSelectedCollection(collection);
      }
    }
  }, [initialSelectedId]);
  
  // In a real app, this would fetch from a database
  const fetchCollections = async () => {
    try {
      // This would be replaced with a real database query
      // const result = await db.query({ ... });
      // setCollections(result.collections);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };
  
  return {
    collections,
    selectedCollection,
    setSelectedCollection,
    fetchCollections
  };
}