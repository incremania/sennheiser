const cloudinary = require('cloudinary').v2;
const asyncWrapper = require('../middlewares/asyncWrapper');

const uploadImages = asyncWrapper(async (req, res) => {
    if(!req.files) {
      return res.status(400).json({error: "please upload atleast an image"})
    } 
    let productImages = req.files.images; // Assuming you use 'images' as the field name for multiple images
  
    if (!Array.isArray(productImages)) {
      productImages = [productImages];
    }
  
    const uploadPromises = productImages.map(async (image) => {
     try {
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        use_filename: true,
        folder: 'blog images',
      });
      return { src: result.secure_url };
     } catch (error) {
      return { error: `Error uploading image: ${error.message}` };
     }
    });
  
  
    const uploadedImages = await Promise.all(uploadPromises);
  
    res.status(200).json({ images: uploadedImages });
  });
module.exports = 
    uploadImages
