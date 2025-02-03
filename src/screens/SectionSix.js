import React from 'react'

import './SectionSix.css'

import {useNavigate} from 'react-router-dom'

const SectionSix = () => {


    const navigate = useNavigate()

    function handleButtonClick() {
      navigate('/privacy')
      window.scrollTo({ top: 0, behavior: 'smooth'});
    }
  
    function handleButtonClickTerms() {
      navigate('/terms')
      window.scrollTo({ top: 0, behavior: 'smooth'});
    }

  return (
    <div className="sectionSix"> 
    <section>
     <div className="sectionSix__background">
 
     <div className="sectionSix__gradient" />
         </div>
        <div className="sectionSix__body">
        <>
         <div className="sectionSix__title">
         <h2> Examples and Limitations </h2> 
         </div>
            <div className="sectionSix__entry">
          
              <h3> Examples </h3> 
             <p> Examples: Feel free to write the prompts however you want.  </p>
             <p>  It is recommended to write in the following ways to get the 
             </p> <p> best responses possible. 1. Start with how you feel and end </p>
               <p>with a  question. 2. Simply write question about how you feel. </p>
              <p> 3. Simply explain how you feel without a question. </p>
              <h3> Limitations </h3>
             <p> Limitations: Experience complete privacy and self-expression </p>
             <p>   with  our new chat button feature. By clicking the new chat </p>   
             <p> button your previous chat ends and the new chat starts, with </p>
             <p>  no storage in the history or web server. Feel empowered to </p>
             <p>  delve into your emotions, gain practical insights, and clear the</p>
            <p>  slate   when you're ready. If  you'd  like a storage feature please </p>
            <p> reach out to us via email. </p>
          <h3> Tokens </h3>
             <p>The difference between standard 175 max tokens and</p>
             <p>  upgrade 300 max tokens is that it is an option for expanded </p>
             <p>  capacity. The language  model AI will have more capacity to</p>
             <p>   generate text in more detail.</p>
             <br/>
             <p>We welcome your valuable feedback! </p>
             <p>Feel free to reach out to us at support@only-mindful.com </p>
             <br/>
             
             <p> © Copyright 2023. All Rights Reserved </p>
       
     <div className="sectionSix__last">
       <p> <span onClick={handleButtonClick} className="privacy">Privacy Policy</span>  | <span  onClick={handleButtonClickTerms}  className="terms">Terms of Service</span> </p>
       </div>
       
       
       

             </div>
            </>             
       
        </div>
        
       
      
       
 
 
 
        </section>
     
  


  </div>

  )
}

export default SectionSix