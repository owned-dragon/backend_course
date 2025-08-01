import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            type: String, //cloundinary url
            required: true,
        },
        coverImage: {
            type: String, //cloudinary
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        password: {
            type: String,
            required: [true, "Password is Required"],
            min: [6, "password is too small"],
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true },
);

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = bcrypt.hash(user.password, 10);
        next();
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    const user = this;
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    const user = this;
    jsonwebtoken.sign(
        {
            _id: user._id,
            email: user.email,
            username: user.username,
            fullName: user.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        },
    );
};
userSchema.methods.generateRefreshToken = function () {
    const user = this;
    jsonwebtoken.sign(
        {
            _id: user._id,
            email: user.email,
            username: user.username,
            fullName: user.fullName,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        },
    );
};

export const User = model("User", userSchema);
