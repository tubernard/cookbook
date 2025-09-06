import User from '../models/User.js';

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required.' });
    }
    const newUser = await User.create({ username, password });
    res.locals.user = newUser;
    return next();
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(409).json({ message: 'Username already taken.' });
    }
    return next({ log: `Error in userController.createUser: ${error}` });
  }
};

userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ message: 'Incorrect username or password.' });
    }
    res.locals.user = user;
    return next();
  } catch (error) {
    return next({ log: `Error in userController.verifyUser: ${error}` });
  }
};

export default userController;
