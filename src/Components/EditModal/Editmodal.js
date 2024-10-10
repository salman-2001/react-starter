import React, { memo } from 'react'
import "./Editmodal.css"
const Editmodal = (prop) => {
    const {isOpen, onClose, isData, setIsData, updatedData} = prop
    if (!isOpen) return null
  return (
    <div>
        <div className="modal-overlay">
        <div className="modal-container">


<h1 style={{borderBottom:'none'}}>Do You Want to Edit</h1>
<input type='text' className='editInput' value={isData} 
onChange={(e)=> setIsData(e.target.value)}/>
<div className="yesNo" >
    
        <button className="modal-close" onClick={updatedData} >
                Yes
              </button>




          <button className="modal-close" onClick={()=>onClose()}>
            Cancel
          </button>
    </div> 
        </div>
      </div>
    </div>
  )
}

export default  memo(Editmodal)