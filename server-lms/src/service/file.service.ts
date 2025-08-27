import fs from 'fs'
import path from 'path';
export class FileService {
    // delete img 
    static async deleteFile(filePath: string, fileName: string): Promise<void> {
        if (!filePath || !fileName) return;

        const filePathFull = path.join(
            __dirname,
            `../../public/uploads/${filePath}/${fileName}`
        );


        if (!fs.existsSync(filePathFull)) {
            throw new Error("File not found");
        }

        try {
            await fs.promises.unlink(filePathFull);
        } catch (err: any) {
            if (err.code === "ENOENT") {
                throw new Error("File not found");
            }
            throw new Error("Failed to delete file");
        }
    }
}