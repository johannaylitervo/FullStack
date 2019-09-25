import React, { useState } from 'react'

const Blog = ({
  blog,
  updateLikes,
  removeBlog,
  user
}) => {

  const [ blogExtended, setBlogState ] = useState(false)
  let removable = false

  if(user) {
    removable = blog.user.username === user.username
  }
  const showRemove = { display: removable ? '' : 'none' }
  const extendedBlog = { display: blogExtended ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: ''
  }

  try {
    return (
      <div style={blogStyle} className="blog">
        <div className={'blogname'} onClick={() => setBlogState(!blogExtended)} >
          {blog.title} by {blog.author}
        </div>
        <div style={extendedBlog} className="togglableContent">
          <a href={blog.url}>
            {blog.url}
          </a>
          <div>
            {blog.likes}
            <button onClick={updateLikes} className="likeButton">like</button>
            <div style={showRemove}>
              <button onClick={removeBlog}>remove</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  catch(exception) {
    return (
      null
    )
  }

}

export default Blog