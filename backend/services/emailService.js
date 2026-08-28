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
// senderName and message are optional (the newsletter-style form only
// collects an email), so both fall back to sensible defaults here.
// If sending fails, we log it but don't throw - the message is already
// safely saved in Mongo either way, so a flaky email shouldn't break the request.
async function sendNewMessageNotification(messageDoc) {
    try {
        const displayName = messageDoc.senderName || messageDoc.senderEmail;
        const displayMessage = messageDoc.message || '(No message provided)';

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.NOTIFY_EMAIL,
            subject: `New portfolio contact message from ${displayName}`,
            text: `From: ${displayName} (${messageDoc.senderEmail})\n\n${displayMessage}`
        });
    } catch (error) {
        console.log('Failed to send notification email:', error.message);
    }
}

module.exports = { sendNewMessageNotification };
