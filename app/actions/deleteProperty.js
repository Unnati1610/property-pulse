"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error("ID is required");
    }
    const { userId } = sessionUser;

    await connectDB();
    const property = await Property.findById(propertyId);
    if (!property) {
        throw new Error("Property not found");
    }

    //verify ownership
    if (property.owner.toString() !== userId) {
        throw new Error("You are not authorized");
    }

    //Extract public id from cloudinary image urls
    const publicIds = property.images.map((imageURL) => {
        const parts = imageURL.split("/");
        return parts.at(-1).split(".").at(0);
    });

    //Delete images from cloudinary
    if (publicIds.length > 0) {
        for (const publicId of publicIds) {
            await cloudinary.uploader.destroy("property-pulse/" + publicId);
        }
    }
    await property.deleteOne();
    revalidatePath("/", "layout");
}

export default deleteProperty;
