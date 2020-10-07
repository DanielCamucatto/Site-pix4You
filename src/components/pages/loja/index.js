import React from 'react'; 
import '../loja/loja.css';

export default class Loja extends React.Component{
    render(){
        return(
            <div className='loja'>
                <div className='header'>
                <img src='/img/logo.png' alt='logomarca'/>
                </div>
                <form className='form'>
                    <fieldset>
                        <div className='grid'>
                        <label>Nome<input className='name' id='name' type='text'/></label>
                        <label>E-mail<input className='email' id='email' type='email'/></label>
                        <label>Telefone<input className='phone' id='phone' type='number'/></label>
                        <input className='botton' type='submit'  name='prosseguir' value='Prosseguir'/>    
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}