const mercadopago = require('mercadopago');

// Add Your credentials
const initialize = () => {
    mercadopago.configure({
        access_token: process.env.MERCADO_PAGO_PROD_ACCESS_TOKEN
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