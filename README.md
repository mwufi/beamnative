# Nessenger

A modern React Native app for organization, communication, and memory using Expo.

## Key Features

- **Home Screen**: Personalized welcome with todos and collection previews
- **Collections**: Organize items into collections with integrated chat
- **Memory**: View and edit AI assistant memories organized by categories
- **AI Integration**: Chat with Ara about your collections and preferences

## App Structure

```
/app
  /(new-tabs)      # Main tabbed navigation
    _layout.tsx    # Tab bar configuration
    index.tsx      # Home screen with welcome and todos
    collections.tsx # Collections with split view (list + chat)
    memory.tsx     # Editable memory cards by category
  /api             # API endpoints
/components
  /screens         # Screen-specific components
    HomeHeader.tsx # Profile and actions header
    TodoList.tsx   # Interactive todo component
    CollectionItem.tsx # Collection list item
    CollectionChat.tsx # Chat about collections
    MemoryCard.tsx # Expandable memory cards
/hooks
  /collections     # Collection-related hooks
  /memory          # Memory-related hooks
/util              # Utility functions and services
```

## Getting Started

```bash
# Install dependencies
yarn install

# Start the development server
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android
```

## Design Notes

- Uses NativeWind (Tailwind CSS) for styling
- Implements themed components for dark/light mode
- Follows mobile-first responsive design principles
- Separates UI components from business logic using hooks

## Notes on the New Structure

The app structure has been consolidated around three main tabs:
1. Home - Welcome screen with todos and collection previews
2. Collections - A split-view interface with collections and chat
3. Memory - A searchable, categorized view of what Ara remembers about you

This new structure moves away from the scattered screens in the previous version and provides a cohesive experience with clear user flows.
