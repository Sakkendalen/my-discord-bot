const Discord = require('discord.js');
var moment = require('moment');

const client = new Discord.Client();
require('dotenv').config();

client.on('ready', () => {
  console.log('online!');
});

const mvpRespawns = {"Maya": 120, "Mistress":120, "Moonlight Flower": 60, "GTB": 60, "Eddga": 120, "Phreeoni": 120, 
"Garm": 120, "GEC": 120, "Samurai": 120, "Stormy Knight": 60, "Doppelganger": 120, "White Lady": 120, 
"Evil Snake Lord": 120, "Gopinich": 120, "Dracula": 60, "Turtle General": 60, "Drake": 120, "Osiris": 60, 
"Thanatos": 120, "Pharaoh": 120, "RSX": 120, "Orc Hero": 60, "LOD": 120, "Baphomet": 120, "Dark Lord": 60, 
"Orc Lord": 120, "Amon Ra": 60, "Boitata": 120, "Gloom": 120, "Valkyrie Randgriss": 480, "Ifrit": 660};
const mvpKillTimes = {"Maya": moment("00:00", "hmm").format("HH:mm"), "Mistress": moment("00:00", "hmm").format("HH:mm"),
"Turtle General": moment("00:00", "hmm").format("HH:mm"), "Moonlight Flower": moment("00:00", "hmm").format("HH:mm"),
"Samurai": moment("00:00", "hmm").format("HH:mm"), "Phreeoni": moment("00:00", "hmm").format("HH:mm"),
"Eddga": moment("00:00", "hmm").format("HH:mm"), "Garm": moment("00:00", "hmm").format("HH:mm"),
"Osiris": moment("00:00", "hmm").format("HH:mm"), "Amon Ra": moment("00:00", "hmm").format("HH:mm"),
"GTB": moment("00:00", "hmm").format("HH:mm"), "GEC": moment("00:00", "hmm").format("HH:mm"),
"Stormy Knight": moment("00:00", "hmm").format("HH:mm"), "Doppelganger": moment("00:00", "hmm").format("HH:mm"),
"Dracula": moment("00:00", "hmm").format("HH:mm"), "White Lady": moment("00:00", "hmm").format("HH:mm"),
"Gopinich": moment("00:00", "hmm").format("HH:mm"), "Evil Snake Lord": moment("00:00", "hmm").format("HH:mm"),
"Drake": moment("00:00", "hmm").format("HH:mm"), "Pharaoh": moment("00:00", "hmm").format("HH:mm"),
"RSX": moment("00:00", "hmm").format("HH:mm"), "LOD": moment("00:00", "hmm").format("HH:mm"),
"Orc Hero": moment("00:00", "hmm").format("HH:mm"), "Orc Lord": moment("00:00", "hmm").format("HH:mm"),
"Baphomet": moment("00:00", "hmm").format("HH:mm"), "Dark Lord": moment("00:00", "hmm").format("HH:mm"),
"Boitata": moment("00:00", "hmm").format("HH:mm"), "Gloom": moment("00:00", "hmm").format("HH:mm"),
"Kiel": moment("00:00", "hmm").format("HH:mm"), "Valkyrie Randgriss": moment("00:00", "hmm").format("HH:mm"),
"Ifrit": moment("00:00", "hmm").format("HH:mm"), "Thanatos": moment("00:00", "hmm").format("HH:mm")};

client.on('message', msg => {
  if (!msg.author.bot) {

    if (msg.content === '!commands') {
      let response =
      '-------------------------------------------------------\n' +
      'Commands List\n' +
      '-------------------------------------------------------\n' +
      'Getting mvp names\n' +
      '!mvpnames\n' +
      'i send a complete list of mvp names i know\n' +
      '-------------------------------------------------------\n' +
      'Getting all mvps time\n' +
      '!mvps\n' +
      'i send a complete list mvps killtimes\n' +
      '-------------------------------------------------------\n' +
      'Setting mvp time\n' +
      '!settime <mvpname> <time>(formatted as hh:mm 24h)\n' +
      'EXAMPLE:\n' +
      '!settime Atroce 12:51\n' +
      '-------------------------------------------------------\n' +
      'Getting mvp killtime and next rough spawntime\n' +
      '!<mvpname> (remember CamelCase)\n' +
      'EXAMPLE:\n' +
      '!Atroce\n' +
      '-------------------------------------------------------';
      msg.channel.send(response);
    }

    //reply rough spawn Times
    // if (msg.content === '!spawntimes') {
    //   let response = ""
    //   for(var key in mvpRespawns) {
    //       response = response + key + " : ~" + mvpRespawns[key] + "min\n";
    //   }
    //   msg.channel.send(response);
    // }

    //get mvp names
    if (msg.content.includes("!mvpnames")){
      let mvpresp = '';
      for(let key in mvpKillTimes) {
        mvpresp = mvpresp + key+'\n'
        // msg.channel.send(key);
      }
      msg.channel.send(mvpresp);
    }

    //get all mvp kill timers
    if (msg.content.includes("!mvps")){
      let mvpresp = '';
      for(let key in mvpKillTimes) {
        mvpresp = mvpresp + key + " killed:" + moment(mvpKillTimes[key], 'hmm').format('HH:mm') +' server ' +
        "Spawns: ~" + moment(mvpKillTimes[key], 'hmm').add(mvpRespawns[key] + 60, 'minutes').format('HH:mm')+'\n';
        // msg.channel.send(key);
      }
      try{
        msg.channel.send(mvpresp);
      } catch (e) {
        console.log(e)
      }
    }

    //to get mvp kill timers and possible next spawn time
    for(let key in mvpKillTimes) {
      if (msg.content === '!'+key) {
          msg.channel.send(key + " killed in " + moment(mvpKillTimes[key], 'hmm').format('HH:mm') +' servertime \n' +
          "NextSpawn Roughly in: ~" + moment(mvpKillTimes[key], 'hmm').add(mvpRespawns[key] + 60, 'minutes').format('HH:mm'));
      }
    }

    //setting mvp killtime
    if (msg.content.includes("!settime")){
      for(let key in mvpKillTimes) {
        if (msg.content.includes(key)) {
          let numbers = msg.content.replace(/\D/g, '');
          const d = moment(numbers, "hmm");
          mvpKillTimes[key] = d;
        }
      }
    }
  }
});

client.login(process.env.API_KEY);