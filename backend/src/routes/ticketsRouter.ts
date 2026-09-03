import express, { Router } from 'express';
import * as ticketsController from '../controllers/ticketsController';

const router: Router = express.Router();

router.get('/api/tickets', ticketsController.getAllTickets);
router.get('/api/tickets/:id_user', ticketsController.getTicketByIdUser);

export default router;