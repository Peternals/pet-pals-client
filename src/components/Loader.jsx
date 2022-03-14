import React from 'react'
import "../styles/loader.scss";

const Loader = () => {
  return (
    <div className='loader-main'>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader