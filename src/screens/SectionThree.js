import React from 'react'

import './SectionThree.css'

import  SectionFour from './SectionFour'

const SectionThree = () => {
  return (
    <div className="sectionThree">

    <section>
    <div className="sectionThree__background">

  
    <div className="sectionThree__gradient" />
        </div>
       

       <div className="sectionThree__body">

           <>
           <div className="sectionThree__title">

           <h2> What is OnlyMindful?
           </h2>
          
           </div>   
          
           <div className="sectionThree__entry">
           
         
           <p> OnlyMindful is a subscription based website where the AI  </p>
            <p> language model becomes your personal guide on the journey of  </p>
            <p> meditation, self-care, and mental strength. By utilizing cutting-</p> 
            <p> edge AI technology,  OnlyMindful provides responses tailored to </p>
            <p> your unique needs. Experience the profound impact of your  </p>
            <p> Conversational AI Companion as you elevate  the quality of your </p>
            <p> thoughts and unlock a life of greater fulfillment.  </p>   
            </div>
            <img className="sectionThree__image" src="img5.png" alt="" />

           </>  

        <SectionFour/>
 
       </div>
      
       </section>
       </div>
  )
}

export default SectionThree