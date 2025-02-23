import { db } from "@/util/instant";

export const useUser = () => {
    const { isLoading, user, error } = db.useAuth();

    const { data: userProfile } = db.useQuery({
        userProfiles: {
            $: { where: { user: user?.id } }
        }
    });

    return {
        isLoading,
        user,
        error,
        userProfile
    };
};
