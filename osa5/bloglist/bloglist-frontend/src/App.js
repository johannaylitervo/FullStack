import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


const App = () => {

  const [ notification, setNotification ] = useState('')
  const [ manner, setManner ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ blogs, setBlogs ] = useState([])
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  useEffect(() => {
      blogService
        .getAll().then(blogs => {
          setBlogs(blogs)
        })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception) {
      setNotification('Wrong username or password')
      setManner('error')
      setTimeout(() => {
        setNotification('')
        setManner('')
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const logOut = async (event) => {
    try {
      await window.localStorage.clear()
      setNotification(`${user.name} logged out`)
      setManner('notification')
      setTimeout(() => {
        setNotification('')
        setManner('')
      }, 5000)
      setUser(null)
    }
    catch(exception) {
      setNotification('error')
      setTimeout(() => {
        setNotification('')
        setManner('')
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }

      const newBlog = await blogService
        .create(blogObject)
      
        setBlogs(blogs.concat(newBlog))

        setNotification(`New blog ${newBlog.title} created by ${user.name}`)
        setManner('notification')
        setTimeout(() => {
          setNotification('')
          setManner('')
        }, 5000)
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    catch(exception) {
      setNotification(exception)
      setManner('error')
      setTimeout(() => {
        setNotification('')
        setManner('')
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
     </div>
  )

  if(user === null) {
    return (
      <div>
        <h2>Login to application</h2>
        <Notification message={notification} manner={manner}/>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
     <h1>Blogs</h1>

     <Notification message={notification} manner={manner}/>

      <div>
        <p>{user.name} logged in <button onClick={logOut}>logout</button></p>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )
      
      }
      <BlogForm addBlog={addBlog} title={title} author={author} url={url} 
      setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl}/>
      </div>
     
    </div>
  )
}

export default App;
