import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ImageContent from './ImageContent';


export default class HeaderContent extends React.Component{
    render(){
        return(
            <div className='headerContent'>
                <ImageContent/>
                <h1>imprima suas memórias com estilo</h1>
                <AnchorLink className="know" href='#know'>CONHEÇA</AnchorLink>
            </div>
        );
    }
}