'use server';

import connectDB from "@/config/database";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/utils/getSessionUser";

async function bookmarkProperty(propertyId) {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const { userId } = sessionUser;
    const user = await User.findById(userId)

    let isBookMarked = user.bookmarks.includes(propertyId)

    let message;

    if (isBookMarked) {
        user.bookmarks.pull(propertyId);
        message = 'Bookmark removed';
        isBookMarked = false
    }
    else {
        user.bookmarks.push(propertyId);
        message = 'Bookmark Added';
        isBookMarked = true
    }

    await user.save();
    revalidatePath('/properties/saved', 'page')

    return { message, isBookMarked }
}

export default bookmarkProperty;