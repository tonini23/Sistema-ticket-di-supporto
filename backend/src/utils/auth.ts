import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

export interface User {
    Id: number;
    Email: string;
    Password: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;
const COOKIE_NAME = 'sts_token';

/** Funzione per impostare il cookie di autenticazione con il token JWT */
export const SetUser = (req: Request, res: Response, user: any) => {
    const accessToken = jwt.sign( user, JWT_SECRET, { expiresIn: '1d' } )
    res.cookie(COOKIE_NAME, accessToken, {
        maxAge: 86_400_000,
        httpOnly: true,
        sameSite: true,

    });
}

/** Funzione per ottenere l'utente autenticato dal cookie di autenticazione */
export const GetUser = (req: Request, res: Response) => {
    const accessToken = req.cookies[COOKIE_NAME];
    if (!accessToken) return null;
    try {
        const user = jwt.verify(accessToken, JWT_SECRET) as User;
        return user;
    } catch (err) {
        return null;
    }
}

/**  Funzione per rimuovere il cookie di autenticazione con il tasto logout */
export const UnsetUser = (req: Request, res: Response) => {
    res.clearCookie(COOKIE_NAME);
}