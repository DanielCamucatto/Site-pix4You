import React from 'react';

export default class MainFAQ extends React.Component{
    render(){
        return(
            <div className='faq' id='doubt'>
                <h2>F.A.Q</h2>
                <h4>em que material são revelados as minhas fotos?</h4>
                <p>Suas fotos serão reveladas em papel fotográfico Kodak® em laboratório fotográfico profissional.</p>
                <h4>QUAIS as formas DE PAGAMENTO?</h4>
                <p>Trabalhamos com a plataforma de pagamentos do Pagseguro, portanto aceitamos cartões e boleto.</p>
                <h4>COMO Serão Enviadas as minhas fotos?</h4>
                <p>Suas fotos serão enviadas por carta registrada através do Correios em uma embalagem PIX4FUN personalizada com frete fixo de R$10,00.</p>
                <h4>EM QUANTO TEMPO RECEBEREI MINHAS FOTOS?</h4>
                <p>Após confirmado o pagamento, pedimos um prazo de 3 dias para a produção. Logo após passa a vigorar o prazo de entrega de carta registrada dos Correios, que leva de 3 a 14 dias úteis dependendo da região.</p>
            </div>
        )
    }
}