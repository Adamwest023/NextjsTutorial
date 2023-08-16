import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    profession: {
        type: String,
        required:false
    },
    address: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    info: {
        type: String,
        required: false
    },
    skills: {
        type: [],
        required: false,
    },
    birthday: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});


const User = mongoose.models.users || mongoose.model("users", userSchema);


export default User;