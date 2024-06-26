const { Router } = require("express");
const applicationsRouter = Router();

const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../queries/jobApplicationsQueries");

const {
  checkApplicationID,
  checkApplicationExists,
  checkApplicationStatus,
  validateInput,

} = require("../middleware/index");

applicationsRouter.get("/", async (req, res) => {
  try {
    const applications = await getAllApplications();
    res.status(200).json(applications);
  } catch (e) {
    res.status(404).json({ error: "No applications found" });
  }
});

applicationsRouter.get(
  "/:id",
  checkApplicationID,
  checkApplicationExists,
  async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const newApplication = await getApplicationById(id);
      res.status(200).json(newApplication);
    } catch (e) {
      res.status(404).json({ error: "Application not found" });
    }
  }
);

applicationsRouter.post("/", validateInput, checkApplicationStatus, async (req, res) => {
  try {
    const application = req.body; //why this is not working ?

    const newApplication = await createApplication(application);
    res.status(201).json(newApplication);
  } catch (e) {
    res.status(404).json({ error: "Application not found" });
  }
});

applicationsRouter.put(
  "/:id",
  checkApplicationStatus,
  checkApplicationID,
  validateInput,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { company, url, createdAt, status, updatedAt } = req.body;
      const updatedApplication = await updateApplication(
        company,
        id,
        url,
        createdAt,
        status,
        updatedAt
      );
      res.status(200).json(updatedApplication);
    } catch (e) {
      res.status(404).json({ error: "Application not found" });
    }
  }
);

applicationsRouter.delete("/:id", checkApplicationID, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedApplication = await deleteApplication(id);
    res.status(200).json(deletedApplication);
  } catch (e) {
    res.status(404).json({ error: "Application not found" });
  }
});

module.exports = applicationsRouter;
