const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        senderName: { type: String, required: true },
        senderEmail: { type: String, required: true },
        subject: { type: String, default: '' },
        message: { type: String, required: true },
        read: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);