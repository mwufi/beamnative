import { i } from "@instantdb/react-native";

const _schema = i.schema({
  // We inferred 1 attribute!
  // Take a look at this schema, and if everything looks good,
  // run `push schema` again to enforce the types.
  entities: {
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.string(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed(),
    }),
    colors: i.entity({
      value: i.string(),
    }),
    conversations: i.entity({
      createdAt: i.number(),
      isArchived: i.boolean(),
      lastMessageAt: i.number(),
      name: i.string(),
    }),
    messages: i.entity({
      content: i.any(),
      createdAt: i.number(),
      isDeleted: i.boolean(),
      isEdited: i.boolean(),
    }),
    userConversationStatus: i.entity({
      isMuted: i.boolean(),
      isPinned: i.boolean(),
      lastRead: i.number(),
    }),
    userProfiles: i.entity({
      avatarUrl: i.string(),
      displayName: i.string().unique().indexed(),
      isActive: i.boolean(),
      lastSeen: i.number(),
      metadata: i.any(),
      type: i.string(),
    }),
  },
  links: {
    conversationsMessages: {
      forward: {
        on: "conversations",
        has: "many",
        label: "messages",
      },
      reverse: {
        on: "messages",
        has: "many",
        label: "conversations",
      },
    },
    conversationsParticipants: {
      forward: {
        on: "conversations",
        has: "many",
        label: "participants",
      },
      reverse: {
        on: "userProfiles",
        has: "many",
        label: "conversations",
      },
    },
    messagesSender: {
      forward: {
        on: "messages",
        has: "one",
        label: "sender",
      },
      reverse: {
        on: "userProfiles",
        has: "many",
        label: "messages",
      },
    },
    userConversationStatusConversation: {
      forward: {
        on: "userConversationStatus",
        has: "one",
        label: "conversation",
      },
      reverse: {
        on: "conversations",
        has: "many",
        label: "convoStatus",
      },
    },
    userConversationStatusUserProfile: {
      forward: {
        on: "userConversationStatus",
        has: "one",
        label: "userProfile",
      },
      reverse: {
        on: "userProfiles",
        has: "many",
        label: "convoStatuses",
      },
    },
    userProfilesUser: {
      forward: {
        on: "userProfiles",
        has: "one",
        label: "user",
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "userProfile",
      },
    },
  },
  // If you use presence, you can define a room schema here
  // https://www.instantdb.com/docs/presence-and-topics#typesafety
  rooms: {},
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
