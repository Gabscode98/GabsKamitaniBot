import fs from 'fs';
import { EmbedBuilder } from 'discord.js';

const archivoMovimientos = './movimientos.json';

function leerMovimientos() {
  if (!fs.existsSync(archivoMovimientos)) fs.writeFileSync(archivoMovimientos, JSON.stringify({}));
  return JSON.parse(fs.readFileSync(archivoMovimientos, 'utf-8'));
}

function guardarMovimientos(data) {
  fs.writeFileSync(archivoMovimientos, JSON.stringify(data, null, 2));
}

export function registrarMovimiento(nombre) {
  const movimientos = leerMovimientos();
  if (!movimientos[nombre]) movimientos[nombre] = 0;
  movimientos[nombre] += 1; // ⚠️ Antes pusiste movimientos[nombre] +1, eso no guarda el cambio
  guardarMovimientos(movimientos);
}

export function topMovimientosHandler(interaction) {
  const movimientos = leerMovimientos();
  const top5 = Object.entries(movimientos)
    .sort((a,b) => b[1] - a[1])
    .slice(0,5);

  const embed = new EmbedBuilder()
    .setTitle('⬆ Top Movimientos')
    .setColor('Gold')
    .setDescription(
      top5.map(([mov,count], i) => `**${i+1}. ${mov}** → ${count} usos`).join('\n')
    )
    .setTimestamp()
    .setFooter({ text: 'Bot creado por GabsKamitani 🔥' });

  interaction.reply({ embeds: [embed] });
}
