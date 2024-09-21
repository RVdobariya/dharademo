import mongoose, { Schema } from "mongoose";

const managerSchema = new Schema(
    {
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
        reference: {
            type: String,
            trim: true,
        },
        note: {
            type: String,
            trim: true,
        }

    }, { timestamps: true }
);

export const Manager = mongoose.model('Manager', managerSchema);