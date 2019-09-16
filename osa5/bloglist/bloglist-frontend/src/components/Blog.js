import React, { useState } from 'react'

const Blog = ({ 
  blog, 
  blogState
 }) => {
  
  const [ blogExtended, setBlogState ] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if(!blogExtended) {
    return (
      <div className={"blogname"} onClick={() => setBlogState(!blogExtended)} >
      {blog.title} by {blog.author}
      </div>
    ) 
  }
  else {
    return (
      <div style={blogStyle}>
        <div className={"blogname"} onClick={() => setBlogState(!blogExtended)}>
          {blog.title} by {blog.author}
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button>like</button>
        </div>
      </div>
    )
  }
}

export default Blog