import React from 'react';
import {FaFacebook} from 'react-icons/fa';
import{FaInstagram} from 'react-icons/fa';
import {FaPinterest} from 'react-icons/fa';
import AnchorLink from 'react-anchor-link-smooth-scroll';
// import Icons from 'react-icons/';
import FormContact from './footer/FormContact';
export default class Footer extends React.Component{
    render(){
        return(
            <div className='footer' id='contact'>
                <div className='box1'>
                    <p>PIX4FUN</p>
                    <p>IMPRESSÃO DE FOTOS NO FORMATO POLAROID</p>
                    <AnchorLink href='malito'>CONTATO@PIX4FUN.COM.BR</AnchorLink>
                </div>
                <FormContact/>
                <div className='box2'>
                    <p>©:PIX4FUN Todos os direitos reservados. CNPJ: 18.882.937/0001-01</p>
                    <p>SIGA-NOS EM NOSSAS REDES SOCIAIS PARA FICAR POR DENTRO DE TODAS AS NOVIDADES</p>
                </div>
                <div className='icons'>
                <AnchorLink href='https://www.instagram.com/pix4funphoto/' target='_blank'><FaInstagram/></AnchorLink>
                <AnchorLink href='https://www.facebook.com/pix4funphoto' target='_blank'><FaFacebook/></AnchorLink>
                <AnchorLink href='https://br.pinterest.com/' target='_blank'><FaPinterest/></AnchorLink>
                </div>
                
            </div>
            
        );
    }
}