const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})

describe('testing the return of blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of blogs are returned is JSON', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('blogs identification field is called id', async () => {
    const response = await api
      .get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})
describe('adding new blog', () => {

  test('blog can be added', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    expect(response.body[helper.initialBlogs.length].title).toBe('Type wars')

  })

  test('if likes arent given, they are put to zero', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.testBlogLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('title missing', async () => {
    await api
      .post('/api/blogs')
      .send(helper.testBlogTitle)
      .expect(400)

  })

  test('url missing', async () => {
    await api
      .post('/api/blogs')
      .send(helper.testBlogUrl)
      .expect(400)
  })

})

afterAll(() => {
  mongoose.connection.close()
})