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
    const { id_user } = req.params;
    connection.execute('SELECT * FROM tickets WHERE id_user = ?', 
        [id_user], 
    function (err, results, fields) {
        res.json(results);
    }
)
};