import React, { memo } from "react";
import "./DeleteModal.css"
import { useGlobalContext } from "../../GlobalProvider";
import Lottie from "lottie-react";
import animationData from '../../assets/lotti/loading.json'

const DeleteModal = (prop) => {
  const { isOpen, onClose,deleteData,isPlaying } = prop;



  if (!isOpen) return null
  return (
    <div>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container">


<h1 style={{borderBottom:'none'}}>Do You Want to Delete</h1>
<div className="yesNo">
    
        <button className="modal-close" onClick={()=>deleteData()}>
        {isPlaying ? (
            <Lottie 
              animationData={animationData} 
              loop={true} 
              autoplay={true} 
              style={{ height: 40, width: 40, marginRight: 10 }} 
            />
          ) : "Yes" }
              </button>




          <button className="modal-close" onClick={()=>onClose()}>
            No
          </button>
    </div> 
        </div>
      </div>
    </div>
  );
};

export default memo(DeleteModal);
