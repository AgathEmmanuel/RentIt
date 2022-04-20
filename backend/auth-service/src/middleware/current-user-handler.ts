import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface userDetails {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: userDetails;
        }
    }
}
export const currentUserHandler = ( req: Request, res: Response, next: NextFunction ) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const jwtUserDetails = jwt.verify( req.session.jwt, process.env.JWT_SECRET_KEY!) as userDetails;
        req.currentUser = jwtUserDetails;
    } catch (err) {

    }
    next();
}