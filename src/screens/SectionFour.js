import React from 'react'

import './SectionnFour.css'

import SectionSix from './SectionSix'


import SectionFive from './SectionFive'
import BenefitSection from './BenefitSection'
const SectionFour = () => {
  return (
    <div className="sectionFour">
    <section>
    <div className="sectionFour__background">

    <div className="sectionFour__gradient" />
        </div>
       <div className="sectionFour__body">
       <>
           <h2> Why OnlyMindful is For You?</h2>

           <div className="sectionFour__entry">
            
            <div className="sectionFour__container">
           <div className="sectionFour__box">
            <h4>Personalized emotional support: </h4>
            <p> OnlyMindful offers personalized emotional support and 
              guidance tailored to your unique needs, helping strengthen 
              your mind and enhance emotional well-being.
            </p>
           </div>
           <div className="sectionFour__box">
           <h4>Convenient accessibility: </h4>
            <p> With OnlyMindful, you can access support anytime, anywhere, fitting 
              seamlessly into your busy life and providing a user-friendly experience.
              No lengthy forms to fill, no countless hours of scrolling through content.
            </p>
           </div>
              
              <div className="sectionFour__box"> 
              <h4>Empowerment and growth: </h4>
            <p> OnlyMindful empowers you to take control of your emotional well-being, 
              gain new perspectives, develop self-awareness, and foster personal growth.
              It is like having a mentor or a coach one text away.
            </p>
              
              </div>
           <div className="sectionFour__box">
           <h4>Privacy and confidentiality: </h4>
            <p>  Ensuring a safe and secure space 
              for you to express yourself openly and confidentially.
            </p>

           </div>
           </div> 
            </div>
           </>
           <BenefitSection />
           <SectionFive/> 
           <SectionSix/> 

       </div>
       </section>

       
       </div>
  )
}

export default SectionFour