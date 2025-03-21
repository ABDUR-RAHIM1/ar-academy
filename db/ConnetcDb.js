import mongoose from "mongoose";


const mongoUrl = "mongodb+srv://abrarjohn85:ojDePdjahudsyP2y@ar-academy.4wb8v.mongodb.net/?retryWrites=true&w=majority"

export const connectDb = async () => {

    const connetState = mongoose.connection.readyState;

    if (connetState === 1) {
        console.log("Already Connected")
        return
    }
    if (connetState === 2) {
        console.log("Connecting . . . ")
        return
    }

    try {
        await mongoose.connect(mongoUrl, {
            dbName: "ar-academy", 
        });
        console.log("Database is Connected");
    } catch (error) {
        console.log("Database Not Connected!", error);
    }
};