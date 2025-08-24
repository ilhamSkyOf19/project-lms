import express from "express";
// load env
import dotenv from "dotenv";
dotenv.config()


import corsMiddelware from "./middlewares/corsMiddleware";
import courseRoutes from "./routes/courseRoutes";
import { connectDB } from "./db/db";
import authRoutes from "./routes/auth.route";
const app: express.Application = express();


const PORT = process.env.PORT || 3001;

// connect db
connectDB();
// cors
app.use(corsMiddelware);
// json
app.use(express.json());

// routes
app.use("/api", courseRoutes);
app.use("/api", authRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})