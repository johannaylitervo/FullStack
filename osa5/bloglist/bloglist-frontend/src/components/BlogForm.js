import React from 'react'

const BlogForm = ({ 
  onSubmit, 
  handleTitleChange, 
  handleAuthorChange, 
  handleUrlChange, 
  title, 
  author, 
  url
}) => {
  return (
      <div>
        <h2>Create a new blog</h2>
        <form onSubmit={onSubmit}>
          <div>
            title:
            <input 
              type="text"
              name="title"
              value={title} 
              onChange={handleTitleChange}/>
          </div>
          <div>
            author
            <input 
              type="text"
              name="author"
              value={author} 
              onChange={handleAuthorChange}/>
          </div>
          <div>
            url
            <input 
              type="text"
              name="url"
              value={url} 
              onChange={handleUrlChange}/>
          </div>
          
          <button type="submit">save</button>
        </form>
      </div>
  )
}

export default BlogForm