const rateLimit = require('express-rate-limit');

// Limits how often one IP can submit the contact form, to cut down on spam.
// Applied only to POST /profile/messages - nowhere else needs this.
const contactFormLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: { message: 'Too many messages sent. Please try again later.' }
});

module.exports = contactFormLimiter;