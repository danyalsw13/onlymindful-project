import React from 'react'

import './ProfileScreen.css';

import {selectUser} from "../features/userSlice";

import {useSelector} from 'react-redux';

import {auth} from "../firebase";

import PricingTable from './PricingTable';

import {useNavigate} from 'react-router-dom'

import {useState} from 'react';


const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate()

  function handleButtonClick() {
    navigate('/home')
  }

  function Navbar(props) {

    return (
      <nav className="navbar">

        <ul className= "navbar-nav"> {props.children}
        </ul>
      </nav>
    );
  }

  function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
      <div className="nav-item">
        <div className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}

        </div>
        {open && props.children}

      </div>

    );
  }

  function DropdownMenu() {

    function DropdownItem(props) {
      return (
        <div href="#" className="menu-item" onClick={props.onClick}>

          {props.children}
        </div>
      )
    }

    return (
      <div className="dropdown">
        <DropdownItem onClick={handleButtonClick}>  Go to Home Page</DropdownItem>
        <DropdownItem onClick={()=> auth.signOut()}>  Sign Out</DropdownItem>

      </div>

    );

  }

  return (
   <div className="profileScreen">

    <Navbar>


      <NavItem icon="Settings">
        

        <DropdownMenu  />

      </NavItem>

        </Navbar>
        <h1>Empowering Minds, Uplifting Spirits</h1>

    <div className="profileScreen__body">
{/*
      <button onClick={handleButtonClick}
      className="profileScreen__change">
        Go To HomeScreen
      </button>
  */}
      <div className="profileScreen__info">
      
        <div className="profileScreen__details">
          <h2>Email: {user.email}</h2>
        
          <div className="profileScreen__plans">
           
          {/* <button onClick={()=> auth.signOut()} className="profileScreen__signOut">Sign Out</button> */}  
           
            <h3>Choose a plan that fits your preference</h3>
            <PricingTable />
          </div>
        </div>
      </div>
    </div>
   </div>
  )
}

export default ProfileScreen