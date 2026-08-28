const Testimonial = require('../models/testimonialModel');

// Public: list all testimonials.
const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Owner-only: add a testimonial after a client agrees to it.
const addTestimonial = async (req, res) => {
    try {
        const { clientName, clientRole, quote, projectRef } = req.body;

        if (!clientName || !quote) {
            return res.status(400).json({ message: 'clientName and quote are required' });
        }

        const testimonial = await Testimonial.create({ clientName, clientRole, quote, projectRef });
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Owner-only: remove a testimonial.
const deleteTestimonial = async (req, res) => {
    try {
        const deleted = await Testimonial.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(200).json({ message: 'Testimonial removed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getTestimonials, addTestimonial, deleteTestimonial };