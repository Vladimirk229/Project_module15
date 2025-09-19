const express = require("express");
const Project = require("../models/Project");
const { authMiddleware } = require("../utils/auth");

const router = express.Router();

//=======================================================================

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name, description } = req.body;
        const project = new Project({
            name,
            description,
            user: req.user.id
        });
        await project.save();
        res.status(201).json(project);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

//=======================================================================

router.get("/", authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id });
        res.json(projects);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

//=======================================================================

router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }
        res.json(project);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

//=======================================================================

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        project.name = req.body.name || project.name;
        project.description = req.body.description || project.description;
        await project.save();

        res.json(project);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

//=======================================================================

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await project.deleteOne();
        res.json({ message: "Project deleted" });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
