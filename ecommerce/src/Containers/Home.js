import React from 'react'
import Header from '../Components/HeaderComponent';
import Layout from '../Components/Layout/Layout';
import MenuHeader from '../Components/MenuHeader/header';
import bg from '../images/bg1.jpg';


/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
    <Layout>
      <img width={1800} height={500} src={bg}/>
      <div id='title' style={{'textAlign':"center", "color":'black', "fontStyle":"italic", "padding":"20px"}}>
      <h1 >SHOPIFY</h1>
      </div>
      
    </Layout>
   )

 }

export default Home