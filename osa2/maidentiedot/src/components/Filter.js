import React from 'react'

const Filter = ({value, handler}) => {
    
    return (
        <div>
            <p>Find countries <input value={value} onChange={handler} />
            
            </p>
        </div>
    )
}

export default Filter