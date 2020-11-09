import { useState } from "react";
import React from 'react';
import axios from 'axios'; 
// export default class FormContact extends React.Component{
//     render(){
//         return(
//             <div className='formContact'>
//                 <form name='formContact' id='formContact' method='post' action=''>
//                     <fieldset>
//                         <legend>entre com contato conosco</legend>
//                         <label><input className='name' id='name' type='text' placeholder='Nome'/></label>
//                         <label><input className='email' id='email' type='email' placeholder='Email'/></label>
//                         <label><textarea className='mensagem' id='mensagem' placeholder='Adicione uma mensagem'/></label>
//                         <input className='botton' type='submit' value='Enviar'></input>    
//                     </fieldset>
//                 </form>
//             </div>
//         );
//     }
// }

const initialValue ={
    name:'',
    email:'',
    mensagem:'',
}

const FormContact = () => {
    const [values,setValues]=useState({initialValue});

    function onChange(event){
        const {id,value} = event.target;
        setValues({...values, [id]:value});
    }
    function onSubmit(event){
        event.preventDefault()

        axios.post('url', values)
        .then((res)=>{
            
        })
    }
    return(
        <div className='formContact'>
                 <form name='formContact' id='formContact' method='post' onSubmit={onSubmit}>
                     <fieldset>
                         <legend>entre com contato conosco</legend>
                         <label><input className='name' id='name' type='text' placeholder='Nome' onChange={onChange}/></label>
                         <label><input className='email' id='email' type='email' placeholder='Email'onChange={onChange}/></label>
                         <label><textarea className='mensagem' id='mensagem' placeholder='Adicione uma mensagem'onChange={onChange}/></label>
                         <input className='botton' type='submit' value='Enviar'></input>    
                     </fieldset>
                 </form>
             </div>
    );
};
export default FormContact; 