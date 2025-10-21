import fs from 'fs';
import { EmbedBuilder } from 'discord.js';

const archivoMovimientos = './movimientos.json';

// ---------------------- FUNCIONES DE ARCHIVO ----------------------

// Leer movimientos
function leerMovimientos() {
    if (!fs.existsSync(archivoMovimientos)) {
        fs.writeFileSync(archivoMovimientos, JSON.stringify({}));
    }
    const data = fs.readFileSync(archivoMovimientos, 'utf-8');
    return JSON.parse(data);
}

// Guardar movimientos
function guardarMovimientos(data) {
    fs.writeFileSync(archivoMovimientos, JSON.stringify(data, null, 2));
}

// ---------------------- FUNCIONES PRINCIPALES ----------------------

// Registrar un movimiento (+1)
export function registrarMovimiento(nombre) {
    const movimientos = leerMovimientos();
    if (!movimientos[nombre]) movimientos[nombre] = 0;
    movimientos[nombre] += 1; // 🔹 importante: sumar correctamente
    guardarMovimientos(movimientos);
}

// Generar embed con el top 5 de movimientos más usados
export function topMovimientosHandler(interaction) {
    const movimientos = leerMovimientos();

    // Ordenar y tomar top 5
    const top5 = Object.entries(movimientos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // Crear embed
    const embed = new EmbedBuilder()
        .setTitle('⬆ Top Movimientos')
        .setColor('Gold')
        .setDescription(
            top5.length > 0
                ? top5.map(([mov, count], i) => `**${i + 1}. ${mov}** → ${count} usos`).join('\n')
                : 'No hay movimientos registrados todavía.'
        )
        .setTimestamp()
        .setFooter({ text: 'Bot creado por GabsKamitani 🔥' });

    // Responder al interaction
    interaction.reply({ embeds: [embed] });
}
