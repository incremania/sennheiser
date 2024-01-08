const { Schema, default: mongoose } = require('mongoose');

const BlogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'please provide a blog title']
    },
    post: {
        type: String,
        required: [true, 'please make your post']
    },
    images: {
        type: [String]
    }
},
{timestamps: true}
)

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog