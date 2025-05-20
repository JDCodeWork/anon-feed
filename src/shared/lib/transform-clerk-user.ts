import type { useUser } from "@clerk/clerk-react";
import type { UserWithToken } from "@shared/interfaces/users-db.interface";

export const transformClerkUser = (
	clerkUser: ReturnType<typeof useUser>["user"],
	token: string | null,
): UserWithToken | null => {
	if (clerkUser)
		return {
			id: clerkUser.id,
			image: clerkUser.imageUrl,
			name: clerkUser.fullName || clerkUser.username || "",
			token,
			created_at: clerkUser.createdAt?.toString() || "",
		};

	return null;
};
