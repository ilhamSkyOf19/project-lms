import fs from 'fs/promises';

export const deleteFile = async (filePath: string): Promise<void> => {
    if (!filePath) return;
    try {
        // cek file
        await fs.access(filePath);
        // delete
        await fs.unlink(filePath);
        console.log('File deleted successfully');
    } catch (error: any) {
        if (error.code === 'ENOENT') console.log('File not found');
        else console.log(`Error deleting file`, error);
    }
};