import React from 'react'
import './LoginScreen.css'

import SigninScreen from './SigninScreen'

import SignupScreen from './SignupScreen'

import {useState} from 'react'

import SectionThree from './SectionThree'

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  return (
    
   
    <div className="loginScreen">
   <section>    
    <div className="loginScreen__background">
          <img className="loginScreen__logo" src="newLeaf-noBg.png" alt="" />

        <button onClick={() => setSignIn(true)} className="loginScreen__button"> 
          Sign In

          </button>
         
          <div className="loginScreen__gradient" />


    </div>
    
   
    <div className="loginScreen__body">
      {signIn ? (

         <SigninScreen />
         ) : signUp ? (
          <SignupScreen />
         ) : (
          
        <>
        <h1>OnlyMindful</h1>
        <h3>Express Freely, Overcome Anxiety, And Cultivate  <br/>
        
       Self-Compassion With Conversational AI  <br/> 
      
          Companion: Your Personalized Guide</h3>
        <h4>Start Your Empowered Journey Today </h4>



   
        <button onClick={() => setSignUp(true)} className="loginScreen__signupbtn">Sign Up
       </button> 
        </>
         ) }
        
    </div>

    
          
    <SectionThree/>

    
    
    
    </section>
    
    
    </div>

   

  );
}

export default LoginScreen