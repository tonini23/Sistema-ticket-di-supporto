import { Request, Response } from 'express';
import { connection } from '../utils/db';
import { QueryError, RowDataPacket } from 'mysql2';

async function getAllTickets(req: Request, res: Response) {
    const sql = 'SELECT * FROM tickets';

    connection.query(sql, (error: QueryError | null, results: RowDataPacket[]) => {
        if (error) {
            console.error("Errore recupero ticket:", error);
            res.status(500).send('Errore del server');
        } else {
            res.json(results);
        }
    });
};

export { getAllTickets };