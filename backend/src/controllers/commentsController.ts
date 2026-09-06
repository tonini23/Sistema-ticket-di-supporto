import { Request, Response } from 'express';
import { connection } from '../utils/db';
import { QueryError, RowDataPacket } from 'mysql2';

export async function getAllComments(req: Request, res: Response) {
    connection.execute('SELECT * FROM comments', 
        [], 
    function (err, results, fields) {
        res.json(results);
    }
)
};

export async function getCommentsByTicketId(req: Request, res: Response) {
    const { ticket_id } = req.params;
    
    connection.execute(`
        SELECT c.*, u.email as author_name 
        FROM comments c 
        LEFT JOIN users u ON c.user_id = u.id 
        WHERE c.ticket_id = ? 
        ORDER BY c.created_at ASC
    `, [ticket_id], 
    function (err, results) {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Errore durante il recupero dei commenti' });
            return;
        }
        res.json(results);
    });
};

export async function createComment(req: Request, res: Response) {
    const { ticket_id, user_id, text } = req.body;
    const created_at = new Date();
    
    connection.execute(
        'INSERT INTO comments (ticket_id, user_id, text, created_at) VALUES (?, ?, ?, ?)',
        [ticket_id, user_id, text, created_at],
        function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Errore durante la creazione del commento' });
                return;
            }
            res.status(201).json({ message: 'Commento inserito con successo' });
        }
    );
};

