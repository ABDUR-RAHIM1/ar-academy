import mongoose from "mongoose";

// Schema Definition
const subjectSchema = new mongoose.Schema(
    {
        subjectName: {
            type: String,
            required: [true, "Subject Name is required"],
            unique: true,
            trim: true,
            maxlength: [100, "Subject Name cannot exceed 100 characters"],
        },
        username: {
            type: String,
            required: [true, "username is required"],
            unique: true,
            trim: true,
            maxlength: [100, "username cannot exceed 100 characters"],
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
