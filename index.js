const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();
console.log('TOKEN:', process.env.DISCORD_TOKEN);
console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('GUILD_ID:', process.env.GUILD_ID);
require('./server');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// --------------------------- Comandos Slash---------------------
const commands = [
    new SlashCommandBuilder()
    .setName('random')
    .setDescription('Aplica un movimiento aleatorio a un usuario')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que atacarás aleatoriamente')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('rko')
    .setDescription('Le has aplicado un RKO brutal a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás RKO')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('stunner')
    .setDescription('Le has aplicado un Stunner a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás Stunner')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('spear')
    .setDescription('Le has aplicado un spear a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás spear')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('mesa')
    .setDescription('Atravesó la mesa con el cuerpo de su rival a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás la mesa')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('silla')
    .setDescription('Le dió con la silla a')
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
    .setDescription('Le harás un yayo a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás la yayo')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('phoenixsplash')
    .setDescription('Le has aplicado un phoenix splash a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un phoenix splash')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('hijackbomb')
    .setDescription('Le has aplicado un hijack bomb a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un hijack bomb')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('claymore')
    .setDescription('Le has aplicado un claymore a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un claymore')
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName('devilskiss')
    .setDescription('Le has aplicado un devils kiss a')
    .addUserOption(option =>
        option.setName('objetivo')
        .setDescription('Usuario al que le harás un devils kiss')
        .setRequired(true)
    ),
].map(cmd => cmd.toJSON());

//---------------------------------Registrar los comandos en Discord------------------------
const rest = new REST({ version: '10'}).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Registrando comandos en tu servidor (guild)...');
        // Comandos instantáneos en tu servidor
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );
        console.log(`Comandos instantáneos cargados al servidor: ${process.env.GUILD_ID}`);
        
        console.log('Registrando comandos globales (puede tardar hasta 1 hora)...');
        // Comandos globales
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands  }
        );
        console.log('Comandos globales registrados correctamente.');

    } catch (error) {
        console.error('Error al registrar comandos:', error);
    }
})();

// ------------------------------Función para responder a los comandos-------------------------------
    const gifs = {
        rko: [
            'https://cdn.discordapp.com/attachments/1427513125543870495/1427515917411155968/rko1.gif?ex=68ef254c&is=68edd3cc&hm=4428d3ced382134d58115ae918a9e33f36918d32149b2b872ed712207416a09c&',
            'https://cdn.discordapp.com/attachments/1427513125543870495/1427515917700431923/rko2.gif?ex=68ef254c&is=68edd3cc&hm=530506cc2d340c40c5421e95ae3675b2a64d80302a4ea6247a8bdbbe50d4e8f3&'
        ],
        stunner: [
            'https://cdn.discordapp.com/attachments/1427513486149161066/1427516210408456264/stunner1.gif?ex=68ef2592&is=68edd412&hm=f759edb3bd8ac2ad5bd2f45f1c6a6cc096e4714888e47cbc48bb492b91c1ea43&',
            'https://cdn.discordapp.com/attachments/1427513486149161066/1427516210777686027/stunner2.gif?ex=68ef2592&is=68edd412&hm=0e5f36927d8cc8fac62e9b0cb46b49bf23308a408d5a0fedcde6af3e96fcd14d&'
        ],
        yayo: [
            'https://cdn.discordapp.com/attachments/1427513180770406451/1427515353642176533/yayo1.gif?ex=68ef24c6&is=68edd346&hm=f1b1e0302f32cf7eaaabc761a025503d3ee03d89c580fccf737681a35466e394&',
            'https://cdn.discordapp.com/attachments/1427513180770406451/1427515354632028261/yayo2.gif?ex=68ef24c6&is=68edd346&hm=323115d37ccae4267a548672661e9e7c2f7397797b26027a0f04400a93802a55&',
            'https://cdn.discordapp.com/attachments/1427513180770406451/1427736445040328804/yayo3.gif?ex=68eff2ae&is=68eea12e&hm=7d8748cf9caacc063accb30550d4269c3fd29fa87b1493e4955b6bed56e32033',
            'https://cdn.discordapp.com/attachments/1427513180770406451/1427736712129413383/yayo4.gif?ex=68eff2ee&is=68eea16e&hm=676f252fe8d97253c14bc3b40af118f85c82cb2924f298ae29956faac7122c06' 
        ],
        spear: [
            'https://cdn.discordapp.com/attachments/1427513157689282602/1427521373852401696/spear1.gif?ex=68ef2a61&is=68edd8e1&hm=cc60a11c12611ce781cfd22874d8650b6eb74ec58d0e8e6b139c7ea8781753d3&',
            'https://cdn.discordapp.com/attachments/1427513157689282602/1427521374200791111/spear2.gif?ex=68ef2a61&is=68edd8e1&hm=c8e3f3c88a34d0e0bdaf74dd2e12d4ee29d75774e51befa9292dcd05526d0139&',
            'https://cdn.discordapp.com/attachments/1427513157689282602/1427521374502785105/spear3.gif?ex=68ef2a61&is=68edd8e1&hm=f7e767d99c1cb4eba268d20164da236005a43f9452bc39594ad3b0d4fff13b36&'
        ],
        mesa: [
            'https://cdn.discordapp.com/attachments/1427513215482466345/1427521452567035914/mesa1.gif?ex=68ef2a74&is=68edd8f4&hm=7045ed083adfc78327c3cb48a3594e4004243fdffe2445bc7226f8782843e0d0&',
            'https://cdn.discordapp.com/attachments/1427513215482466345/1427521454479773838/mesa2.gif?ex=68ef2a74&is=68edd8f4&hm=185502068e243dab406db6a75f836953137f19d07fbdcdc4ace11ceb8a31b8e9&',
            'https://cdn.discordapp.com/attachments/1427513215482466345/1427521455842922597/mesa3.gif?ex=68ef2a75&is=68edd8f5&hm=37b34cbae0556a90667bf6ca3a0edaf1aad07170e92aade8f887a1618ac61031&'
        ],
        silla: [
            'https://cdn.discordapp.com/attachments/1427513415689306112/1427521637909266595/silla1.gif?ex=68ef2aa0&is=68edd920&hm=557156e960abcd475647ce43920b494bef8e5739bed89de485166d2db03d8b1a&',
            'https://cdn.discordapp.com/attachments/1427513415689306112/1427521638194217060/silla2.gif?ex=68ef2aa0&is=68edd920&hm=bdf7f317ecbe52e20c6fa62890efe3bc9644fa52a8d549a0a8f33cad1fd3dee7&',
            'https://cdn.discordapp.com/attachments/1427513415689306112/1427521638542479413/silla3.gif?ex=68ef2aa0&is=68edd920&hm=367f0c095a799a770e2e071e2c8033cb32dbc8659e7c0895b4545e308db649b4&',
            'https://cdn.discordapp.com/attachments/1427513415689306112/1427521639125483520/silla4.gif?ex=68ef2aa0&is=68edd920&hm=33ea4bae3ee7cdba143cd7e6d56545a7aff5cf7c8f16e1e07ac74c124307346c&'
        ],
        escalera: [
            'https://cdn.discordapp.com/attachments/1427513401180950610/1427523432039583785/escalera1.gif?ex=68ef2c4c&is=68eddacc&hm=738ee4b677f818b4e0085b345ff5f9ec9087eeb0f5282f25ebc67e9cfbe429cf&',
            'https://cdn.discordapp.com/attachments/1427513401180950610/1427523432698085437/escalera2.gif?ex=68ef2c4c&is=68eddacc&hm=89d67b5fd97354458fc14f01cb2060fafc6f37e835bf9f44db5ec77c610e1d31&',
            'https://cdn.discordapp.com/attachments/1427513401180950610/1427523433230630932/escalera3.gif?ex=68ef2c4c&is=68eddacc&hm=070fb71f9420cc4982a3c97c6c46432dc137270cb5c0074a81d09d62683386d8&',
            'https://cdn.discordapp.com/attachments/1427513401180950610/1427523433901850705/escalera4.gif?ex=68ef2c4c&is=68eddacc&hm=a2c3d38683edb6d7d5557bfd51a362b1f2b892a0e81bd359342cc3505c58774a&'
        ],
        phoenixsplash: [
            'https://cdn.discordapp.com/attachments/1427513298814898297/1427523501665030144/phoenixsplash1.gif?ex=68ef2c5c&is=68eddadc&hm=92a665bc8fcc75ed9f6a387e0390e626291a2cd9c4838fa6b64ca044ed619f96&',
            'https://cdn.discordapp.com/attachments/1427513298814898297/1427523502138855526/phoenixsplash2.gif?ex=68ef2c5d&is=68eddadd&hm=ef1afecb7576062b3bf96816ea7b42a9dc03ef974433cfccd27f479c4d76492c&'
        ],
        hijackbomb: [
            'https://cdn.discordapp.com/attachments/1427513342330671224/1427523565854654464/hijackbomb1.gif?ex=68ef2c6c&is=68eddaec&hm=58de09bb787c427d2d8fcd835e09993a8a93d76f33d7390c92729caaec536fb2&',
            'https://cdn.discordapp.com/attachments/1427513342330671224/1427523566370558042/hijackbomb2.gif?ex=68ef2c6c&is=68eddaec&hm=cd82d219272de01dd63f2119e36c094ac678d6b6a6dd6c88324044ae58a65ba0&'
        ],
        claymore: [
            'https://cdn.discordapp.com/attachments/1427822622153900134/1427822693838753822/claymore1.gif?ex=68f04301&is=68eef181&hm=5bd1e162a2b0d5bb8df4781f4bfa54c6059e1cabe6750b2a4d5ca068c248c8f0&',
            'https://cdn.discordapp.com/attachments/1427822622153900134/1427822694816288798/claymore2.gif?ex=68f04302&is=68eef182&hm=df90fe381b067bd220ffc30885652e29a0705b50666ffc99b7867c77df679ac1&',
            'https://cdn.discordapp.com/attachments/1427822622153900134/1427822695231258757/claymore3.gif?ex=68f04302&is=68eef182&hm=591a80a08a0c3b7d31a9add0bce12a89cbad7ad9cbc7b2ace1a333eff0ea4a51&',
            'https://cdn.discordapp.com/attachments/1427822622153900134/1427822695659343912/claymore4.gif?ex=68f04302&is=68eef182&hm=cf38319d86db7a64231f841657516ecc659925f790fffe7b6eed8284359fc3fe&',
            'https://cdn.discordapp.com/attachments/1427822622153900134/1427822696233701457/claymore5.gif?ex=68f04302&is=68eef182&hm=619ee18237ae6966fd0a78e8f8141a73ffe95b7deb2079967294de581a8fc6da&'
        ],
        devilskiss: [
            'https://cdn.discordapp.com/attachments/1427860334320025691/1427860390162726993/Devilskiss1.gif?ex=68f0661d&is=68ef149d&hm=e7098f6fa29cea140c8a7f303569e4548155e218164833dd725c6aae06da41d4'
        ],
    };
    const titles = {
        rko: '💥RKO OUTTA NOWHERE',
        stunner: '¡STUNNER!',
        spear: '¡UN SPEAR!',
        mesa: '¡OMG!',
        silla: '¡SILLETAZO!' ,
        escalera: '¡Haz matado a tu rival con un escalerazo!',
        yayo: '¡YAYO FINISHER!',
        phoenixsplash: '¡A VOLAR!',
        hijackbomb: '💣 BOMBAZO',
        claymore: '¡1,2,3 CLAYMORE!',
        devilskiss: '¡A A A A A A A...! ¡YEAHHHHHH!',
    };
//----------------------------Lógica------------------------------
    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;

        let commandName = interaction.commandName;
        const objetivo = interaction.options.getUser('objetivo');
        
        // Si el comando es /random -> elegimos aleatorio
        if (commandName === 'random') {
            const keys  = Object.keys(gifs);
            commandName = keys[Math.floor(Math.random() * keys.length)];
        }

        // Usamos commandName (el verdadero ataque, aleatorio o no)
        const gifList = gifs[commandName];
        const gif = gifList[Math.floor(Math.random() * gifList.length)];
        const title = titles[commandName] || '💥 ACCIÓN';

    const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(`${interaction.user} le aplicó un **${commandName.toUpperCase()}** a ${objetivo}!`)
    .setImage(gif)
    .setColor('Red')
    .setFooter({text: 'Bot creado por GabsKamitani 🔥'})
    .setTimestamp();

    await interaction.reply({ embeds: [embed] });
});


client.login(process.env.DISCORD_TOKEN);