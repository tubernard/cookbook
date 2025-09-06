// Checks if the user ID exists on the session object
// If user ID exists, the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: 'Authentication required. Please log in.' });
  }
};

export default isAuthenticated;
