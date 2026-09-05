import { Request, Response } from 'express';
import { connection } from '../utils/db'; 
import { QueryError, RowDataPacket } from 'mysql2';
import { SetUser, UnsetUser, User, GetUser } from '../utils/auth';
import bcrypt from 'bcrypt';


/** Funzione per la registrazione di un nuovo utente */
export const register = async (req: Request, res: Response) => {
    
     logoutRequired(req, res);

    const { email, password} = req.body;

    const [users] = await connection.promise().execute(
        'SELECT email FROM users WHERE email = ? ', [email]);

    if (Array.isArray(users) && users.length > 0) {
        res.status(400).json({ message: 'Email già registrata' });
        return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await connection.promise().execute(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, passwordHash]
    );

    const [results] = await connection.promise().execute(
        'SELECT * FROM users WHERE email = ?', [email]);
    const newUser = (results as User[])[0];

    SetUser(req, res, newUser);

    res.json({ message: 'Utente registrato con successo', user: newUser });
};

/** Funzione per il login di un utente esistente */
export const login = async (req: Request, res: Response) => {

    logoutRequired(req, res);

    const { email, password } = req.body;

    const [results] = await connection.promise().execute(
        'SELECT * FROM users WHERE email = ? ', [email]);

    if(!Array.isArray(results) || results.length === 0) {
        res.status(400).json({ message: 'Email o password non validi' });
        return;
    }

    const userData = results[0] as any;

    const correctPassword = await bcrypt.compare(password, userData.password);

    if (!correctPassword) {
        res.status(400).json({ message: 'Email o password non validi' });
        return;
    }// non segnaliamo con precisione l'errore per motivi di sicurezza

    delete userData.password; 

    SetUser(req, res, userData);
    
    res.json({ message: 'Login effettuato con successo'});
    
};

/** Funzione per il logout dell'utente */
export const logout = async (req: Request, res: Response) => {
    const user = GetUser(req, res);
    if (!user) {
        res.status(401).json({ message: 'Questa operazione richiede il login' });
        return;
    }

    UnsetUser(req, res);

    res.json({ message: 'Logout effettuato con successo' });
};

/** Funzione per ottenere il profilo dell'utente autenticato */
export const getProfile = async (req: Request, res: Response) => {
    const user = GetUser(req, res);
    
    if (!user) {
        res.status(401).json({ message: "Nessun utente loggato" });
        return;
    }

    res.json(user); 
};

/** Funzione interna per verificare che l'utente non sia loggato */
function logoutRequired(req: Request, res: Response) {

    const user = GetUser(req, res);

    if (user) {
        res.status(401).json({ message: 'Questa operazione richiede il logout' });
        return;
    }
}