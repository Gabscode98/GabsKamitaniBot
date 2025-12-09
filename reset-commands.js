import { REST, Routes } from "discord.js";
import "dotenv/config";

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("🧹 Borrando comandos del servidor...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: [] }
    );
    console.log("✅ Comandos del servidor borrados");

    console.log("🧹 Borrando comandos globales...");
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: [] }
    );
    console.log("✅ Comandos globales borrados");
  } catch (err) {
    console.error("❌ Error borrando comandos:", err);
  }
})();
