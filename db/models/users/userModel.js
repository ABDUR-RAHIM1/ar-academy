import mongoose from "mongoose";

const UserShcema = new mongoose.Schema({
    plan: {
        type: Object,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["accept", "pending", "reject"],
        default: "pending"
    },
    bkashNumber: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});



const UserModel = mongoose.models.Users || mongoose.model("Users", UserShcema);

export default UserModel;