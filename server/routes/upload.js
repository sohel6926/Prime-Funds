// server/routes/upload.js — Cloudinary image upload endpoint
import express from 'express';
import multer from 'multer';
import { Readable } from 'stream';
import cloudinary from '../cloudinary.js';
import { requireAdminKey } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'), false);
  }
});

// Upload single image to Cloudinary
router.post('/', requireAdminKey, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  const folder = req.body.folder || 'prime-funds';

  try {
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `prime-funds/${folder}`,
          resource_type: 'image',
          transformation: [
            { quality: 'auto:good', fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      const readableStream = Readable.from(req.file.buffer);
      readableStream.pipe(uploadStream);
    });

    res.json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ error: 'Image upload failed', details: error.message });
  }
});

// Upload multiple images to Cloudinary
router.post('/multiple', requireAdminKey, upload.array('images', 10), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No image files provided' });
  }

  const folder = req.body.folder || 'properties';

  try {
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `prime-funds/${folder}`,
            resource_type: 'image',
            transformation: [{ quality: 'auto:good', fetch_format: 'auto' }]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        const readableStream = Readable.from(file.buffer);
        readableStream.pipe(uploadStream);
      });
    });

    const urls = await Promise.all(uploadPromises);
    res.json({ urls });
  } catch (error) {
    console.error('Cloudinary multi-upload error:', error);
    res.status(500).json({ error: 'Multi-image upload failed', details: error.message });
  }
});

export default router;
