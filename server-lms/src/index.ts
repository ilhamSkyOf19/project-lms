import express from "express";
// load env
import dotenv from "dotenv";
dotenv.config()


import corsMiddelware from "./middlewares/corsMiddleware";
import { connectDB } from "./db/db";
import authRoutes from "./routes/auth.route";
import paymentRoutes from "./routes/payment.route";
import cookieParser from 'cookie-parser';


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
app.get("/", (req: express.Request, res: express.Response) => res.send("Hello World!"));


app.use("/api", authRoutes);
app.use("/api", paymentRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})