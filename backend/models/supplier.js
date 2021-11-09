import mongoose from "mongoose";
const supplierSchema = new mongoose.Schema(
    {
    "name": {type: String},
    "address":{type: String},
    "registerDate": {type: Date, default: Date.now}
    }
);
const supplier = mongoose.model("suppliers", supplierSchema);
export default supplier;