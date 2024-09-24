import { connect, ConnectOptions } from 'mongoose';

export const dbConnect = () => {
    connect(process.env.MONGO_URI!, {} as ConnectOptions)
        .then(() => console.log("Connected to MongoDB successfully"))
        .catch((error) => console.error("MongoDB connection error:", error));
};
