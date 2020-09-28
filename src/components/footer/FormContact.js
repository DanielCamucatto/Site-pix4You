import React from 'react';

export default class FormContact extends React.Component{
    render(){
        return(
            <div className='formContact'>
                <form name='formContact' id='formContact' method='post' action=''>
                    <fieldset>
                        <legend>entre com contato conosco</legend>
                        <label><input className=''nome id='nome' type='text' placeholder='Nome'/></label>
                        <label><input className='email' id='email' type='email' placeholder='Email'/></label>
                        <label><textarea className='mensagem' id='mensagem' placeholder='Adicione uma mensagem'/></label>
                        <input className='botton' type='submit' value='Enviar'></input>    
                    </fieldset>
                </form>
            </div>
        );
    }
}