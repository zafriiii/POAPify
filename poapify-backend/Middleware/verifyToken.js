const admin = require('firebase-admin');

// Middleware to verify Firebase Auth Token
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Attach the authenticated user's info to the request
        next();
    } catch (error) {
        return res.status(401).send({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = verifyToken;
