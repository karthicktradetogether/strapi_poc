const axios = require('axios');

module.exports = {
    async fetchData() {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
};
