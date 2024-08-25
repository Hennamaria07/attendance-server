import ProjectModel from "../models/project.model.js";

export const create = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            });
        }
        const existingProject = await ProjectModel.findOne({ projectTitle: { $regex: title, $options: "i" } });
        if (existingProject) {
            return res.status(400).json({
                success: false,
                message: 'Project with the same title already exists'
            });
        } else {
            const project = new ProjectModel({
                user: req.user._id,
                projectTitle: title
            });
            await project.save();
            return res.status(201).json({
                success: true,
                message: 'Project created successfully',
                data: project
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getProjects = async (req, res) => {
    try {
        const { title } = req.query;
        
        const query = title ? { projectTitle: { $regex: title, $options: "i" } } : {};
        
        const projects = await ProjectModel.find(query).select('-updatedAt -createdAt -user -__v');
        
        return res.status(200).json({
            success: true,
            data: projects
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
