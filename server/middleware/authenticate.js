import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authentication required. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res
      .status(401)
      .json({ message: 'Invalid token. Please log in again.' });
  }
};

export default isAuthenticated;
