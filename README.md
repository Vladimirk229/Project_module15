The project structure is made according to the instructions and looks like a typical backend app with models, routes, config and utils, with some logic repeated from earlier assignments but adapted here for JWT authentication and ownership checks. I have User, Project and
Task models, each stored in the models folder and connected with references for ownership and relations. Routes folder contains userRoutes.js, projectRoutes.js and taskRoutes.js, each file responsible for its part of the API: authentication, projects CRUD and tasks CRUD.
The file auth.js is in utils, it manages token generation and token verification middleware. Config folder has db.js which is used to connect to MongoDB. The main file is server.js where I import everything, connect database, setup express.json and mount routes. The same as
it was in previous project, it also prints in console the endpoints for easier testing in Postman:
console.log(`Server running on port ${PORT}`);
console.log(`Register: http://localhost:${PORT}/api/users/register`);
console.log(`Login: http://localhost:${PORT}/api/users/login`);
console.log(`Projects: http://localhost:${PORT}/api/projects`);
console.log(`Tasks: http://localhost:${PORT}/api/projects/:projectId/tasks`);
console.log(`One task: http://localhost:${PORT}/api/tasks/:taskId`);
