import "dotenv/config";
import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import fs from "fs";

// Server express (opcional)
import("./server.js");

// Data
import gifs from "./data/gifs.js";
import titles from "./data/titles.js";

// Utils
import esVideo from "./utils/esVideo.js";

// Client
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// READY
client.once("ready", () => {
  console.log(`✅ Bot listo como: ${client.user.tag}`);
});

// INTERACTIONS
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // 🛑 EVITA "Unknown interaction"
  await interaction.deferReply();

  const commandName = interaction.commandName;

  // =========================
  // 🎥 COMANDOS DE MOVIMIENTOS
  // =========================
  if (commandName in gifs) {
    const objetivo = interaction.options.getUser("objetivo");

    const gifList = gifs[commandName];
    const gif = gifList[Math.floor(Math.random() * gifList.length)];
    const title = titles[commandName] || "💥 ACCIÓN";

    // Guardar último movimiento
    fs.writeFileSync(
      "./data/lastMove.json",
      JSON.stringify({
        move: commandName,
        user: interaction.user.username,
      })
    );

    const texto = `${interaction.user} aplicó **${commandName.toUpperCase()}** a ${objetivo}`;

    // 🖼️ GIF → EMBED
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

    // 🎬 VIDEO → ARCHIVO
    return await interaction.editReply({
      content: texto,
      files: [gif],
    });
  }

  // =================
  // 🏓 COMANDO PING
  // =================
  if (commandName === "ping") {
    return await interaction.editReply("🏓 Pong funcionando correctamente");
  }

  // =================
  // 📊 COMANDO STATUS
  // =================
  if (commandName === "status") {
    const statusHandler = (await import("./status.js")).default;
    return statusHandler(interaction, client, gifs);
  }

  // =================
  // 🎲 COMANDO RANDOM
  // =================
  if (commandName === "random") {
    const keys = Object.keys(gifs);
    const randomMove = keys[Math.floor(Math.random() * keys.length)];

    const gifList = gifs[randomMove];
    const gif = gifList[Math.floor(Math.random() * gifList.length)];
    const title = titles[randomMove] || "💥 RANDOM";

    const texto = `${interaction.user} aplicó **${randomMove.toUpperCase()}**`;

    if (!esVideo(gif)) {
      const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(texto)
        .setImage(gif)
        .setColor("Orange")
        .setTimestamp();

      return await interaction.editReply({ embeds: [embed] });
    }

    return await interaction.editReply({
      content: texto,
      files: [gif],
    });
  }

  // =========================
  // ⚠️ FALLBACK
  // =========================
  return await interaction.editReply({
    content: "⚠️ Comando reconocido pero sin lógica aún.",
    ephemeral: true,
  });
});

// LOGIN
client.login(process.env.DISCORD_TOKEN);
