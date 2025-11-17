import { EmbedBuilder } from "discord.js";
import os from "os";
import fs from "fs";

function barraProgreso(porcentaje) {
    const total = 20;
    const marcados = Math.round((porcentaje / 100) * total);
    const vacíos = total - marcados;

    return "█".repeat(marcados) + "░".repeat(vacíos);
}

export default function statusHandler(interaction, client, gifs) {
    // Total de GIFs
    const totalGifs = Object.values(gifs).reduce((acc, arr) => acc + arr.length, 0);

    // Movimientos
    const totalMovimientos = Object.keys(gifs).length;

    // Último movimiento
    let lastMove = "Ninguno";
    let lastUser = "—";
    if (fs.existsSync("./lastMove.json")) {
        const data = JSON.parse(fs.readFileSync("./lastMove.json", "utf8"));
        lastMove = data.move || "Ninguno";
        lastUser = data.user || "—";
    }

    // Porcentaje GIFs usados (solo decorativo)
    const porcentaje = Math.min(100, Math.floor((totalGifs / 300) * 100)); // Ejemplo: meta de 300 GIFs
    const barra = barraProgreso(porcentaje);

    // Uptime
    const uptimeMs = client.uptime;
    const horas = Math.floor(uptimeMs / 3600000);
    const mins = Math.floor((uptimeMs % 3600000) / 60000);

    const embed = new EmbedBuilder()
        .setTitle("📊 Estado del Bot — GabsKamitaniBot")
        .setColor("Purple")
        .addFields(
            {
                name: "🎞️ Total de GIFs",
                value: `${totalGifs} GIFs cargados`,
                inline: true
            },
            {
                name: "💥 Movimientos disponibles",
                value: `${totalMovimientos} movimientos`,
                inline: true
            },
            {
                name: "📈 Progreso de GIFs",
                value: `${barra}\n${porcentaje}%`,
            },
            {
                name: "🕹 Último movimiento usado",
                value: `**${lastMove.toUpperCase()}**`,
                inline: true
            },
            {
                name: "👤 Usuario que lo usó",
                value: `${lastUser}`,
                inline: true
            },
            {
                name: "🏓 Ping",
                value: `${client.ws.ping} ms`,
                inline: true
            },
            {
                name: "⏳ Uptime",
                value: `${horas}h ${mins}m`,
                inline: true
            },
            {
                name: "💾 RAM usada",
                value: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
                inline: true
            },
            {
                name: "🖥 Sistema",
                value: `${os.type()} ${os.release()}`,
                inline: false
            }
        )
        .setFooter({ text: "GabsKamitani Status 🤖", iconURL: interaction.user.displayAvatarURL() })
        .setTimestamp();

    return interaction.reply({ embeds: [embed] });
}
