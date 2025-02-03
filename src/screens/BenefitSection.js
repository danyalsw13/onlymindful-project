import React from 'react'

import './BenefitSection.css'

const BenefitSection = () => {
  return (
    <div className="BenefitSection">
    <section>
    <div className="BenefitSection__background">

    <div className="BenefitSection__gradient" />
        </div>
       <div className="BenefitSection__body">
       <>
        <div className="BenefitSection__title">
        <h2> Who can Benefit From OnlyMindful? </h2> 
        </div>
           <div className="BenefitSection__entry">
           <p><br/> </p> <h3> 1. Individuals seeking personal growth </h3>
            <p> Individuals who are actively interested in  
                personal </p>
                <p>  development, self-reflection, 
                and improving their </p>
                <p> emotional well-being. </p>
              <br/>  <h3> 2. People experiencing stress or anxiety </h3> 
            <p>The ability to express your emotions and 
                 receive  </p> <p> personalized insights could 
                 be beneficial for  </p>
                 <p>managing your mental well-being.</p>
            <p><br/> </p> <h3>3. Busy professionals </h3>
            <p> Professionals with demanding schedules may find it
               </p> <p>  challenging to allocate time for self-reflection, 
               </p>
                <p>  meditation or seek traditional therapy. </p>

            <p><br/> </p> <h3> 4. Individuals with limited access to traditional therapy  </h3>
            <p> Not everyone may have easy access to 
                in-person 
               </p> <p> therapy  due to  geographical limitations,
                or other 
               
                </p> <p> factors. OnlyMindful could potentially serve as an  </p>
                    <p>
                    accessible alternative for those seeking emotional 
                    </p>
             <p> support and  personal growth. </p>   

                
            
            </div>
            <div className="BenefitSection__imageStyle">
            <img className="BenefitSection__image" src="mobileView3.png" alt="" />
            <img className="BenefitSection__image" src="mobileView4.png" alt="" />

            </div>
           </>
           
       </div>


      
       </section>
       </div>

  )
}

export default BenefitSection