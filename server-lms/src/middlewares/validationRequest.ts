// validation-request.ts
import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";

export const validationRequest =
    (schema: ZodType) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body);
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    const errorMessage = error.issues.map(issue => issue.message);

                    return res.status(400).json({ error: "Invalid Request", details: errorMessage });
                }
                return res.status(500).json({ error: "Internal Server Error" });
            }
        };
