import React from 'react'

const BlogForm = (props) => {
  return (
      <div>
        <h2>Create a new blog</h2>
        <form onSubmit={props.addBlog}>
          <div>
            title:
            <input 
              type="text"
              name="title"
              value={ props.title } 
              onChange={({ target }) => props.setTitle(target.value)}/>
          </div>
          <div>
            author
            <input 
              type="text"
              name="author"
              value={ props.author } 
              onChange={({ target }) => props.setAuthor(target.value)}/>
          </div>
          <div>
            url
            <input 
              type="text"
              name="url"
              value={ props.url } 
              onChange={({ target }) => props.setUrl(target.value)}/>
          </div>
          
          <button type="submit">save</button>
        </form>
      </div>
  )
}

export default BlogForm