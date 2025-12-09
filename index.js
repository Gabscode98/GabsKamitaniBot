import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import("./server.js");
import { movimientosHandler } from "./commands/movimientos.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("interactionCreate", async interaction => {
  movimientosHandler(interaction, client);
});

client.login(process.env.DISCORD_TOKEN);
