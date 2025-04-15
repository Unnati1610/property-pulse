import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async () => {

    try {
        await connectDB()
        const properties = await Property.find({});
        return new Response(properties, { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify({ message: 'something went wrong' }), { status: 500 })
    }

};