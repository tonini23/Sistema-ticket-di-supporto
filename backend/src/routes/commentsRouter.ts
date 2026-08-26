import express, { Router } from 'express';
import * as commentsController from '../controllers/commentsController';

const router: Router = express.Router();

router.get('/api/comments', commentsController.getAllComments);

export default router;