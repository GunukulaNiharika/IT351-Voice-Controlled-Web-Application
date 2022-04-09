import React from 'react'
import Header from '../Components/HeaderComponent';
import Layout from '../Components/Layout/Layout';
import MenuHeader from '../Components/MenuHeader/header';
import bg from '../images/bg0.png';


/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
    <Layout>
      <img width={2000} height={700} src={bg}/>
      <div id='title' style={{'textAlign':"center", "color":'black', "fontStyle":"italic", "padding":"20px"}}>
      
      </div>
      
    </Layout>
   )

 }

export default Home