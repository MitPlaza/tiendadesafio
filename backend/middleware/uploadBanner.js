// backend/middleware/uploadBanner.js
const multer = require('multer');
const path = require('path');

// Definir donde guardar y cómo nombrar el archivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `banner-${Date.now()}${ext}`);
  }
});

// Filtro: solo imágenes
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Solo imágenes permitidas'), false);
  },
  limits: { fileSize: 5 * 1024 * 1024 } // máx 5MB
});

module.exports = upload.single('banner');
