import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);


    //If the database is already connected, then don't connect again
    if (connected) {
        console.log("mongoDb is connected");
        return;
    }

    //If database is not connected, then connect it to mongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected...")
        connected = true;
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;
