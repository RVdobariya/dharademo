import mongoose, { Schema } from "mongoose";

const reminderSchema = new Schema(
    {
        date: {
            type: Date,
            trim: true,
        },
        name: {
            type: String,
            trim: true,
        },
        mo_no: {
            type: String,
            trim: true,
        },
        course: {
            type: String,
            trim: true,
        },
        cut: {
            type: String,
            trim: true,
        },
        profileImage: {
            type: String,
            trim: true,
        }

    }, { timestamps: true }
);

export const Reminder = mongoose.model('Reminder', reminderSchema);