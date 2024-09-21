import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            lowercase: true,
            trim: true,
        },
        joinDate: {
            type: Date,
        },
        after15DaysDate: {
            type: Date,
        },
        mobileNo: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true
        },
        companyName: {
            type: String,
            trim: true,
        },
        managerName: {
            type: String,
            trim: true,
        },
        manager_mo_no: {
            type: String,
            trim: true,
        },
        course: {
            type: String,
            trim: true,
        },
        cast: {
            type: String,
            trim: true,
        },
        tryCount: {
            type: Number,
            trim: true,
        },
        profileImage: {
            type: String, ///cloudnary Url store
        },
        tryList: [{
            return_reason: { type: String, },
            try_date: { type: Date, },
            companyName: { type: String, },
            managerName: { type: String, },
            manager_mobileNo: { type: String, },
            tryCount: { type: Number, }
        }],
        isDone: {
            type: Boolean,
            default: false
        }

    }, { timestamps: true }
);

export const User = mongoose.model('User', userSchema);