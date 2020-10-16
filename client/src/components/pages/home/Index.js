import React from 'react';
import '../home/index.css'
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';
export default class Index extends React.Component{
  render(){
    return(
      <div>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}