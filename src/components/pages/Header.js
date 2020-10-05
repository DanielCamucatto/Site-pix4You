import React from 'react';
import ButtonMob from '../header/ButtonMob';
import HeaderContent from '../header/HeaderContent';
import Nav from '../header/Nav';

export default class Header extends React.Component{
    render(){
        return(
            <div className='header'>
                <Nav/>
                <ButtonMob/>
                <HeaderContent/>
            </div>
        );
    }
}