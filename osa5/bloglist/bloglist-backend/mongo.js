const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://johannay:${password}@cluster0-byuyz.mongodb.net/blog-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: 'Testi blogi',
  author: 'Testi taavi',
  url: 'upeablogi.com',
  likes: 7
})

blog.save().then(() => {
  console.log('blog saved!')
  mongoose.connection.close()
})