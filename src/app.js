require('dotenv').config();
const express = require('express');
const app = express();
const connectDb = require('./db/connect');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler')
const productRoute = require('./routes/productRoute')
const blogRoute = require('./routes/blogRoute');
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
// middlwares
app.use(express.json());
app.use(fileUpload({ useTempFiles: true}))
// routes
app.use('/api/products', productRoute)
app.use('/api/products', blogRoute)
app.get('/', (req, res) => {
    res.status(200).json('<h1> store api <a href="/api/v1/sennheiser">products</a></h1>')
})

  
// error middlewares'
app.use(notFound)

app.use(errorHandler)

// routes


// connect to database
const port = process.env.PORT || 3000

const startDb = async() => {
    try {
        connectDb(process.env.MONGO_URI_LOCAL)
        app.listen(port, console.log('listening on port ' + port))
    } catch (error) {
        console.log(error);
    }
}

startDb()


