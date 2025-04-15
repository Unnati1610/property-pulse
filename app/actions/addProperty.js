"use server";
import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "@/config/database";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Property from "@/models/Property";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User Id is required");
    }

    const { userId } = sessionUser;
    //Access all values from images and amenities
    const amenities = formData.getAll("amenities");
    const images = formData
        .getAll("images")
        .filter((image) => image !== "");

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
        amenities,
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
    const imageUrls = [];

    for (const imageFile of images) {
        const imageBuffer = await imageFile.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);
        console.log(imageBuffer, 'imageBuffer', imageArray, 'imageArray', imageData, 'imageData')
        // Convert the image data to base64
        const imageBase64 = imageData.toString('base64');

        // Make request to upload to Cloudinary
        const result = await cloudinary.uploader.upload(
            `data:image/png;base64,${imageBase64}`,
            {
                folder: 'property-pulse',
            }
        );

        imageUrls.push(result.secure_url);
    }

    PropertyData.images = imageUrls;
    const newProperty = new Property(PropertyData)
    await newProperty.save()

    revalidatePath('/', 'layout')

    redirect(`/properties/${newProperty._id}`)
}

export default addProperty;
