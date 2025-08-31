import cors from 'cors';
import { RequestHandler } from 'express';


const corsMiddelware: RequestHandler = cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
})

export default corsMiddelware;