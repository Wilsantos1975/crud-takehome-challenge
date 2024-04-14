const { getApplicationById } = require("../queries/jobApplicationsQueries");

const checkApplicationID = async (req, res, next) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id)) || id < 0) {
    return res
      .status(404)
      .json({ error: `id param must be positive integer: received ${id}` });
  } else {
    request.id = id;
    next();
  }
};

module.exports = { checkApplicationID };
