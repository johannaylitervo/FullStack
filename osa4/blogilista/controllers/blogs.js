const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
  response.json(blogs.map(blog => blog.toJSON()))
  //response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if(!('title' in body)) {
    response.status(400).json('title missing')
  }

  else if(!('url' in body)) {
    response.status(400).json('url missing')
  }
  else {
    if(body.likes === undefined) {
      body['likes'] = 0
    }
    const blog = new Blog(body)
    const result = await blog.save()
    response.status(201).json(result)
  }
})

module.exports = blogsRouter