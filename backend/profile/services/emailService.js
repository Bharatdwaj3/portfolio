const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Sends you an email when a visitor submits the contact form.
// If sending fails, we log it but don't throw - the message is already
// safely saved in Mongo either way, so a flaky email shouldn't break the request.
async function sendNewMessageNotification(messageDoc) {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.NOTIFY_EMAIL,
            subject: `New portfolio contact message from ${messageDoc.senderName}`,
            text: `From: ${messageDoc.senderName} (${messageDoc.senderEmail})\n\n${messageDoc.message}`
        });
    } catch (error) {
        console.log('Failed to send notification email:', error.message);
    }
}

module.exports = { sendNewMessageNotification };