
import "./SigninScreen.css";
import React, {useRef} from "react";
import {auth, provider} from '../firebase';

import { signInWithPopup } from "firebase/auth";

import {useState} from "react";
import SignupScreen from "./SignupScreen"


import  Modal  from './Modal';

const SigninScreen = () => {

  const [isOpen, setIsOpen] = useState(false)

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [signUp, setSignUp] = useState(false);

  const signIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then((authUser) => {
     // console.log(authUser);
    }).catch(error => alert(error.message));
  };
  


  

  const handleClick = (e)=> {
    e.preventDefault();
    
     signInWithPopup(auth, provider).then((authUser) => {
     // console.log(authUser);
         
     }).catch(error => alert(error.message))

  }


  const handleForgotPassword = (e) => {
    e.preventDefault();

    auth.sendPasswordResetEmail(emailRef.current.value).then(() => {
      alert("Password reset email sent")
    //  console.log('Password reset email sent successfully');
    // display a success message or show a confirmation to the user
    })
    .catch((error) => {
      alert(error)
    //  console.log('Error sending password reset email:', error);
    });
  };



  return (

    <>
      {!signUp ? (
        <div className="signinScreen">
          <form>
            <h1>Sign In</h1>
            <input ref={emailRef} placeholder="Email" type="email" />
            <input ref={passwordRef} placeholder="Password" type="password" />
            <button type="submit" onClick={signIn}>
              Sign In
            </button>
           
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="signinScreen_Modal">
            <form >

              <input ref={emailRef} type="email" placeholder="Email"
              
              />
              <button type="submit" onClick={handleForgotPassword}>Reset Password</button>
              </form>

              </div>
              </Modal>
              
            
            <h4>    
              <span className="signinScreen__gray" onClick={() => setIsOpen(true)}>
                Forgot password? </span>       


              <span className="signinScreen__link" onClick={() => setSignUp(true)}>
                Sign up now
              </span>
            </h4>
            <div className="google_signIn">
              <button onClick={handleClick}>
                <img  className="signinScreen__googlelogo" src="Google-Logo-removebg.png" alt=""/>
                 Sign In With Google</button>
            </div>
          </form>
        </div>
      ) : (
        <SignupScreen />
      )}
    </>
    
  );
}

export default SigninScreen