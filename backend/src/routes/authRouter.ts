import express from 'express';
import * as authController from '../controllers/authController';

const router = express.Router();

// Rotte di autenticazione
router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);
router.post('/api/auth/logout', authController.logout);
router.get('/api/auth/user', authController.getProfile);

export default router;