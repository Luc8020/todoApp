import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, 
    }
});

