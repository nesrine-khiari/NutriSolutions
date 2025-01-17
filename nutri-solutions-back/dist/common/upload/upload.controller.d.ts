export declare class FileUploadController {
    uploadImage(image: Express.Multer.File): {
        message: string;
        filename: string;
        path: string;
    };
    uploadFile(file: Express.Multer.File): {
        message: string;
        filename: string;
        path: string;
    };
}
