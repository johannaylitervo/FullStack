import React from 'react'

const Notification = ({ message, manner }) => {
    if (message === null) {
      return null
    }
    if(manner === "error") {
        return (
            <div className="error">
              {message}
            </div>
          )
    }
    else if(manner === "notification") {
        return (
            <div className="notification">
                {message}
            </div>
        )
    }
    else {
        return (
            <div>
                {message}
            </div>
        )
    }
  }

  export default Notification