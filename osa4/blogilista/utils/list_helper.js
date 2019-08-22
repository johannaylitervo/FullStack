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

module.exports = {
  dummy,
  totalLikes,
  favourite
}