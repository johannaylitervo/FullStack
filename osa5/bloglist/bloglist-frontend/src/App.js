import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Blog from './components/Blog';


const App = () => {

  const [ notification, setNotification ] = useState('')
  const [ manner, setManner ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ blogs, setBlogs ] = useState([])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      setBlogs( await blogService.getAll() )
    }
    catch(exception) {
      setNotification('wrong credentials')
      setManner('error')
      setTimeout(() => {
        setNotification('')
        setManner('')
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

/* const rows = () => blogsToShow.map( blog => 
    <Blog 
      blog={blog}
    />
  )
  */


  const loginForm = () => (
    <div>
      <h2>Login to application</h2>
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

  return (
    <div>
     <h1>Blogs</h1>

     <Notification message={notification} manner={manner}/>
     {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in</p>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    }
    </div>
  )
}

export default App;
