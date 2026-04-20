import multerl from 'multer';

const storage = multerl.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName)
    },
});

const upload = multerl({ storage });

export default upload