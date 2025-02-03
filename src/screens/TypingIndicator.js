import React from 'react'

import "./TypingIndicator.css"

const TypingIndicator = () => {
  return (
        <div className="typingIndicator">
          <span className="dot">Your AI is writing.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
       
  )
}

export default TypingIndicator