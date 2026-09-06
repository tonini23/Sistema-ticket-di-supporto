import express, { Router } from 'express';
import * as commentsController from '../controllers/commentsController';

const router: Router = express.Router();

router.get('/api/comments', commentsController.getAllComments);
router.get('/api/comments/:ticket_id', commentsController.getCommentsByTicketId);
router.post('/api/comments', commentsController.createComment);

export default router;