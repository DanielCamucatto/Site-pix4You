import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
export default class Footer extends React.Component{
    render(){
        return(
            <div className='footer'>
                <div>
                    <p>PIX4FUN</p>
                    <p>IMPRESSÃO DE FOTOS NO FORMATO POLAROID</p>
                    <AnchorLink href='malito'>CONTATO@PIX4FUN.COM.BR</AnchorLink>
                </div>
                <div>
                    <p>©:PIX4FUN Todos os direitos reservados. CNPJ: 18.882.937/0001-01</p>
                    <p>SIGA-NOS EM NOSSAS REDES SOCIAIS PARA FICAR POR DENTRO DE TODAS AS NOVIDADES</p>
                </div>
            </div>
        );
    }
}