export type ResponseService<T> =
    | { success: true; data: T }
    | { success: false; message: string };