const asyncHandler = require("express-async-handler");
const admin = require("../../config/firebase_conn");

const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "no token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "not authorized" });
    }
});

module.exports = validateToken;
