require('dotenv').config();
const fs = require('fs');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const replies = [
    '😩😩😩',
    '🥳🥳🥳',
    '🤌🏻🤌🏻🤌🏻',
    '🧖🏻‍♂️🧖🏻‍♂️🧖🏻‍♂️',
    '🤠🤠🤠'
];



client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log('hey');
});

client.on('message', async (msg) => {
    console.log(msg.content);
    if (msg.channel.id === process.env.CHANNELID) {
        try {
            if (msg.content.toLocaleLowerCase() === 'hallo') {
                const randomReply = Math.floor(Math.random() * replies.length);
                msg.channel.send(replies[randomReply]);

            } else if (msg.content.toLocaleLowerCase() === '$?') {
                const bot = await msg.member.voice.channel.join();
                let url = await 'https://www.youtube.com/watch?v=6gIQMVG1YaE';
                let stream = ytdl(url);
                let dispatcher = bot.play(stream);

                dispatcher.on('end', () => msg.member.voice.channel.leave());

            } else if (msg.content.toLocaleLowerCase().startsWith('$toca ')) {
                const bot = await msg.member.voice.channel.join();
                let url = msg.content.replace('$toca ', '');
                let stream = ytdl(url);
                let dispatcher = bot.play(stream);

                dispatcher.on('end', () => msg.member.voice.channel.leave());

            } else if (msg.content.toLocaleLowerCase() === '$agradinho') {
                let url = `https://g.tenor.com/v1/search?q=henti&key=${process.env.TENORKEY}`;
                let res = await fetch(url);
                let json = await res.json();
                const randomReply = Math.floor(Math.random() * json.results.length);

                console.log(url);
                msg.channel.send('ENTÃO TOMA');
                msg.channel.send(json.results[randomReply].url);

            } else if (msg.content.toLocaleLowerCase() === '$larga') {
                msg.member.voice.channel.leave();

            } else if (msg.content.toLocaleLowerCase() === '$tico') {
                const randomSize = Math.random() * 50;
                msg.channel.send(`${msg.member} teu tico tem ${randomSize.toFixed(2)}cm, boa porra`);

            } else if (msg.content.toLocaleLowerCase() === '$avatar') {
                msg.channel.send(msg.author.displayAvatarURL());

            }
        } catch (e) {
            console.log(e.message);
        }
    }
});