import React, { useState } from "react";
import {FaFileUpload} from 'react-icons/fa';
import '../loja/loja.css';
const url = process.env.API_URL || 'http://localhost:8089/api/orders';

const Loja = (props) => {

        const scriptSrc =  "https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js";

        const cleanForm = () =>{
            setName('');
            setItemId('');
            setPhoneNumber('')
            setUserEmail('');
            setUploaded_file([]);
        }

      async function onFormSubmit(){

        const formData = new FormData();
        formData.append('userName', name);
        formData.append('userEmail', userEmail);
        formData.append('phoneNumber', phoneNumber);
        formData.append('itemId', itemId);
        formData.append('uploaded_file', uploaded_file);

        try {

            let rawResponse = await fetch(url, {method: 'POST',body: formData});
            
            if (rawResponse.status == 201) {
                let result = await rawResponse.json();
                setGlobalId(result.order.globalId);
                let script = document.createElement("script");
                script.src = scriptSrc;
                script.setAttribute("data-preference-id", result.order.globalId);
                document.getElementById("pagId").append(script);

                cleanForm();
            }
        } catch (error) {
            console.error('Error creating order. Formdata %j. Error message %j', formData, error);
        }
      }
    
      let queryParams = new URLSearchParams(props.location.search.substring(1));

      let paymentParams = Object.fromEntries(queryParams);

      //console.log('paymentParams %j', paymentParams);

      //console.log('itemId ' +  queryParams.get("itemId"));

      if (paymentParams.payment_id != undefined) {
        console.log('Payment confirmed: ' + paymentParams.payment_id);
        updateOrder(paymentParams);
      }

      const [name, setName] = useState('');
      const [userEmail, setUserEmail] = useState('');
      const [phoneNumber, setPhoneNumber] = useState('');
      const [itemId, setItemId] = useState(queryParams.get("itemId"));
      const [uploaded_file, setUploaded_file] = useState([]);
      const [globalId, setGlobalId] = useState('');

      //setItemId(queryParams.get("itemId"));

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
                    <input className='botton' type='button'  name='prosseguir' value='Prosseguir' onClick= {() => onFormSubmit() }/>
                    </div>
                </fieldset>
                <div className='submitted'>
                <div className='title'>
                <h2>Agora é hora de nos enviar suas fotos!<span>Simples e rápido</span></h2>
                <p>Selecione suas fotos favoritas, recorte no formato em que deseja e clique em enviar. Pronto! recebemos um aviso e suas fotos começarão a ser impressas.</p>
                </div>
                    <form>
                        <div>
                            <label htmlFor='file'>
                                <FaFileUpload/>   
                                Escolher Fotos
                            </label>
                            <input type="file" name='file' id='file' onChange={e => setUploaded_file(e.target.files[0])} />
                        </div>
                        
                    </form>
                    
                
                {(globalId != '') &&
                <form method="POST" id='pagId'>
                </form>
                }
                </div>
                <div className='cropper'>
                    <h2>Fotos selecionadas</h2>
                    <p>Efetue o corte nas imagens apenas se quiser nos seguintes formatos:</p>
                    <ul>
                        <li>Formato retratro (12cm X 7.5cm)</li>
                        <li>Formato Quadrado (11cm X 9cm)</li>
                        <li>Fomato Paisagem (11cm X 9cm)</li>
                    </ul>
                    <p>Caso queira no formato original da foto (Paisagem ou retratro), por favor, envie sem cortar.</p>
                    
                </div>
            </div>
        );
}

async function updateOrder(paymentParams) {

        console.log('payment params to update %j', paymentParams);
    try {
        let rawResponse = await fetch(url + '/' + paymentParams.external_reference, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ externalOrder: paymentParams })});

        if (rawResponse.status == 200) {
            let result = await rawResponse.json();
            //console.log('order updated %j', result);
        }
    } catch(err) {
        console.log('error updating order ' + err)
    }
}

export default Loja;