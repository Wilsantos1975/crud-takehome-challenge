const { getApplicationById } = require("../queries/jobApplicationsQueries");
const applicationStatus = require("../constants")


const applicationFields  = ['company', 'status' ];

const checkApplicationID = async (req, res, next) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id)) || id < 0) {
    return res
      .status(404)
      .json({ error: `id param must be positive integer: received ${id}` });
  } else {
    req.id = id;
    next();
  }
};

const checkApplicationExists = async (req, res, next) => {
  const { id } = req.params;
  const application = await getApplicationById(id);
  if (!application) {
    return res.status(404).json({ error: `Application not found` });
  } else {
    next();
  }
};


const validateInput = async (req, res, next) => {
    const application = req.body;
  
    // Check if all required fields are present and are strings
    for (let field of ['company', 'url', 'createdAt', 'status', 'updatedAt']) {
      if (!application[field] || typeof application[field] !== 'string') {
        return res.status(400).json({ error: `${field} is required and must be a string` });
      }
    }
  
    // Check if any field is too long
    for (let field in application) {
      if (field !== 'url' && application[field].length > 100) {
        return res.status(400).json({ error: `${field} is too long` });
      }
    }
  
    next(); // Call next middleware if all validations pass
  };
// const  validateInput = async(req, res, next) => {
//     const application = req.body;

//     for (let field in applicationFields) {
//         if(!application[field] || typeof application[field] !== 'string') {

//             return res.status(404).json({ error: `${field} is required` });
//         }
//     }

//     for (let field in applicationFields) {
//         if(field !== 'url' && !applicationFields.includes(field)) {
//             return res.status(404).json({ error: `${field} is too long` });
//         }
//     }  



//     if(!application.url) {
//         application.url = null;
//     }
//     next();
// }

const checkApplicationStatus = async(req, res, next) => {
    const application = req.body;
   let statusArray = Object.values(applicationStatus);
   if(!Object.values(statusArray).includes(application.status)) {
         return res.status(404).json({ error: `Invalid status: ${application.status}` });
    }
    next();
}
    
    


module.exports = { checkApplicationID, checkApplicationExists,  checkApplicationStatus, validateInput};
