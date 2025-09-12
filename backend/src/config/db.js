import mongoose from "mongoose";
e

export const connectBD = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb connect");
    }
    catch(error){
        console.error("Connection Error", error);
        process.exit(1);
    }
    
}