import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks'

const App = () => {

  const [ notification, setNotification ] = useState('')
  const [ manner, setManner ] = useState('')
  //const [ username, setUsername ] = useState('')
  //const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ blogs, setBlogs ] = useState([])
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const username = useField('text')
  const password = useField('password')

  const blogFormRef = React.createRef()

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
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      setUser(user)
      username.reset()
      password.reset()
    }
    catch(exception) {
      setNotification('Wrong username or password')
      setManner('error')
      setTimeout(() => {
        setNotification('')
        setManner('')
      }, 5000)
    }
  }

  const logOut = async () => {
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
    blogFormRef.current.toggleVisibility()

    if( title === '' || author === '' || url === '' ) {
      setNotification('All fields are required')
      setManner('error')
      setTimeout(() => {
        setNotification('')
        setManner('')
      }, 5000)
    }
    else {
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
        setNotification('Error happened')
        setManner('error')
        setTimeout(() => {
          setNotification('')
          setManner('')
        }, 5000)
      }
    }
  }

  const updateLikes = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = {
      ...blog,
      likes: (blog.likes + 1)
    }
    try {
      const response = await blogService.update(id, updatedBlog)
      console.log(response)
      setBlogs(blogs.map(b => b.id !== id ? b : updatedBlog))
    } catch(error) {
      setNotification('Something happened')
      setManner('error')
      setTimeout(() => {
        setNotification('')
        setManner('')
      }, 5000)
    }
  }

  const removeBlog = async (blog) => {
    console.log(blog.id)

    if(window.confirm(`Do you really want to delete blog ${ blog.title } by ${blog.user.name}?`)) {
      const response = await blogService.remove(blog.id).catch(error => {
        console.log(error.response.data)
      })
      console.log(response)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setNotification(`${ blog.title} succesfully removed.`)
      setManner('notification')
      setTimeout(() => {
        setNotification('')
        setManner('')
      }, 5000)
    }

  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="Log in">
          <LoginForm className="loginForm"
            username={ username }
            password={ password }
            handleSubmit={ handleLogin }
          />
        </Togglable>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm
            onSubmit={addBlog}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            title={title}
            author={author}
            url={url}
          />
        </Togglable>
      </div>
    )
  }

  const sortBlogs = () => {
    blogs.sort( function(a , b) {return (b.likes - a.likes ) } )
  }

  const showBlogs = () => {
    sortBlogs()

    return (
      <div>
        {
          blogs.map(blog =>
            <Blog className="blog"
              key={blog.id}
              blog={blog}
              updateLikes={() => updateLikes(blog.id)}
              removeBlog={() => removeBlog(blog)}
              user={user}
            />
          )
        }
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={notification} manner={manner}/>
      { user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={logOut}>logout</button></p>

          {
            blogForm()
          }
          {
            showBlogs()
          }
        </div>
      }

    </div>
  )
}

export default App
