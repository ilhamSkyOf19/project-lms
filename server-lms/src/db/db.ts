import mongoose from "mongoose";


const MONGO_URI = process.env.MONGO_URI?.trim() || "";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected ${MONGO_URI}`);
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
        process.exit(1);
    }

    const dbConn = mongoose.connection;

    dbConn.once('open', (_) => {
        console.log(`MongoDB connected ${MONGO_URI}`);
    })

    dbConn.on('error', (error) => {
        console.log(`MongoDB connection error: ${error}`);
    })


};