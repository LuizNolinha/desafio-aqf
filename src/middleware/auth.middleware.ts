import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config'; 


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

    if (!authHeader) {
         res.status(401).json({ message: 'Token não enviado' });
        return;
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,  process.env.JWT_SECRET || '');
        (req as any).user = decoded;
        next();
    } catch {
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
    

}
