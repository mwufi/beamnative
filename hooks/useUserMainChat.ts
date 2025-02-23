import { db } from "@/util/instant";
import { id } from "@instantdb/react-native";

export const useUserMainChat = () => {
    const { isLoading, user, error } = db.useAuth();

    const { isLoading: isUserProfileLoading, data, error: userProfileError } = db.useQuery({
        userProfiles: {
            conversations: {
                messages: {
                    sender: {}
                },
                $: {
                    where: {
                        name: "Main"
                    }
                }
            },
            $: { where: { user: user?.id } }
        }
    });

    const userProfile = data?.userProfiles[0];
    console.log("userProfile", userProfile);

    // create a conversation if it doesn't exist
    const hasMainConversation = userProfile?.conversations.length > 0;
    if (userProfile && !hasMainConversation) {
        console.log("creating main conversation...");
        db.transact([
            db.tx.conversations[id()].update({
                name: "Main",
                createdAt: Date.now(),
                lastMessageAt: Date.now(),
                isArchived: false,
            }).link({ participants: [userProfile?.id] })
        ]);
    }

    const conversation = userProfile?.conversations[0];

    return {
        isLoading: isLoading || isUserProfileLoading,
        error: error || userProfileError,
        userProfile,
        conversation
    };
};
