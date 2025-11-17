import { EmbedBuilder } from "discord.js";
import os from "os";

export default function statusHandler(interaction, client, gifs) {
    const totalGifs = Object.values(gifs).reduce((acc, arr) => acc + arr.length, 0);

    const uptimeMs = client.uptime;
    const uptimeFmt =
        `${Math.floor(uptimeMs / 3600000)}h `
        + `${Math.floor((uptimeMs % 3600000) / 60000)}m`;

    const embed = new EmbedBuilder()
        .setTitle("📊 Estado del Bot")
        .setColor("Blue")
        .addFields(
            { name: "🧩 Total de GIFs cargados", value: `${totalGifs}`, inline: true },
            { name: "⏳ Uptime", value: uptimeFmt, inline: true },
            { name: "🏓 Ping", value: `${client.ws.ping}ms`, inline: true },
            { name: "💾 Memoria usada", value: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`, inline: true },
            { name: "🖥️ Sistema", value: `${os.type()} ${os.release()}`, inline: true },
        )
        .setFooter({ text: "GabsKamitaniBot Status 💙" })
        .setTimestamp();

    return interaction.reply({ embeds: [embed] });
}
