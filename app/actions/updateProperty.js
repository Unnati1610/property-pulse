'use server';

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function updateProperty(propertyId, formData) {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User Id is required");
    }

    const { userId } = sessionUser;

    const existingProperty = await Property.findById(propertyId)

    if (existingProperty.owner.toString() !== userId) {
        throw new Error('Current user does not own this property');
    }

    const PropertyData = {
        owner: userId,
        type: formData.get("type"),
        name: formData.get("name"),
        description: formData.get("description"),
        location: {
            street: formData.get("location.street"),
            state: formData.get("location.state"),
            city: formData.get("location.city"),
            zipcode: formData.get("location.zipcode"),
        },
        beds: formData.get("beds"),
        baths: formData.get("baths"),
        square_feet: formData.get("square_feet"),
        amenities: formData.getAll('amenities'),
        rates: {
            nightly: formData.get("rates.nightly"),
            weekly: formData.get("rates.weekly"),
            monthly: formData.get("rates.monthly"),
        },
        seller_info: {
            name: formData.get("seller_info.name"),
            email: formData.get("seller_info.email"),
            phone: formData.get("seller_info.phone"),
        },
    };

    const updatedProperty = await Property.findByIdAndUpdate(propertyId, PropertyData)

    revalidatePath('/', 'layout')
    redirect(`/properties/${updatedProperty._id}`)

}

export default updateProperty;