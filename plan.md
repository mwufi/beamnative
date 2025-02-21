This is an app that will allow you to chat with agents!

Ara: Chat with AI

Welcome screen
- When you first enter the app, you will be greeted with a questionaire
- Each question is 1 page
    - Hi, how are you
    - what is your name?
    - what inspired you to try Ara?
    - how old are you?
    - have you used an AI before?
    - Customizing your Ara (personality, voice messages, notifications)

Tutorial
- Ara is different from other AI agents.
- There is a search function for day-to-day use
- There is a companion function for more personal chats
- You can create projects and notes in the app too

Search Page (/search)
- Clean, minimal interface similar to ChatGPT
- Large search bar at the top
- Chat-style conversation view below
- Features:
  - Real-time typing indicator
  - Message history preserved in conversation
  - Ability to copy responses
  - Share button for interesting conversations
  - Clear conversation button

Messages Page (/messages)
- Two main views:
  1. Messages List View
     - List of ongoing conversations
     - Preview of last message
     - Timestamp
     - Unread message indicator
     - Search/filter conversations
  2. Conversation View
     - Similar layout to Search page
     - Shows conversation history
     - Input bar at bottom
     - Additional features:
       - Voice messages
       - Attachments
       - Emoji reactions
       - Customized AI personality for each chat

Common Features (Both Pages)
- Markdown support in messages
- Code block formatting
- Image handling
- Loading states
- Error handling
- Infinite scroll for history

At the bottom of the screen is:
- Home
- Messages
- Explore

Technical Implementation:
- Use server components for initial load
- Client components for interactive elements
- Store conversations in local database
- Implement proper error boundaries
- Add loading skeletons for better UX

