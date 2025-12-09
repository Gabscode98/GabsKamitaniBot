import fs from "fs";
import { EmbedBuilder } from "discord.js";
import statusHandler from "../status.js";
import { topMovimientosHandler, registrarMovimiento } from "../topMovimientos.js";

function esVideo(url) {
  return (
    url.endsWith(".mp4") ||
    url.endsWith(".mov") ||
    url.endsWith(".webm") ||
    url.includes("raw.githubusercontent.com")
  );
}

// EXPORTAMOS EL HANDLER PRINCIPAL
export async function movimientosHandler(interaction, client) {
  if (!interaction.isChatInputCommand()) return;

  const gifs = JSON.parse(fs.readFileSync("./commands/gifs.json", "utf8"));
  const titles = JSON.parse(fs.readFileSync("./commands/titles.json", "utf8"));

  // COMANDO TOP MOVIMIENTOS
  if (interaction.commandName === "topmovimientos") {
    return topMovimientosHandler(interaction);
  }

  // COMANDO STATUS
  if (interaction.commandName === "status") {
    return statusHandler(interaction, client, gifs);
  }

  let commandName = interaction.commandName;
  const objetivo = interaction.options.getUser("objetivo");

  // RANDOM
  if (commandName === "random") {
    const keys = Object.keys(gifs);
    commandName = keys[Math.floor(Math.random() * keys.length)];
  }

  const gifList = gifs[commandName];
  if (!gifList) {
    return interaction.reply({
      content: "❌ Este movimiento aún no tiene GIF o video configurado.",
      ephemeral: true
    });
  }

  const gif = gifList[Math.floor(Math.random() * gifList.length)];
  const title = titles[commandName] || "💥 ACCIÓN";

  // Registrar movimiento
  registrarMovimiento(commandName);

  // Guardar último movimiento
  fs.writeFileSync(
    "./lastMove.json",
    JSON.stringify({
      move: commandName,
      user: interaction.user.username
    })
  );

  // ---------- ENVÍO PRO ----------
  if (!esVideo(gif)) {
    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(
        `${interaction.user} le aplicó un **${commandName.toUpperCase()}** a ${objetivo}!`
      )
      .setImage(gif)
      .setColor("Red")
      .setFooter({ text: "Bot creado por GabsKamitani 🔥" })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
    return;
  }

  // SI ES VIDEO (MP4)
  await interaction.reply({
    content: `${interaction.user} le aplicó un **${commandName.toUpperCase()}** a ${objetivo}!`,
    files: [gif]
  });
}
