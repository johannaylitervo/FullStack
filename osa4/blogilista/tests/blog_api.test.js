const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
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
describe('adding blogs', () => {

  test('blogs can be added', async () => {

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

  test('url missing', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.testBlogUrl)
      .expect(400)
    console.log(response.text)
  })

  test('title missing', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.testBlogTitle)
      .expect(400)
    console.log(response.text)
  })
})

afterAll(() => {
  mongoose.connection.close()
})