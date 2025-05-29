import express from 'express';
import { productModel } from '../models/productShema.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);


// Multer configuration .
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = path.join( 'D:/ProjetDeSynthese/MYOOM_store_er/FRONTEND/public/uploads');
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (_req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Images only! (JPEG, JPG, PNG)'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Create product with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, stock ,category} = req.body;
    
    // Validate required fields
    if (!name || !description || !category || !price || !stock ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get the uploaded image path (relative to public folder)
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const product = new productModel({
      name,
      description,
      category,
      price,
      imageUrl,
      stock
    });

    await product.save();
    
    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
});


router.get('/',async(req,res)=>{
    const products = await productModel.find();
    res.send(products)
})

router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    const product = await productModel.findById(id);
    res.send(product)
})
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    const updatedFields = {
      name,
      description,
      price,
      stock,
      category,
    };

    if (req.file) {
      updatedFields.imageUrl = `/uploads/${req.file.filename}`; // Save relative path
    }

    const product = await productModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.json(product);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).send("Error updating product");
  }
});

router.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    const product = await productModel.findByIdAndDelete(id);
    res.send(product)
})

export default router;