const mercadopago = require('mercadopago');

// Add Your credentials
const initialize = () => {
    mercadopago.configure({
        access_token: process.env.MERCADO_PAGO_PROD_ACCESS_TOKEN
    });
}

const generateGlobalId = async (preference) => {
    mercadopago.preferences.create(preference)
        .then(function (response) {
            // This value replaces the String "<%= global.id %>" in your HTML
            let globalId = response.body.id;
            return globalId;
        }).catch(function (error) {
            console.log(error);
            throw error;
        });
}

module.exports = {
    initialize,
    generateGlobalId
};