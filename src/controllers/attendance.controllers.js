import mongoose from "mongoose";
import AttendenceModel from "../models/attendence.model.js";

export const create = async (req, res) => {
  try {
    const { timeIn, timeOut, date, project } = req.body;
    if([timeIn, timeOut, date, project].some(field => !field || field.length === 0)) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
        })
    }

    if (!mongoose.Types.ObjectId.isValid(project)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid project ID',
        });
    }

    const attendence = await AttendenceModel.create({
        timeIn,
        timeOut,
        project,
        date,
        user: req.user._id,
    })
    return res.status(201).json({
        success: true,
        data: attendence,
        message: 'Attendence marked successfully',
    })
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message,
    })
  }
}

export const getAttendances = async (req, res) => {
    try {
        const attendances = await AttendenceModel.find().populate('project').populate('user').sort({createdAt: -1});
        return res.status(200).json({
            success: true,
            data: attendances,
            message: 'Attendances fetched successfully',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const attendance = await AttendenceModel.findOne({ user: req.user._id, _id: id });

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: 'You cannot delete others attendance entry',
            });
        }

        await AttendenceModel.deleteOne({ _id: id, user: req.user._id });

        return res.status(200).json({
            success: true,
            message: 'Attendance entry deleted successfully',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
