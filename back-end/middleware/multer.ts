import multer from 'multer';

// Configure multer storage and file filter
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

export default upload;