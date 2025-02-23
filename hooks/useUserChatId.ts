import { db } from "@/util/instant";

export const useUserChatId = (id: string) => {
    const { isLoading, user, error } = db.useAuth();

    const { isLoading: isUserProfileLoading, data, error: userProfileError } = db.useQuery({
        userProfiles: {
            conversations: {
                messages: {
                    sender: {}
                },
                $: {
                    where: {
                        id: id
                    }
                }
            },
            $: { where: { user: user?.id } }
        }
    });

    const userProfile = data?.userProfiles[0];
    console.log("userProfile", userProfile);

    const conversation = userProfile?.conversations[0];

    return {
        isLoading: isLoading || isUserProfileLoading,
        error: error || userProfileError,
        userProfile,
        conversation
    };
};
