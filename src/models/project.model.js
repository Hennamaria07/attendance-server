import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        projectTitle: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ProjectModel = new mongoose.model('Project', projectSchema);

export default ProjectModel;