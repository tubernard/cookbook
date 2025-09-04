import express from 'express';
import uploadController from '../controllers/uploadController.js';

const router = express.Router();

// This route provides the signature to the client
router.get('/sign', uploadController.signUpload);

export default router;
