import express, { Router } from 'express';
import * as usersController from '../controllers/usersController';

const router: Router = express.Router();

router.get('/api/users', usersController.getAllUsers);

export default router;