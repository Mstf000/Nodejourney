const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Assuming your JWT contains user information
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized to access this resource' });
    }
};

module.exports = authenticate;
