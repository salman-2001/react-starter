import React, { memo } from "react";
import "./DeleteModal.css"

const DeleteModal = (prop) => {
  const { isOpen, onClose, deleteData  } = prop;
  if (!isOpen) return null
  return (
    <div>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container">


<h1 style={{borderBottom:'none'}}>Do You Want to Delete</h1>
<div className="yesNo">
    
        <button className="modal-close" onClick={()=>deleteData()}>
                Yes
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
