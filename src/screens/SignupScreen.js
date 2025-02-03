import {auth} from '../firebase';
import './SignupScreen.css';

import  {useState} from 'react'
import SigninScreen from './SigninScreen';

import React, {useRef} from "react";

import {provider} from '../firebase';

import { signInWithPopup } from "firebase/auth";

const SignupScreen = () => {
  

const [signIn2, setSignIn2] = useState(false);

const emailRef = useRef(null);
const passwordRef = useRef(null);

const  [passwordError, setPasswordError] = useState('');

const register = (e) => {
  e.preventDefault();

  // Check password strength
  const password = passwordRef.current.value;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/

if (!passwordRegex.test(password)) {
  
  setPasswordError('Password must contain at least 8 characters, one number, and one special character (!@#$%^&*)')
  return;

}

  auth.createUserWithEmailAndPassword(
    emailRef.current.value,
    password
  ).then((authUser) => {
    //console.log(authUser);
    
  })
  .catch((error) => {
    alert(error.message);
  });

};

const handleClick = (e)=> {
  e.preventDefault();
  
   signInWithPopup(auth, provider).then((authUser) => {
    console.log(authUser);
       
   }).catch(error => alert(error.message))

}

  return (
    <>
    {!signIn2 ? (
      <div className="signupScreen">
        <form>
          <h1>Create your account </h1>
          <input ref={emailRef} placeholder="Email" type="email" />
          <input ref={passwordRef} placeholder="Password" type="password" />
        {passwordError && <p>{passwordError}</p>}
          <button type="submit" onClick={register}>
            Sign up
          </button>
          <h4>
            <span className="signupScreen__gray">
               Already have an account?{' '}
            </span>
            <span className="sigupScreen__link" onClick={() => setSignIn2(true)}>
              Sign In
            </span>{' '}
          </h4>
          <div className="google_signIn">
              <button onClick={handleClick}>
                <img  className="signinScreen__googlelogo" src="Google-Logo-removebg.png" alt=""/>
                 Sign In With Google</button>
            </div>
        </form>
      </div>
    ) : (
      <SigninScreen />
    )}
  </>
   
  );
}

export default SignupScreen