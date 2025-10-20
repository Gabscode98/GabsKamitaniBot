const schedule = require('node-schedule');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

function iniciarAlertas(client) {
    console.log("🔔 Sistema de alertas iniciado.");

    const canalld = '1429933562022465609';
    
    const eventos = JSON.parse(fs.readFileSync('./eventos.json','utf-8'));

    eventos.forEach(evento => {
        const job = schedule.scheduleJob(evento.horario, () => {
            const canal = client.channels.cache.get(canalld);
            if(canal){
                const embed = new EmbedBuilder()
                    .setTitle(evento.name)
                    .setDescription(evento.mensaje)
                    .setImage(evento.logo)
                    .setColor('Blue')
                    .setTimestamp();

                canal.send({ embeds: [embed] });
            }
        });
        console.log(`${evento.name} programado -> Próxima: ${job.nextInvocation()}`);
    });
}

module.exports = { iniciarAlertas };
