const { Router } = require("express");
const applicationsRouter = Router();

const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../queries/jobApplicationsQueries");

applicationsRouter.get("/", async (req, res) => {
  const applications = await getAllApplications();
  res.status(200).json(applications);
});

applicationsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const newApplication = await getApplicationById(id);
  res.status(200).json(newApplication);
});

applicationsRouter.post("/", async (req, res) => {
  const { company, url, createdAt, status, updatedAt } = req.body;
  const newApplication = await createApplication(
    company,
    url,
    createdAt,
    status,
    updatedAt
  );
  res.status(201).json(newApplication);
});

applicationsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { company, url, createdAt, status, updatedAt } = req.body;
    const updatedApplication = await updateApplication(
        id,
        company,
        url,
        createdAt,
        status,
        updatedAt
    );
    res.status(200).json(updatedApplication);
    }
);

applicationsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedApplication = await deleteApplication(id);
    res.status(200).json(deletedApplication);
    }
);




module.exports = applicationsRouter;
