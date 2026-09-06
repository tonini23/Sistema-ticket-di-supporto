import { Request, Response } from 'express';
import { connection } from '../utils/db';
import { GetUser } from '../utils/auth';

export async function getAllTickets(req: Request, res: Response) {
    connection.execute('SELECT * FROM tickets', 
        [], 
    function (err, results, fields) {
        res.json(results);
    }
)
};

export async function getTicketByIdUser(req: Request, res: Response) {
    const { user_id } = req.params;
    connection.execute( 'SELECT * FROM tickets WHERE user_id = ?',
        [user_id],
        function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Errore durante il recupero dei ticket'
                });
                return;
            }

            res.json(results);
        }
    );

};

export async function getTicketById(req: Request, res: Response){

    const user = GetUser(req, res);
    if (!user) {
        res.status(401).json({ message: 'Devi effettuare il login' });
        return;
    }

    const { id } = req.params;
    connection.execute( 'SELECT * FROM tickets WHERE id = ?',
        [id],
        function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Errore durante il recupero del ticket'
                });
                return;
            }

            res.json(results);
        }
    );
}

export async function createTicket(req: Request, res: Response) {
    const { user_id, title, description, category, priority } = req.body;
    const state = 'aperto'; 
    const created_at = new Date(); 

    connection.execute('INSERT INTO tickets (user_id, title, description, category, priority, state, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [user_id, title, description, category, priority, state, created_at],
        function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Errore durante la creazione del ticket'
                });
                return;
            }

            res.status(201).json({
                message: 'Ticket creato con successo'
            });
        }
    );
};

export async function updateTicket(req: Request, res: Response) {
    
    const user = GetUser(req, res);
    if (!user) {
        res.status(401).json({ message: 'Devi effettuare il login' });
        return;
    }

    const { id } = req.params;
    const { state } = req.body;

    if (!state) {
        res.status(400).json({ message: 'Il nuovo stato non può essere vuoto' });
        return;
    }

    connection.execute(
        'UPDATE tickets SET state = ? WHERE id = ?',
        [state, id],
        function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Errore durante l\'aggiornamento del ticket'
                });
                return;
            }

            res.status(200).json({
                message: 'Stato del ticket aggiornato con successo'
            });
        }
    );
};
