import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';


import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import HeaderComponent from '../../Components/HeaderComponent';
import './layout.css'
import { NavLink } from 'react-router-dom';
import MenuHeader from '../MenuHeader/header';
/**
* @author
* @function Layout
**/

const Layout = (props) => {
  

  // const[ sidebarOpen, setsidebarOpen ] = useState(false);

  // const Toggle = (x) => {

  //   setsidebarOpen(x);

  // }
  return(
    <>
       <HeaderComponent/>
       <MenuHeader/>
       {props.children}
      
    </>
    )

 }

export default Layout