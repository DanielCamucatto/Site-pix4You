import React from 'react';

export default class MainContent extends React.Component{
    render(){
        return(
            <div className='mainContent' id='know'>
                <h2 className='titleContent'>Veja como é fácil</h2>
                <div className='mainContainer'>
                <div className='one'>
                    <picture>
                        <img src='/img/1.jpg' alt="um" width='150'/>
                    </picture>
                    <h2>Escolha seu Pack</h2>
                    <p>Temos packs com 6,12 e 18 fotos</p>
                </div>
                <div className='two'>
                    <picture>
                        <img src='img/2.jpg' alt='dois' width='150'/>
                    </picture>
                    <h2>Envie suas fotos</h2>
                    <p>Clique em comprar no pack escolhido, escolha suas fotos, edite-as e nos Envie.</p>
                </div>
                <div className='three'>
                    <picture>
                        <img src='img/3.jpg' alt='três' width='150'/>
                    </picture>
                    <h2>Pronto</h2>
                    <p>Finalize com o pagamento, endereço de envioe pronto, agora é só aguardar suas fotos chegarem na sua casa.</p>
                    </div>
                </div>
            </div>
        );
    }
}