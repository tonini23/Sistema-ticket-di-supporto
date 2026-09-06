import express, { Router } from 'express';
import * as ticketsController from '../controllers/ticketsController';

const router: Router = express.Router();

router.get('/api/tickets', ticketsController.getAllTickets);
router.get('/api/tickets/:user_id', ticketsController.getTicketByIdUser);
router.post('/api/tickets', ticketsController.createTicket);
router.get('/api/tickets/detail/:id', ticketsController.getTicketById);

export default router;