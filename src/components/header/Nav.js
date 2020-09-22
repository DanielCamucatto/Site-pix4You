import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export default class Nav extends React.Component{
    render(){
        return(
            <div className="nav">
                <AnchorLink href='home'>Inicio</AnchorLink>
                <AnchorLink href='buy'>Comprar</AnchorLink>
                <AnchorLink href='doubt'>Dúvidas</AnchorLink>
                <AnchorLink href='contact'>Contatos</AnchorLink>
            </div>
            
        );
    }
}