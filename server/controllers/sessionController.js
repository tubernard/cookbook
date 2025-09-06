const sessionController = {};

sessionController.startSession = (req, res, next) => {
  req.session.userId = res.locals.user._id;
  return next();
};

sessionController.endSession = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Could not log out, please try again.' });
    }
    res.clearCookie('connect.sid'); // The default session cookie name
    return res.status(200).json({ message: 'Logged out successfully.' });
  });
};

export default sessionController;
