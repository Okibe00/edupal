
import path from 'path';
import { fileURLToPath } from 'url';
import multer from  'multer';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    // Extract extension from original name (e.g., .jpg)
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// 2. Initialize Upload Middleware
const upload = multer({ 
  storage,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
});

// // 3. The Upload Route
// app.post('/upload', upload.single('myFile'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'Please upload a file' });
//   }

//   res.status(200).json({
//     message: 'File saved successfully',
//     path: req.file.path
//   });
// });

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));