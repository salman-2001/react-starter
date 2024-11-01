import React, { memo } from 'react'
import "./Editmodal.css"
import Lottie from 'lottie-react';
import animationData from '../../assets/lotti/loading.json'



const Editmodal = (prop) => {
    const {isOpen, onClose, isData, setIsData, updatedData,formik,isPlaying} = prop
    if (!isOpen) return null
  return (
    <div>
        <div className="modal-overlay">
        <div className="modal-container">


<h1 style={{borderBottom:'none'}}>Edit Todo</h1>
<input type='text' className='editInput' value={formik.values.edit_name} 
onChange={formik.handleChange} name='edit_name' placeholder='name'  onBlur={formik.handleBlur}/>
{formik.errors.edit_name && formik.touched.edit_name && (
            <p className="validation1">{formik.errors.edit_name}</p>
          )}
<input type='text' className='editInput' value={formik.values.edit_role} 
onChange={formik.handleChange} name='edit_role'placeholder='role' onBlur={formik.handleBlur}/>
{formik.errors.edit_role && formik.touched.edit_role && (
            <p className="validation1">{formik.errors.edit_role}</p>
          )}
<input type='text' className='editInput' value={formik.values.edit_address} 
onChange={formik.handleChange} name='edit_address' placeholder='address' onBlur={formik.handleBlur}/>
{formik.errors.edit_address && formik.touched.edit_address && (
            <p className="validation1">{formik.errors.edit_address}</p>
          )}
<div className="yesNo" >
    
        <button className="modal-close" onClick={() => formik.handleSubmit()} >
        {isPlaying ? (
            <Lottie 
              animationData={animationData} 
              loop={true} 
              autoplay={true} 
              style={{ height: 40, width: 40, marginRight: 10 }} 
            />
          ) : "update" }

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