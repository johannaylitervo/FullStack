const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    if(!('title' in body)) {
      return response.status(400).json('title missing')
    }

    if(!('url' in body)) {
      return response.status(400).json('url missing')
    }

    if(body.likes === undefined) {
      body['likes'] = 0
    }
    const blog = new Blog(body)
    const result = await blog.save()
    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }

})

blogsRouter.delete('/:id', async (request,response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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