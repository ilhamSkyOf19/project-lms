import express from "express";


export class CourseControllers {
    static async getCourse(req: express.Request, res: express.Response) {
        res.json({
            message: "Get course"
        })
    }
}