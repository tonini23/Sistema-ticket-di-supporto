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