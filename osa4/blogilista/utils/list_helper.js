const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blogs) => {
    return sum + blogs.likes
  }
  return blogs.reduce(reducer, 0)
}

const favourite = (blogs) => {

  const mostLikes = Math.max(...blogs.map(blog => blog.likes))
  const blog = blogs.find(blog => blog.likes === mostLikes)
  const favourite = {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
  return favourite
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) {
    return null
  }
  else {
    const authors = _.toPairs(_.countBy(blogs, 'author'))
    authors.sort((a, b) => b[1] - a[1])
    const author = {
      author: authors[0][0],
      blogs: authors[0][1]
    }

    return author
  }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) {
    return null
  }
  else {
    const authors = _(blogs).groupBy('author').map((author, name) => ({
      author: name,
      likes: _.sumBy(author, 'likes')
    })).value()
    authors.sort((a, b) => b.likes - a.likes)
    return authors[0]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favourite,
  mostBlogs,
  mostLikes
}