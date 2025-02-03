import React from 'react';

import { useState, useEffect} from 'react'

import {useRef} from "react";

import './HomeScreen.css'

import {auth} from "../firebase";


import TypingIndicator from './TypingIndicator';

import {useSelector} from 'react-redux' 

import './TypingIndicator.css'


import {useNavigate} from 'react-router-dom'

import db from '../firebase'
import { selectUser } from '../features/userSlice';


const HomeScreen = () => {

  const [isCancelled, setIsCancelled] = useState(true);

const user = useSelector(selectUser)
  const navigate = useNavigate()

  const [thisRole, setThisRole] = useState('')
   
    const [value, setValue] = useState(null)

    function handleButtonClick() {
      navigate('/')
    }
  
    // role and content is being saved under the 
    // const message, message is an object here
    const [message, setMessage] = useState([])
          //save prev chats
    const [previousChats, setPreviousChats] = useState([
      {
        title: "Your AI",
        role: "assistant",
        content: "I'm here to help. Please go ahead and share how you feel or how your mind feels."
      }
    ])
  
    const [currentTitle, setCurrentTitle] = useState("Your AI")
  
  const messageEndRef = useRef(null);
  
  const [typing, setTyping] = useState(false)
  
  
     const createNewChat = () => {
      setMessage(null)
      setValue("")
      setCurrentTitle("Your AI")
      setPreviousChats([
        {
          title: "Your AI",
          role: "assistant",
          content: "I'm here to help. Please go ahead and share how you feel or how your mind feels."

        }   
      ]);
     }
  
  
     //const handleClick = (uniqueTitle) => {
    //  setCurrentTitle(uniqueTitle)
      //setMessage(null)
      //setValue("")
     //}

     
  //define getMessages

  let max___Tokens;
//  console.log("RoleInTHE: ", thisRole)

  if (thisRole === 'standard') {
    max___Tokens = 175;
} else if (thisRole === 'premium') {
    max___Tokens = 300;
} else {
    max___Tokens = 175;
}

//console.log("MAX___Tokens: ", max___Tokens)


    const getMessages = async () => {
      setTyping(true);
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: value,
          maxTokens: max___Tokens
        }),
        headers: {
          "Content-Type": "application/json"
        }
        
      };
  
     
      try {
     
     const response = await fetch('https://us-central1-onlymindful-project.cloudfunctions.net/api/completions', options)
   // const response = await fetch('http://localhost:8000/completions', options)

     const data = await response.json()
      
     //  console.log(data)
    
       setMessage(data.choices[0].message)  
       setTyping(false);


      } catch (error) {
        setTyping(false);
        
  
      }
      
    };
  
   
    useEffect(() => {
  //   console.log(currentTitle, value, message)
     
     
      if (!currentTitle && value && message) {
        setCurrentTitle(value)
      }
      if (currentTitle && value && message) {
        setPreviousChats(prevChats => (
          [...prevChats, 
            {
              title: currentTitle,
              role: "user",
              content: value
  
          }, {
            title: currentTitle,
            role: message.role,
            content: message.content
          }
        ]
        ));

      }
     
    }, [message, currentTitle]) 
  
   //include for using cursor on a button too
    const  HandleKeyDown = (e) => {
      if (e.key ==='Enter') {
        e.preventDefault();
        getMessages();

        
             
       
      }

      
    };

    useEffect(() => {
      //scrollToLastMessage();
     
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setValue("");
    }, [previousChats]);
  
  
  //  console.log(previousChats)
  
   const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
 
   const uniqueTitles = Array.from (new Set(previousChats.map(previousChat => previousChat.title)))
  // console.log(uniqueTitles)


   function Navbar(props) {

    return (
      <nav className="homeScreen_navbar">

        <ul className= "homeScreen_navbar-nav"> {props.children}
        </ul>
      </nav>
    );
  }

   
   function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
      <div className="homeScreen_nav-item">
        <div className="homeScreen_icon-button" onClick={() => setOpen(!open)}>
          {props.icon}

        </div>
        {open && props.children}

      </div>

    );
  }



   function DropdownMenu() {

    function DropdownItem(props) {
      return (
        <div href="#" className="homeScreen_menu-item" onClick={props.onClick}>

          {props.children}
        </div>
      )
    }

    return (
      <div className="homeScreen_dropdown">
        <DropdownItem onClick={handleButtonClick}>  Settings </DropdownItem>
        <DropdownItem onClick={()=> auth.signOut()}>  Sign Out</DropdownItem>

      </div>

    );

  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await db
          .collection("customers")
          .doc(user.uid)
          .collection("subscriptions")
          .get();
  
        querySnapshot.forEach(async (subscription) => {
          const subscriptionData = subscription.data();
         
          setThisRole(subscription.data().role);
       //   console.log("RoleIn: ", subscription.data().role)


      
          // Check if the cancellation status has changed
      //    console.log("cancelAtPeriodEnd", cancelAtPeriodEnd) 
          // stores an object, how to get a string?
        
          const status = subscriptionData.status

          if (status === 'canceled') {
            // Subscription is canceled at the period end
      //      console.log("Subscription is canceled at the period end");
            setIsCancelled(true);
            
          } else {
            // Subscription is active
      //      console.log("Subscription is active");
            setIsCancelled(false);
  
          }
            
  
        });
      } catch (error) {
        alert.message(error);
       // console.error("Error fetching subscription data:", error);
      }
    };
  
    fetchData();
  }, [user.uid]);


    return (
      
     
   <div className="homeScreen">
      
<section className="main">
<div className="homeScreen__top">

{<h1>💭Your Thoughts</h1>}

<Navbar>
      <NavItem icon="____
      ____               ">
        

        <DropdownMenu  />

      </NavItem>

        </Navbar>
        </div>
      
        <ul className="feed">

  {currentChat.map((chatMessage, index) => (
    <li key={index} className={chatMessage.role === 'user' ? 'user-message' : 'bot-message'}>
      <div className="message-container" ref={messageEndRef}>
        <div className="role">{chatMessage.role === 'assistant' ? 'Your AI' : 'You'}</div>
        <div className="content"> {chatMessage.content}</div>
        
      </div>
    </li>
  ))}
       <li ref={messageEndRef}></li> {/* Reference the element for scrolling */}
</ul>

        <div className="bottom-section">
       <div className="bottom-section">
        <button className="newChat" onClick={createNewChat}> + New Chat </button>
        {typing && <TypingIndicator />}
          <div className="input-container">
            <textarea className="input_text" placeholder='Write here' value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={!isCancelled === true ? true : HandleKeyDown} disabled={!isCancelled === true}/>
            <div id="submit" >
           
           
           {/* <button className="submit_btn" onClick={getMessages} > ➤</button> */}

            
           <button className={`submit_btn`} onClick={getMessages}> ➤ </button> 
             
             
             </div>  
          </div>
          </div>
        
        </div>
       
       </section>
       
       
       {/*this section is used for sidebar */}
       <section className="side-bar">
       
        {/*will have history of previous prompts
        
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        
        </ul>
        */}
       </section>

       </div>
   
   
  );
}

export default HomeScreen
