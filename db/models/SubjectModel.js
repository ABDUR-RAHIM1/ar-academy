import mongoose from "mongoose";

// Schema Definition
const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: true,
            trim: true,
            maxlength: [100, "Name cannot exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        coverPhoto: {
            type: String,
            required: [true, "Cover photo is required"],
            trim: true,
        },
    },
    { timestamps: true }  
);

// Model Definition
const SubjectModel = mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

export default SubjectModel;
