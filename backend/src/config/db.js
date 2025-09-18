import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb connect");
    }
    catch(error){
        console.error("Connection Error", error);
        process.exit(1);
    }
    
}
export default connectDB;