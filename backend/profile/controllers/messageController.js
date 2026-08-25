const Message = require('../models/messageModel');
const { sendNewMessageNotification } = require('../services/emailService');

// Public: a visitor submits the contact form.
const submitMessage = async (req, res) => {
    try {
        const { senderName, senderEmail, subject, message } = req.body;

        if (!senderName || !senderEmail || !message) {
            return res.status(400).json({ message: 'name, email, and message are required' });
        }

        const saved = await Message.create({ senderName, senderEmail, subject, message });

        // Fire the notification email, but don't let a failed email block the response.
        sendNewMessageNotification(saved);

        res.status(201).json({ message: 'Message sent, thank you!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Owner-only: view all submitted messages, newest first.
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Owner-only: mark one message as read.
const markMessageRead = async (req, res) => {
    try {
        const updated = await Message.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { submitMessage, getMessages, markMessageRead };