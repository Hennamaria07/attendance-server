import mongoose, { Schema } from "mongoose";

const attendenceSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        timeIn: {
            type: String,
            required: true,
        },
        timeOut: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const AttendenceModel = new mongoose.model('Attendence', attendenceSchema);

export default AttendenceModel;