import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";
//This file to get user information from session to add owner name in database
export const getSessionUser = async () => {

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return null;
    }
    return {
        user: session.user,
        userId: session.user.id
    }
}