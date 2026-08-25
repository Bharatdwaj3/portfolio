const express = require('express');
const router = express.Router();
const validateToken = require('./middleware/tokenValidationMiddleware');
const { getSkills, updateSkill } = require('./controllers/skillController');

router.get('/', getSkills);
router.put('/:name', validateToken, updateSkill);

module.exports = router;