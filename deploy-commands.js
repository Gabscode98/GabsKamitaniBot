import { REST, Routes, SlashCommandBuilder } from "discord.js";
import "dotenv/config";

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Verifica si el bot responde"),

    new SlashCommandBuilder()
    .setName('random')
    .setDescription('Aplicarás un movimiento aleatorio a un usuario')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que atacarás aleatoriamente')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('rko')
    .setDescription('Le aplicarás un RKO brutal a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás RKO')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('stunner')
    .setDescription('Le aplicarás un Stunner a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás Stunner')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('spear')
    .setDescription('Le aplicarás un spear a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás spear')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('mesa')
    .setDescription('Atravesarás la mesa con el cuerpo de su rival a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás la mesa')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('silla')
    .setDescription('Le darás con la silla a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás la silla')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('escalera')
    .setDescription('Avientas la escalera a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás la escalera')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('yayo')
    .setDescription('Le aplicarás un yayo a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás la yayo')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('phoenixsplash')
    .setDescription('Le aplicarás un phoenix splash a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un phoenix splash')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('hijackbomb')
    .setDescription('Le aplicarás un hijack bomb a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un hijack bomb')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('claymore')
    .setDescription('Le aplicarás un claymore a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un claymore')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('devilskiss')
    .setDescription('Le aplicarás un devils kiss a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un devils kiss')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('headbutt')
    .setDescription('Le aplicarás un headbutt a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un headbutt')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('buckshotlariat')
    .setDescription('Le aplicarás un buckshot lariat a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un buckshot lariat')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('chokeslam')
    .setDescription('Le aplicarás un chokeslam a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un chokeslam')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('tombstonepiledriver')
    .setDescription('Le aplicarás un tombstone piledriver a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un tombstone piledriver')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('ghettoblaster')
    .setDescription('Le aplicarás un ghetto blaster a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un ghetto blaster')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('jackhammer')
    .setDescription('Le aplicarás un jackhammer a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un jackhammer')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('oblivion')
    .setDescription('Le aplicarás una oblivion a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás una oblivion')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('rockbottom')
    .setDescription('Le aplicarás un rockbottom a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás una rockbottom')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('lamistica')
    .setDescription('Le aplicarás la mistíca a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás la mistíca')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('webos')
    .setDescription('Le aplicarás un webos a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un webos')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('pelon')
    .setDescription('Le aplicarás un pelon a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un pelon')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('añoña')
    .setDescription('Le aplicarás un añoña a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un añoña')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('status')
    .setDescription('Muestra estadísticas del bot'),
    
    new SlashCommandBuilder()
    .setName('attitude')
    .setDescription('Le aplicarás un attitude adjustment a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un attitude adjustment')
        .setRequired(true)
    ),    
    new SlashCommandBuilder()
    .setName('gushi')
    .setDescription('Le aplicarás un gushi a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un gushi')
        .setRequired(true)
    ),  
    new SlashCommandBuilder()
    .setName('zambra')
    .setDescription('Le aplicarás un zambra a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un zambra')
        .setRequired(true)
    ),      
    new SlashCommandBuilder()
    .setName('rod')
    .setDescription('Le aplicarás un rod a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un rod')
        .setRequired(true)
    ), 
    new SlashCommandBuilder()
    .setName('guitarrazo')
    .setDescription('Le aplicarás un guitarrazo a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un guitarrazo')
        .setRequired(true)
    ),         
    new SlashCommandBuilder()
    .setName('pendejo')
    .setDescription('Le aplicarás un pendejo a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un pendejo')
        .setRequired(true)
    ), 
    new SlashCommandBuilder()
    .setName('gun')
    .setDescription('Le aplicarás un gun a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un gun')
        .setRequired(true)
    ), 
    new SlashCommandBuilder()
    .setName('madre')
    .setDescription('Le aplicarás una aventada de madre a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás una aventada de madre')
        .setRequired(true)
    ), 
    new SlashCommandBuilder()
    .setName('hoyo')
    .setDescription('Le aplicarás un tres en el hoyo a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un tres en el hoyo')
        .setRequired(true)
    ), 
    new SlashCommandBuilder()
    .setName('huevos')
    .setDescription('Le aplicarás un huevos a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un huevos')
        .setRequired(true)
    ), 
    new SlashCommandBuilder()
    .setName('nuevaera')
    .setDescription('Le aplicarás una nueva era a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás una nueva era')
        .setRequired(true)
    ), 
].map(cmd => cmd.toJSON());


const rest = new REST({ version: '10'}).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Registrando comandos en tu servidor (guild)...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );
        console.log(`Comandos instantáneos cargados al servidor: ${process.env.GUILD_ID}`);

        console.log('Registrando comandos globales...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log('Comandos globales registrados correctamente.');

    } catch (error) {
        console.error('Error al registrar comandos:', error);
    }
})();