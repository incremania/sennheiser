const express = require('express');
const router = express.Router();
const {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController')
const uploadBlogImage = require('../controllers/blogImageController')
router
.post('/blog', createBlog)
.post('/blog/image', uploadBlogImage)
.get('/blog/:blogId', getSingleBlog)
.get('/blog/all', getAllBlog)
.patch('/blog/:blogId', updateBlog)
.delete('/blog/:blogId', deleteBlog)

module.exports = router