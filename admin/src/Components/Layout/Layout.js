import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';


import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import HeaderComponent from '../../Components/HeaderComponent';
import './layout.css'
import { NavLink } from 'react-router-dom';
/**
* @author
* @function Layout
**/

const Layout = (props) => {

  const[ sidebarOpen, setsidebarOpen ] = useState(false);

  const Toggle = (x) => {

    setsidebarOpen(x);

  }
  return(
    <>
       <HeaderComponent value={sidebarOpen} onChange={Toggle}/>
       {
         <Container fluid>

          {props.sidebar ?
          
            sidebarOpen?
            // <Row >
            //   <Col md={2} className="sidebar">
            //     <ul>
            //       <li></li>
            //       <li><NavLink exact to={`/`}>Home</NavLink></li>
            //       <li><NavLink to={`/page`}>Page</NavLink></li>
            //       <li><NavLink to={`/category`}>Category</NavLink></li>
            //       <li><NavLink to={`/products`}>Products</NavLink></li>
            //       <li><NavLink to={`/orders`}>Orders</NavLink></li>
            //     </ul>
            //   </Col>
            //   <Col md={10} style={{ marginLeft: 'auto', paddingTop: '20px' }}>
            //     {props.children}
            //   </Col>
            // </Row>
            //  :
            // <Row >
            //   <Col md={10} style={{ marginLeft: '0px', paddingTop: '20px' }}>
            //     {props.children}
            //   </Col>
            // </Row>
            <div>
              <div className='sidebar'>
                <ul>
                  <li></li>
                  <li><NavLink exact to={`/`}>Home</NavLink></li>
                  <li><NavLink to={`/page`}>Page</NavLink></li>
                  <li><NavLink to={`/category`}>Category</NavLink></li>
                  <li><NavLink to={`/products`}>Products</NavLink></li>
                  <li><NavLink to={`/orders`}>Orders</NavLink></li>
                </ul>
              </div>
              <div className='container-withsidebar'>
                {props.children}
              </div>
            </div>
            :
            <div style={{ marginLeft: '0px', paddingTop: '20px' }}>
               {props.children}
            </div>
          
            
          
          :
            <div style={{ marginLeft: '-1em' }}>
            {props.children}
            </div>
            } 
          </Container>
        
       }
       
    </>
    )

 }

export default Layout