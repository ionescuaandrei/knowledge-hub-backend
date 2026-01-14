const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers && (req.headers.authorization || req.headers['authorization'] || req.headers['x-access-token']);
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = (typeof authHeader === 'string' && authHeader.startsWith('Bearer '))
      ? authHeader.slice(7)
      : String(authHeader);

    jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Unauthorized' });
      req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
      next();
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};