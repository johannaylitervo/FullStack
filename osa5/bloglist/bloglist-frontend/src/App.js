import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

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

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="Log in">
        
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
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

  const showBlogs = () => {
    return (
      <div>
      {
          blogs.map(blog => 
            <Blog 
              key={blog.id} 
              blog={blog} 
            
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

      {blogForm()}
      </div>
      }
      {
          showBlogs()
      }
     </div>
  )
}

export default App;
