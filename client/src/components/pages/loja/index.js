import React, { useState } from "react";
import '../loja/loja.css';

const Loja = ({props, match}) => {


        const cleanForm = () =>{
            setName('');
            setItemId('');
            setPhoneNumber('')
            setUserEmail('');
            setUploaded_file([]);
        }

      async function onFormSubmit(){

        const url = process.env.API_URL || 'http://localhost:8089/api/orders';
        const formData = new FormData();
    
        formData.append('userName', name);
        formData.append('userEmail', userEmail);
        formData.append('phoneNumber', phoneNumber);
        formData.append('itemId', 1);
        formData.append('uploaded_file', uploaded_file);

        try {

            let rawResponse = await fetch(url, {method: 'POST',body: formData});
            
            if (rawResponse.status == 201) {
                let result = await rawResponse.json();
                console.log('order %j', result.order);
                setGlobalId(result.order.globalId)
                cleanForm();
            }
        } catch (error) {
            console.error('Error creating order. Formdata %j. Error message %j', formData, error);
        }
      }
    
      const [name, setName] = useState('');
      const [userEmail, setUserEmail] = useState('');
      const [phoneNumber, setPhoneNumber] = useState('');
      const [itemId, setItemId] = useState('');
      const [uploaded_file, setUploaded_file] = useState([]);
      const [globalId, setGlobalId] = useState('');
        return(
            <div className='loja'>
                <div className='header'>
                    <img src='/img/logo.png' alt='logomarca'/>
                </div>
                <input type='hidden' name="itemId" value='1'/>
                <fieldset>
                    <div className='grid'>
                    <label>Nome<input onChange={e => setName(e.target.value)} className='name' name="name" id='name' type='text'/></label>
                    <label>E-mail<input onChange={e => setUserEmail(e.target.value)} className='email' name="userEmail" id='email' type='email'/></label>
                    <label>Telefone<input onChange={e => setPhoneNumber(e.target.value)} className='phone' name="phoneNumber" id='phone' type='number'/></label>
                    <input type="file" onChange={e => setUploaded_file(e.target.files[0])} />
                    <input className='botton' type='button'  name='prosseguir' value='Prosseguir' onClick= {() => onFormSubmit() }/>
                    </div>
                </fieldset>
                {(globalId != '') &&
                <form method="POST">
                    <script
                    src="https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js"
                    data-preference-id={globalId}>
                    </script>
                </form>
                }
            </div>
        );
    
}

export default Loja;