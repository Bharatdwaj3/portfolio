const mongoose = require('mongoose');

// Added by you (not publicly submitted) after a client agrees to it.
const testimonialSchema = new mongoose.Schema(
    {
        clientName: { type: String, required: true },
        clientRole: { type: String, default: '' },
        quote: { type: String, required: true },
        projectRef: { type: String, default: '' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);