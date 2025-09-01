import express, { NextFunction, Request, Response } from "express";
// load env
import dotenv from "dotenv";
dotenv.config()


import corsMiddelware from "./middlewares/corsMiddleware";
import { connectDB } from "./db/db";
import authRoutes from "./routes/auth.route";
import paymentRoutes from "./routes/payment.route";
import cookieParser from 'cookie-parser';
import { tokenMiddelware } from "./middlewares/tokenMiddleware";
import coursRoutes from "./routes/course.route";
import path from "path";
import multer from "multer";
import { errorMulter } from "./middlewares/errorMulter";
import categoryRoutes from "./routes/category.routes";
import courseDetailRoutes from "./routes/courseDetail.route";


type AuthRequest = Request & {
    data?: {
        id: string,
        name: string,
        email: string,
        role: 'manager' | 'student'
    }
}


const app: express.Application = express();


const PORT = process.env.PORT || 3001;

// connect db
connectDB();
// cors
app.use(corsMiddelware);
// json
app.use(express.json());

// cookie 
app.use(cookieParser());

// routes
app.get("/", tokenMiddelware, (req: AuthRequest, res: Response) => {
    const id = req.data;
    return res.status(200).json({ message: "Hello World", id });
});


app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));







app.use("/api", authRoutes);
app.use("/api", paymentRoutes);
app.use("/api", coursRoutes);
app.use("/api", categoryRoutes);
app.use("/api", courseDetailRoutes);




// logout
app.post("/api/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
});

// error multer 
app.use(errorMulter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})