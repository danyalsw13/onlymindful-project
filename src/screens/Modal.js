import React from 'react'

import './Modal.css'



 function Modal({open, children, onClose}) {
    if (!open) return null
  return (
   
   
   
   <>
    <div className="OVERLAY_STYLES" />
   
    <div className="MODAL_STYLES">
        <p>If you have an Only-Mindful account,  you will</p>
        <p>  
            get a password reset link to this email.</p>
        <button onClick={onClose}>Cancel</button>
        {children}</div>

        </>
  )
}

export default Modal