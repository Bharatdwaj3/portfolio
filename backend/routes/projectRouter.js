const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/tokenValidationMiddleware');
const {
    getProjects,
    getProjectByName,
    getProjectsByLanguage,
    getFeaturedProjects,
    updateProjectOverride
} = require('../controllers/projectController');

router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/language/:language', getProjectsByLanguage);
router.get('/:name', getProjectByName);

router.put('/:name/overrides', validateToken, updateProjectOverride);

module.exports = router;
