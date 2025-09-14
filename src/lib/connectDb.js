import mongoose from "mongoose";





export const connectDb = async () => {
    try {
        
        if (mongoose.connection.readyState === 1) {
             return;    //this if check already connect data base then not call aging
        }
        await mongoose.connect(process.env.DB_URI, {
          dbName: process.env.DB_NAME,
        }); // connect dataBase
        console.log("Database connected!");
    } catch (error) {
        console.log(error);
        console.log("Database not connected!"); 
        process.exit(1);
    }

}

