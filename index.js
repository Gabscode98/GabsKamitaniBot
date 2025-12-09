import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import("./server.js");
import gifs from "./data/gifs.js";
import titles from "./data/titles.js";
import esVideo from "./utils/esVideo.js";
import fs from "fs";
import { EmbedBuilder } from "discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.once("ready", () => {
  console.log(`✅ Bot listo como: ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // ✅ RESERVA LA INTERACCIÓN (anti "Unknown interaction")
  await interaction.deferReply();

  const commandName = interaction.commandName;

  if (commandName in gifs) {

  const objetivo = interaction.options.getUser("objetivo"); // 👈 AQUÍ SE LEE EL RIVAL
  const gifList = gifs[commandName];
  const gif = gifList[Math.floor(Math.random() * gifList.length)];
  const title = titles[commandName] || "💥 ACCIÓN";

  // Guardar último movimiento
  fs.writeFileSync("./data/lastMove.json", JSON.stringify({
    move: commandName,
    user: interaction.user.username
  }));

  // ✅ TEXTO CON RIVAL
  const texto = `${interaction.user} aplicó **${commandName.toUpperCase()}** a ${objetivo}`;

  // GIF
  if (!esVideo(gif)) {
    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(texto)
      .setImage(gif)
      .setColor("Red")
      .setFooter({ text: "Bot creado por GabsKamitani 🔥" })
      .setTimestamp();

    return await interaction.editReply({ embeds: [embed] });
  }

  // VIDEO
  return await interaction.reply({
    content: texto,
    files: [gif]
  });
}

  // ✅ COMANDO PING
  if (interaction.commandName === "ping") {
    return interaction.reply("🏓 Pong funcionando correctamente");
  }

  // ✅ COMANDO STATUS (si ya tienes status.js listo)
  if (interaction.commandName === "status") {
    const statusHandler = (await import("./status.js")).default;
    return statusHandler(interaction, client);
  }

  // ✅ COMANDO RANDOM (provisional)
  if (interaction.commandName === "random") {
    return interaction.reply("🎲 Random funcionando correctamente");
  }

  // ✅ SI NO COINCIDE NINGUNO
  return interaction.reply({
    content: "⚠️ Comando reconocido pero sin lógica aún.",
    ephemeral: true
  });
});

client.login(process.env.DISCORD_TOKEN);

