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

module.exports = blogsRouter