import { Client, GatewayIntentBits, REST, Routes, EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

// Inicializa el cliente de Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Lista de GIFs por movimiento
const gifs = {
    rko: [
        'https://cdn.discordapp.com/attachments/1427513125543870495/1427515917411155968/rko1.gif?ex=68ef254c&is=68edd3cc&hm=4428d3ced382134d58115ae918a9e33f36918d32149b2b872ed712207416a09c&',
        'https://cdn.discordapp.com/attachments/1427513125543870495/1427515917700431923/rko2.gif?ex=68ef254c&is=68edd3cc&hm=530506cc2d340c40c5421e95ae3675b2a64d80302a4ea6247a8bdbbe50d4e8f3&'
    ],
    spear: [
        'https://cdn.discordapp.com/attachments/1427513157689282602/1427521373852401696/spear1.gif?ex=68ef2a61&is=68edd8e1&hm=cc60a11c12611ce781cfd22874d8650b6eb74ec58d0e8e6b139c7ea8781753d3&',
        'https://cdn.discordapp.com/attachments/1427513157689282602/1427521374200791111/spear2.gif?ex=68ef2a61&is=68edd8e1&hm=c8e3f3c88a34d0e0bdaf74dd2e12d4ee29d75774e51befa9292dcd05526d0139&',
        'https://cdn.discordapp.com/attachments/1427513157689282602/1427521374502785105/spear3.gif?ex=68ef2a61&is=68edd8e1&hm=f7e767d99c1cb4eba268d20164da236005a43f9452bc39594ad3b0d4fff13b36&'
    ],
    stunner: [
        'https://cdn.discordapp.com/attachments/1427513486149161066/1427516210408456264/stunner1.gif?ex=68ef2592&is=68edd412&hm=f759edb3bd8ac2ad5bd2f45f1c6a6cc096e4714888e47cbc48bb492b91c1ea43&',
        'https://cdn.discordapp.com/attachments/1427513486149161066/1427516210777686027/stunner2.gif?ex=68ef2592&is=68edd412&hm=0e5f36927d8cc8fac62e9b0cb46b49bf23308a408d5a0fedcde6af3e96fcd14d&',
        'https://cdn.discordapp.com/attachments/1427513486149161066/1427866425099419708/stunner3.gif?ex=68f06bbc&is=68ef1a3c&hm=2d6fe72c35169d4f8b203afdce6e2ff8e3746599608a1942781b8a26f75c259a'
    ],
    chokeslam: [
        'https://cdn.discordapp.com/attachments/1428541503092949002/1428542284948836403/chokeslam1.gif?ex=68f2e12d&is=68f18fad&hm=a5d07fcfd782e9e7d9e46e0cde0c43eda84a65bb63b90a80a611c9b67211f86a&',
        'https://cdn.discordapp.com/attachments/1428541503092949002/1428542285343232041/chokeslam2.gif?ex=68f2e12d&is=68f18fad&hm=0342b31d7e872bf9cb97165d93540961775266f661b4c7c40fa0e5e2bca240d0&',
        'https://cdn.discordapp.com/attachments/1428541503092949002/1428542285666324571/chokeslam3.gif?ex=68f2e12d&is=68f18fad&hm=b3a432007a5821749fc5ef93d245f24fe3e569d620e537f53d90a88da9843d4a&',
        'https://cdn.discordapp.com/attachments/1428541503092949002/1428542286085492969/chokeslam4.gif?ex=68f2e12e&is=68f18fae&hm=36a1274995a048edce233c79b5df39d37dde8f95b91075e92644cbb22e2423ff&'
    ],
    yayo: [
        'https://cdn.discordapp.com/attachments/1427513180770406451/1427515353642176533/yayo1.gif?ex=68ef24c6&is=68edd346&hm=f1b1e0302f32cf7eaaabc761a025503d3ee03d89c580fccf737681a35466e394&',
        'https://cdn.discordapp.com/attachments/1427513180770406451/1427515354632028261/yayo2.gif?ex=68ef24c6&is=68edd346&hm=323115d37ccae4267a548672661e9e7c2f7397797b26027a0f04400a93802a55&',
        'https://cdn.discordapp.com/attachments/1427513180770406451/1427736445040328804/yayo3.gif?ex=68eff2ae&is=68eea12e&hm=7d8748cf9caacc063accb30550d4269c3fd29fa87b1493e4955b6bed56e32033',
        'https://cdn.discordapp.com/attachments/1427513180770406451/1427736712129413383/yayo4.gif?ex=68eff2ee&is=68eea16e&hm=676f252fe8d97253c14bc3b40af118f85c82cb2924f298ae29956faac7122c06' 
    ]
};

// Registro de comandos
const commands = [
    {
        name: 'rko',
        description: 'Le aplicarás un RKO brutal a',
        options: [
            {
                name: 'objetivo',
                type: 6,
                description: 'Usuario al que le harás RKO',
                required: true
            }
        ]
    },
    {
        name: 'spear',
        description: 'Le aplicarás un spear a',
        options: [
            {
                name: 'objetivo',
                type: 6,
                description: 'Usuario al que le harás spear',
                required: true
            }
        ]
    },
    {
        name: 'stunner',
        description: 'Le aplicarás un Stunner a',
        options: [
            {
                name: 'objetivo',
                type: 6,
                description: 'Usuario al que le harás Stunner',
                required: true
            }
        ]
    },
    {
        name: 'chokeslam',
        description: 'Le aplicarás un chokeslam a',
        options: [
            {
                name: 'objetivo',
                type: 6,
                description: 'Usuario al que le harás un chokeslam',
                required: true
            }
        ]
    },
    {
        name: 'yayo',
        description: 'Le aplicarás un yayo a',
        options: [
            {
                name: 'objetivo',
                type: 6,
                description: 'Usuario al que le harás la yayo',
                required: true
            }
        ]
    },
    {
        name: 'random',
        description: 'Aplicarás un movimiento aleatorio a un usuario',
        options: [
            {
                name: 'objetivo',
                type: 6,
                description: 'Usuario al que atacarás aleatoriamente',
                required: true
            }
        ]
    }
];

// Registrar los comandos con la API de Discord
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('🔄 Registrando comandos en Discord...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );
        console.log('✅ Comandos registrados correctamente.');
    } catch (error) {
        console.error('❌ Error al registrar los comandos:', error);
    }
})();

// Manejo de interacciones
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options, user } = interaction;
    const objetivo = options.getUser('objetivo');

    // Verifica si el comando existe en la lista de gifs
    if (gifs[commandName]) {
        const gifList = gifs[commandName];
        const randomGif = gifList[Math.floor(Math.random() * gifList.length)];

        const embed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle(`💥 ${user.username} le aplica ${commandName.toUpperCase()} a ${objetivo.username}!`)
            .setImage(randomGif)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
        console.log(`✅ ${user.username} ejecutó /${commandName}`);
        return;
    }

    // Comando especial: random
    if (commandName === 'random') {
        const allMoves = Object.keys(gifs);
        const randomMove = allMoves[Math.floor(Math.random() * allMoves.length)];
        const gifList = gifs[randomMove];
        const randomGif = gifList[Math.floor(Math.random() * gifList.length)];

        const embed = new EmbedBuilder()
            .setColor(0xffc107)
            .setTitle(`🎲 ${user.username} aplicó un movimiento aleatorio (${randomMove.toUpperCase()}) a ${objetivo.username}!`)
            .setImage(randomGif)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
        console.log(`🎲 ${user.username} ejecutó /random`);
    }
});

// Evento cuando el bot se conecta
client.once('ready', () => {
    console.log(`🤖 Bot conectado como ${client.user.tag}`);
});

// Inicia sesión en Discord
client.login(process.env.DISCORD_TOKEN);