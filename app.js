const express = require('express');
const cors = require('cors');
const applicationControllers = require('./controllers/applicationsControllers')

const app = express();

// TODO: Add application-wide middleware
app.use(cors());
app.use(express.json());


// TODO: Add controller(s)
app.use('/applications', applicationControllers);

// TODO: Implement health check route
app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
}
);

module.exports = app;
