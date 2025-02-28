# Nessenger Development Guide

## Build Commands
- `yarn start` or `bun start`: Start Expo development server
- `yarn ios` or `bun ios`: Run on iOS simulator
- `yarn web` or `bun web`: Run in web browser
- `yarn test`: Run all tests with Jest in watch mode
- `yarn test -- -t "test name"`: Run specific test
- `yarn lint`: Run expo linter
- `yarn push-schema` / `yarn pull-schema`: Manage InstantDB schema

## Code Style
- **TypeScript**: Use strict typing, define interfaces for props
- **Imports**: Use `@/` alias for absolute imports (`import X from '@/components/X'`)
- **Components**: Place in app/components for proper Tailwind support
- **Styling**: Use NativeWind/Tailwind; add style props directly to Text elements not parent Views
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Error Handling**: Handle fetch errors gracefully in hooks, provide meaningful user feedback

## Project Structure
- **app**: Main app directory
- **components**: Reusable components
- **hooks**: Custom hooks
- **utils**: Utility functions
- **types**: TypeScript types
- **assets**: Images, icons, etc.

## React Native Gotchas
- Don't use `space-x-*` - add padding manually to elements
- Colors don't cascade from Views to children - apply directly to Text
- Ensure styles render properly on all platforms (web/iOS/Android)
- Use Expo components and hooks when available