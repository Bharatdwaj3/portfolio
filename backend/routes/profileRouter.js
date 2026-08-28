const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/tokenValidationMiddleware');
const contactFormLimiter = require('../middleware/rateLimitMiddleware');
const { getProfile, updateProfile } = require('../controllers/profileController');
const { submitMessage, getMessages, markMessageRead } = require('../controllers/messageController');
const { getTestimonials, addTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
// Bio
router.get('/', getProfile);
router.put('/', validateToken, updateProfile);
// Contact form / inbox
router.post('/messages', contactFormLimiter, submitMessage);
router.get('/messages', validateToken, getMessages);
router.patch('/messages/:id', validateToken, markMessageRead);
// Testimonials
router.get('/testimonials', getTestimonials);
router.post('/testimonials', validateToken, addTestimonial);
router.delete('/testimonials/:id', validateToken, deleteTestimonial);
module.exports = router;
