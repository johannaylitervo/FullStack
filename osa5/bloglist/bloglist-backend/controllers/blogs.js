const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {

    const token = request.token

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if(!('title' in body)) {
      return response.status(400).json('title missing')
    }

    if(!('url' in body)) {
      return response.status(400).json('url missing')
    }

    if(body.likes === undefined) {
      body['likes'] = 0
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }

})

blogsRouter.delete('/:id', async (request,response, next) => {
  try {
    const token = request.token

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)


    const blog = await Blog.findById(request.params.id)
    if(blog.user.toString() === user.id.toString()) {
      await blog.remove()
      response.status(204).end()
    }
    else {
      response.status(401).json({ error: 'only creator can delete a blog' })
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = await Blog.findById(request.params.id)
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try {
    const result = await Blog.findByIdAndUpdate(id, blog, { new: true })
    console.log(result)
    response.json(result.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter