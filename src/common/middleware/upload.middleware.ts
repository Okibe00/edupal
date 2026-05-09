
import path from 'path';
import { fileURLToPath } from 'url';
import multer from  'multer';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: 'upload',
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    // Extract extension from original name (e.g., .jpg)
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }
});