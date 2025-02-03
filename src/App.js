 import {
  BrowserRouter as Router,
  Routes,
  Route
 } from "react-router-dom";

import LoginScreen from "./screens/LoginScreen";

import HomeScreen from "./screens/HomeScreen";

import ProfileScreen from "./screens/ProfileScreen";

import React, {useEffect} from "react";

import {auth} from "./firebase";

import {useDispatch, useSelector} from "react-redux";

import {logout, login, selectUser} from "./features/userSlice";

import PrivacyScreen from "./PrivacyScreen";

import TermsScreen from './TermsScreen';

const App = () => {
 
  const user = useSelector(selectUser); // gives the user back
  // const user = null; // gives the user back

 const dispatch = useDispatch();

  useEffect(() => {
    //listens to any authenticate state changed
   const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //logged in
        //dispatch log in action
        dispatch(login({
          //dispatch the object into the redux store
          uid: userAuth.uid,
          email: userAuth.email,
        }))

      } else {
        //logged out
        dispatch(logout()); //resets user inside the redux state
      }
    });

    return unsubscribe;
  }, [dispatch]);
  
  return (
    <div className="app">

     <Router>
      <Routes>
      {!user ? ( 
        <>
        <Route path="*" element={<LoginScreen />} />
        <Route path="/privacy" element={<PrivacyScreen />} />
        <Route path="/terms" element={<TermsScreen />} />

        </>
         
      ) : (
        <>
      <Route path="/" element={<ProfileScreen />} />
    
      <Route path="/home" element={<HomeScreen />} />

    </>
    
      )}
        
       </Routes>
      </Router>
    </div>
  );
}

export default App;
