import fs from 'fs';
import { EmbedBuilder } from 'discord.js';

const archivoMovimientos = './movimientos.json';

// Función para leer el archivo JSON
function leerMovimientos(){
    if (!fs.existsSync(archivoMovimientos)) {
        fs.writeFileSync(archivoMovimientos, JSON.stringify({}));
    }
    const data = fs.readFileSync(archivoMovimientos, 'utf-8');
    return JSON.parse(data);
}

//Función para guardar el JSON
function guardarMovimientos(data) {
    fs.writeFileSync(archivoMovimientos, JSON.stringify(data,null,2));
}

//Registrar un movimiento (+1)
export function registrarMovimiento(nombre) {
    const movimientos = leerMovimientos();
    if (!movimientos[nombre]) movimientos[nombre] = 0;
    movimientos[nombre] +=1;
    guardarMovimientos(movimientos);
}

//Generar el embed con el top 5 de movimientos más usados
export function topMovimientosHandler(interaction) {
    const movimientos = leerMovimientos();
    const top5 = Object.entries(movimientos)
    .sort((a,b) => b[1]- a[1])
    .slice(0,5);

    const embed = new EmbedBuilder()
    .setTitle('⬆ Top Movimientos')
    .setColor('Gold')
    .setDescription(
        top5.length
        ? top5.map(([mov,count], i) => `**${i+1}.${mov}**->${count} usos`).join('\n')
        : 'No hay movimientos registrados aún.'
    )
    .setTimestamp()
    .setFooter({ text:'Bot creado por GabsKamitani 🔥'});

    interaction.reply({ embeds: [embed]} );
}