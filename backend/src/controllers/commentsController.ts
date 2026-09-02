import { Request, Response } from 'express';
import { connection } from '../utils/db';
import { QueryError, RowDataPacket } from 'mysql2';

async function getAllComments(req: Request, res: Response) {
    const sql = 'SELECT * FROM comments';

    connection.query(sql, (error: QueryError | null, results: RowDataPacket[]) => {
       res.status(501).json({ message: 'Non ancora implementato' })
    });
};

export { getAllComments };