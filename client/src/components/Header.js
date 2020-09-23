import React from 'react';
import ButtonMob from './header/ButtonMob';
import Header_content from './header/Header_content';
import Nav from './header/Nav';

export default class Header extends React.Component{
    render(){
        return(
            <div className='header'>
                <Nav/>
                <ButtonMob/>
                <Header_content/>
            </div>
        );
    }
}