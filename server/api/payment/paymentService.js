const mercadopago = require('mercadopago');

// Add Your credentials
const initialize = () => {
    mercadopago.configure({
        access_token: 'TEST-2968248292213610-101422-a98050def6e76e13e6e16868d890f9fb-33721125' //process.env.MERCADO_PAGO_PROD_ACCESS_TOKEN
    });
}

const generateGlobalId = async (preference) => {
    try {
        let response = await  mercadopago.preferences.create(preference);
        let globalId = response.body.id;
        //console.log('payment service Global id: ' + globalId)
        return globalId;
    } catch (err) {
        console.log('Payment service error: '+ err);
        throw err;
    } 
}

module.exports = {
    initialize,
    generateGlobalId
};