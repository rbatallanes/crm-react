import React from 'react'

const Alerts = ({children}) => {
  return (
    <div className='text-center my-2 text-red-700 font-bold'>
        {children}
    </div>
  )
}

export default Alerts