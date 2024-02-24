const Blog = require('../models/BlogModel');
const asyncWrapper = require('../middlewares/asyncWrapper')

const createBlog = asyncWrapper(async(req, res) => {
    const { title, post, image } = req.body;
    const blog = await Blog.create({
        title,
        post,
        image
    })
    res.status(201).json({ blog })
})

    const getAllBlog = asyncWrapper(async(req, res) => {
    const blogs = await Blog.find({})

    if(!blogs){
      return  res.status(404).json({ msg: 'no blogs available yet'})
    }
    res.status(200).json({nbHits: blogs.length, blogs })
})

const getSingleBlog = asyncWrapper(async(req, res) => {
    const { blogId } = req.params
    if(!blogId || blogId !== 24) {
        return res.status(400).json({ error: 'please provide a valid blog id'})
  
    }
    const blog = await Blog.findOne({_id: blogId});
    if(!blog) {
       return res.status(404).json({ error: 'no blog found'})
    }
    res.status(200).json({ blog })
})

const updateBlog = asyncWrapper(async(req, res) => {
    const { blogId } = req.params;
    const blog = await Blog.findByIdAndUpdate(blogId, req.body, {
        new: true, runValidators: true
    })

    if(!blog) {
        return res.status(404).json({ error: 'no blog found'})
  
    }
    res.status(200).json({ blog })
})

const deleteBlog = asyncWrapper(async(req, res) => {
    const { blogId } = req.params;
    await Blog.findByIdAndDelete(blogId)
    res.status(200).json({ msg: 'post deleted'})
})

module.exports = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog
}