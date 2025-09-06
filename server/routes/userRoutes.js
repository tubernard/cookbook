import express from 'express';
import userController from '../controllers/userController.js';
import sessionController from '../controllers/sessionController.js';

const router = express.Router();

router.post(
  '/signup',
  userController.createUser,
  sessionController.startSession,
  (req, res) => {
    // Exclude password from the response
    const { password, ...user } = res.locals.user.toObject();
    return res.status(201).json(user);
  },
);

router.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  (req, res) => {
    const { password, ...user } = res.locals.user.toObject();
    return res.status(200).json(user);
  },
);

router.post('/logout', sessionController.endSession);

export default router;
