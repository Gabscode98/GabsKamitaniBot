const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot de Discord activo!');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});