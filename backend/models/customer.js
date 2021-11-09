import mongoose from "mongoose";
const customerSchema = new mongoose.Schema(
    {
    "name": {type: String},
    "email":{type: String},
    "password": {type: String},
    "dbStatus": {type: Boolean},
    "registerDate": {type: Date, default: Date.now}
    }
);
const customer = mongoose.model("customers", customerSchema);
export default customer;