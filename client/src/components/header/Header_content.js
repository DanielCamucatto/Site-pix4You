import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll';

export default class Header_content extends React.Component{
    render(){
        return(
            <div className='header_content'>
                <h1>imprima suas memorias com estilo</h1>
                <AnchorLink href='#know'>CONHEÇA</AnchorLink>
            </div>
        );
    }
}