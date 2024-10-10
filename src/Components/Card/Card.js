import React from 'react'
import "./Card.css"

const Card = (prop) => {
    const {data} =prop
  return (
    <div className='Card'>
        <h3>Name: {data.name}</h3>
        <h3>Email: {data.email} </h3>
        <h3>Phone:{data.phone} </h3>
        <h3>Address: {data.address.street}</h3>

    </div>
  )
}

export default Card