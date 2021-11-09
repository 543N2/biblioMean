import mongoose from "mongoose";
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection with MongoDB: OK");
    } catch (error) {
        console.log("Error connecting to MongoDB: \n" + error);
    }
};
export default { dbConnection };
