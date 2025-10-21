import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

// Ping interno cada 4 minutos
setInterval(() => {
    axios.get(`http://localhost:${PORT}`)
        .then(() => console.log('Ping interno exitoso'))
        .catch(err => console.error('Error en ping interno:', err));
}, 4 * 60 * 1000);

app.get('/', (req, res) => {
    res.send('Bot de Discord activo!');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

// Manejo de errores global
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});
process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception:', err);
});
