import { db } from "@/util/instant";

export const useUserChats = () => {
    const { isLoading, user, error } = db.useAuth();

    const { isLoading: isUserProfileLoading, data, error: userProfileError } = db.useQuery({
        userProfiles: {
            conversations: {},
            $: { where: { user: user?.id } }
        }
    });

    const userProfile = data?.userProfiles[0];
    console.log("userProfile", userProfile);

    const conversations = userProfile?.conversations;

    return {
        isLoading: isLoading || isUserProfileLoading,
        error: error || userProfileError,
        userProfile,
        conversations
    };
};
