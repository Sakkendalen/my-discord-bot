const Discord = require('discord.js');

const client = new Discord.Client();
require('dotenv').config();

client.on('ready', () => {
  console.log('online!');
});

const Responses = [
  "black desert on paska!",
  "pylly on kakan koti",
  "miehet pelaa talonroa",
  "Korona on homosammakoiden salaliitto",
  "oot nää idiootti"
];

client.on('message', msg => {
  if (msg.content === 'kerro totuus') {
    const resp = Math.floor(Math.random() * Responses.length)
    msg.reply(Responses[resp]);
  }

  if (msg.content === "$loop") { 
    console.log("loop aquired")
    var interval = setInterval (function () {
        // use the message's channel (TextChannel) to send a new message
        msg.channel.send("<@185766256811442178>, sinäkin voisit olla pelaamassa talonroa. ps musta jälkiruoka on paska")
        .catch(console.error); // add error handling here
    }, 1 * 6000);
}
});

client.login(process.env.API_KEY);