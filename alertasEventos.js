import { EmbedBuilder, time } from "discord.js";
import cron from 'node-cron';
import axios from 'axios';

// Lista de próximos eventos
const eventos = [
    {
        show: 'WWE RAW',
        date: '2025-10-20',
        time: '18:00',
        image: 'https://cdn.discordapp.com/attachments/1429921008055226568/1429922881172930751/raw.png?ex=68f7e6f5&is=68f69575&hm=c9d2109ad0d6615bbaf33e8485b2bbaa152282a29fd3339094696fa126779e85&'
    },
    {
        show: 'WWE NXT',
        date: '2025-10-21',
        time: '18:00',
        image: 'https://cdn.discordapp.com/attachments/1429921008055226568/1429924571599081522/nxt.png?ex=68f7e888&is=68f69708&hm=20971af709e4f80267923690d408643cd83714133db1912581c6ce179e5af6ca'
    },
    {
        show: 'AEW Dynamite',
        date: '2025-10-22',
        time: '18:00',
        image: 'https://cdn.discordapp.com/attachments/1429921008055226568/1429922880317034619/aewdynamite.png?ex=68f7e6f5&is=68f69575&hm=566fbf1307031db95d81efb7ed88c1f0094962207d5f47ce2c15292c17a94fc4&'
    },
     {
        show: 'NJPW Super Junior Tag League 2025 - Tag 1',
        date: '2025-10-23',
        time: '03:30',
        image: 'https://cdn.discordapp.com/attachments/1429921008055226568/1429926554657488998/njpw.png?ex=68f7ea61&is=68f698e1&hm=b6f205a6401fa618fd33246ac60394339f6d1bb26d6b02ac2c17f4fb5265bb10&'
    },
    {
        show: 'WWE Smackdown',
        date: '2025-10-24',
        time: '18:00',
        image: 'https://cdn.discordapp.com/attachments/1429921008055226568/1429922881965395989/smackdown.png?ex=68f7e6f5&is=68f69575&hm=1bd25012d6792e5076c8404c526700a01caa033224ef8f3c3ce09fc6edaa3a23&'
    },
    {
        show: 'NJPW Super Junior Tag League 2025 - Tag 2',
        date: '2025-10-24',
        time: '03:30',
        image: 'https://cdn.discordapp.com/attachments/1429921008055226568/1429926554657488998/njpw.png?ex=68f7ea61&is=68f698e1&hm=b6f205a6401fa618fd33246ac60394339f6d1bb26d6b02ac2c17f4fb5265bb10&'
    },
    {
        show: 'NJPW Super Junior Tag League 2025 - Tag 3',
        date: '2025-10-25',
        time: '02:00',
        image: 'https://cdn.discordapp.com/attachments/1429921008055226568/1429926554657488998/njpw.png?ex=68f7ea61&is=68f698e1&hm=b6f205a6401fa618fd33246ac60394339f6d1bb26d6b02ac2c17f4fb5265bb10&'
    },
    {
        show: 'AEW Collision',
        date: '2025-10-25',
        time: '18:00',
        image: 'https://cdn.discordapp.com/attachments/1429921008055226568/1429922879520247928/aewcollision.png?ex=68f7e6f5&is=68f69575&hm=3d7c49af40cba53d2347f3326f206018879df81d4a27d321e7f343dc2370b6f7&'
    },
    {
        show: 'Lucha Libre AAA: Heroes Inmortales 2025',
        date: '2025-10-25',
        time: '21:00',
        image: 'https://cdn.discordapp.com/attachments/1429921008055226568/1429928336628514856/AAA.png?ex=68f7ec0a&is=68f69a8a&hm=8f260e88091a5d853762951288ffc37d0fd7b57294e4e226709ce0e329dc9bee'
    },
    {
        show: 'NJPW Super Junior Tag League 2025 - Tag 4',
        date: '2025-10-26',
        time: '00:00',
        image: 'https://cdn.discordapp.com/attachments/1429921008055226568/1429926554657488998/njpw.png?ex=68f7ea61&is=68f698e1&hm=b6f205a6401fa618fd33246ac60394339f6d1bb26d6b02ac2c17f4fb5265bb10&'
    },
];

function iniciarAlertas(client) {
    console.log('📢 Sistema de alertas activado');

    setInterval(() => {
        const canal = client.channels.cache.get('1429933562022465609');
        if (!canal) return;

        const mensaje = `⚠️ ¡Recordatorio! Hoy hay evento de WWE RAW 🔥`;
        canal.send(mensaje);
    }, 1000 * 60 * 60 * 6);
}
module.exports = { iniciarAlertas};

// Función que inicia las alertas programadas
export const iniciarAlertas = (client) => {
    // Cron job: se ejecuta todos los días a las 10:00 AM
    cron.schedule('0 10 * * *'), async () => {
        try {
            const channel = await client.channels.fetch(process.env.NOTIFY_CHANNEL_ID);

            for (const evento of eventos) {
                const embed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle(`📅Próximo evento: ${evento.show}`)
                .setDescription(`🕒Fecha: ${evento.date} a las ${evento.time}`)
                .setImage(evento.image)
                .setTimestamp();

                await channel.send({ embeds: [embed] });
            }

            console.log('✅ Las alertas enviadas correctamente');
            } catch (err) {
                console.error('❌ Error al enviar alertas:', err);
            }
       };
};