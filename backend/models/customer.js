import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import moment from "moment";
const customerSchema = new mongoose.Schema(
    {
    "name": {type: String},
    "email":{type: String},
    "password": {type: String},
    "dbStatus": {type: Boolean},
    "registerDate": {type: Date, default: Date.now}
    }
);

// customerSchema.methods.generateJWT = function () {
//     return jwt.sign({
//         _id: this._id,
//         name: this.name,
//         email: this.email,
//         iat: moment().unix()
//     },
//     process.env.SECRET_KEY
//     );
// };



const customer = mongoose.model("customers", customerSchema);
export default customer;