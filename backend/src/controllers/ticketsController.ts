import { Request, Response } from 'express';
import { connection } from '../utils/db';

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

export async function createTicket(req: Request, res: Response) {
    const { user_id, title, description, priority } = req.body;
    connection.execute('INSERT INTO tickets (user_id, title, description, priority) VALUES (?, ?, ?, ?)',
        [user_id, title, description, priority],
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
