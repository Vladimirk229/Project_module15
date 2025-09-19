const express = require("express");
const Task = require("../models/Task");
const Project = require("../models/Project");
const { authMiddleware } = require("../utils/auth");

const router = express.Router();

//=======================================================================

router.post("/projects/:projectId/tasks", authMiddleware, async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const { title, description, status } = req.body;
        const task = new Task({
            title,
            description,
            status,
            project: project._id
        });
        await task.save();
        res.status(201).json(task);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

//=======================================================================

router.get("/projects/:projectId/tasks", authMiddleware, async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const tasks = await Task.find({ project: project._id });
        res.json(tasks);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

//=======================================================================

router.put("/tasks/:taskId", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId).populate("project");
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (task.project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.status = req.body.status || task.status;
        await task.save();

        res.json(task);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

//=======================================================================

router.delete("/tasks/:taskId", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId).populate("project");
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (task.project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await task.deleteOne();
        res.json({ message: "Task deleted" });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
