import { NextFunction } from "express";
import multer from "multer";
import { Request, Response } from "express";

export const errorMulter = ((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);

    if (err instanceof multer.MulterError) {
        // error dari multer limits
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "File terlalu besar. Maksimal 2MB." });
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({ message: "Format file tidak valid. Hanya PNG/JPG." });
        }
    }

    if (err instanceof Error && err.message.includes("Invalid file type")) {
        return res.status(400).json({ message: "Format file tidak valid. Hanya PNG/JPG." });
    }

    return res.status(500).json({ message: "Internal Server Error" });
});