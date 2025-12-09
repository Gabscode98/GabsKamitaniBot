import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import("./server.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("ready", () => {
  console.log(`✅ Bot listo como: ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🏓 Pong funcionando correctamente");
  }
});

client.login(process.env.DISCORD_TOKEN);
