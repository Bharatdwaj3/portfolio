const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        senderName: { type: String, default: '' },
        senderEmail: { type: String, required: true },
        subject: { type: String, default: '' },
        message: { type: String, default: '' },
        read: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
