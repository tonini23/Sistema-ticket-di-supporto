import { Request, Response } from 'express';
import { connection } from '../utils/db';
import { QueryError, RowDataPacket } from 'mysql2';

async function getAllUsers(req: Request, res: Response) {
    const sql = 'SELECT * FROM users';

    connection.query(sql, (error: QueryError | null, results: RowDataPacket[]) => {
       res.status(501).json({ message: 'Non ancora implementato' })
    });
};

export { getAllUsers };