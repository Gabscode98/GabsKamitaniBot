const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const axios = require('axios');

setInterval(() => {
    axios.get(`http://localhost:${PORT}`)
    .then(() => console.log('Ping interno exitoso'))
    .catch(err => console.error('Error en ping interno:', err));
}, 4 * 60 * 1000); //Cada 4 minutos

app.get('/', (req, res) => {
    res.send('Bot de Discord activo!');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

process.on('unhandledRejection', (err) =>{
    console.error('Unhandled Rejection:', err);
});
process.on('uncaughtException', (err) =>{
    console.error('Unhandled Exception:', err);
});
