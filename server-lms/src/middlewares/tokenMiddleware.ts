import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userSchema from "../schema/userSchema";

export type AuthRequest = Request & {
    data?: {
        id: string,
        name: string,
        email: string,
        role: 'manager' | 'student'
    }
}

export const tokenMiddelware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    // get token cookie
    const token = req.cookies.token;

    //  check token
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT || "") as { data: { id: string } };
        const userId = decoded.data.id;

        // cek user 
        const findUser = await userSchema.findById(userId, "_id name email role");

        if (!findUser) return res.status(401).json({ message: "Unauthorized" });

        req.data = {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.role
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
} 