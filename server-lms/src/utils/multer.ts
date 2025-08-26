import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
import fs from 'fs';

// file destination 
const storage = multer.diskStorage({
    // destination
    destination: (_req, _file, cb) => {
        const dir = path.join(__dirname, '../../public/uploads/course');

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    // filename     
    filename: (_, file, cb) => {
        // extention 
        const ext: 'png' | 'jpg' | 'jpeg' = file.originalname.split('.').pop() as 'png' | 'jpg' | 'jpeg';
        // uniq id 
        const uniqId: string = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

        // return
        cb(null, `${file.fieldname}-${uniqId}.${ext}`);

    }

})


// file filter 
const fileFilter = (_: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    // mime type
    const allowMediaType = ['image/png', 'image/jpeg', 'image/jpg'];

    // cek 
    if (allowMediaType.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


// middleware upload 
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
})



export default upload;