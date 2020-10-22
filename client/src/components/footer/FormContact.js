import React from "react";
import {useForm} from 'react-hook-form';

const initialValue = {
    name:'',
    message: '',
}

const FormContact = () => {
    const {register, handleSubmit, errors} = useForm();
    
    function onSubmit(data){
        console.log('Data submitted: ', data);
    }
    return(
        <div className='formContact'>
                <form name='formContact' id='formContact' onSubmit={handleSubmit(onSubmit)} >
                     <fieldset>
                         <legend>entre com contato conosco</legend>
                         <label>
                             <input 
                                className='name' 
                                name='name'
                                id='name' 
                                type='text' 
                                placeholder='Nome'
                                ref={register({
                                    required: 'Name',
                                    pattern:{
                                        value: /^[A-Z][a-z]* [A-Z][a-z]*/i,
                                        message: 'Entre com um nome válido'
                                    }
                                })}
                            />
                            {errors.name && <p className='error'>{errors.name.message}</p>}
                        </label>
                         <label>
                             <input 
                                className='email' 
                                name='email'
                                id='email' 
                                type='email' 
                                placeholder='Email'
                                ref={register({
                                    required: 'Entre com seu e-mail',
                                    pattern:{
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Entre com um e-mail válido",
                                    }
                                })}
                             />
                             {errors.email && <p className='error'>{errors.email.message}</p>}
                        </label>
                         <label>
                             <textarea 
                                className='mensagem' 
                                name='message' 
                                id='message'
                                placeholder='Adicione uma mensagem'
                                ref={register()}
                                
                            />
                            </label>
                         <input className='botton' type='submit' value='Enviar'></input>    
                     </fieldset>
                 </form>
             </div>
    )
}

export default FormContact;











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