const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Register: http://localhost:${PORT}/api/users/register`);
    console.log(`Login: http://localhost:${PORT}/api/users/login`);
    console.log(`Projects: http://localhost:${PORT}/api/projects`);
    console.log(`Tasks: http://localhost:${PORT}/api/projects/:projectId/tasks`);
    console.log(`Task: http://localhost:${PORT}/api/tasks/:taskId`);
});
