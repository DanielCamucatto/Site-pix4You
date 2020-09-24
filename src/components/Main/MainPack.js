import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll'
export default class MainPack extends React.Component{
    render(){
        return(
            <div className='packContent'>
                <h2 className='packTitle'>Vamos experimentar?</h2>
                <div className='pack6'>
                <h2 className='title6'>pack com 6</h2>
                    <img src='/img/pack.png' alt='pack'/>
                    <li>tamanhos</li>
                    <p>Quadrado: 9cm X 11cm</p>
                        <p>Paisagem: 11cm X 9cm</p>
                        <p>Retrato: 7.5cm X 12cm</p>
                    <li>Fotos no formato polaroid</li>
                    <li>Papel Fotografico Kodak</li>
                    <li>Frete fixo R$10,00</li>
                    <h3>R$ 17.99</h3>
                    <AnchorLink href='#buy'>Comprar</AnchorLink>
                </div>
                <div className='pack12'>
                    <h2>pack com 12</h2>
                    <img src='/img/pack.png' alt='pack'/>
                    <li>tamanhos</li>
                        <p>Quadrado: 9cm X 11cm</p>
                        <p>Paisagem: 11cm X 9cm</p>
                        <p>Retrato: 7.5cm X 12cm</p>
                    <li>Fotos no formato polaroid</li>
                    <li>Papel Fotografico Kodak</li>
                    <li>Frete fixo R$10,00</li>
                    <h3>R$ 21.99</h3>
                    <AnchorLink href='#buy'>Comprar</AnchorLink>
                </div>
                <div className='pack18'>
                    <h2>pack com 18</h2>
                    <img src='/img/pack.png' alt='pack'/>
                    <li>tamanhos</li>
                    <p>Quadrado: 9cm X 11cm</p>
                        <p>Paisagem: 11cm X 9cm</p>
                        <p>Retrato: 7.5cm X 12cm</p>
                    <li>Fotos no formato polaroid</li>
                    <li>Papel Fotografico Kodak</li>
                    <li>Frete fixo R$10,00</li>
                    <h3>R$ 26.99</h3>
                    <AnchorLink href='#buy'>Comprar</AnchorLink>
                </div>
                
            </div>
        );
    }
}