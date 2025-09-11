import express from 'express';
import userController from '../controllers/userController.js';
import isAuthenticated from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/verify', isAuthenticated, userController.getUserById);

export default router;
