import React from 'react'; 

export default class Loja extends React.Component{
    render(){
        return(
            <div className='loja'>
                <img src='/img/logo.png' alt='logomarca'/>
                <form>
                    <label><input className='nome' id='nome' type='text'/>nome</label>
                    <label className='email' id='email' type='email'>E-mail<input/></label>
                    <label className='phone' id='phone' type='tel'><input/>Telefone</label>
                </form>
            </div>
        );
    }
}