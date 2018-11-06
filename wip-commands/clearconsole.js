const Discord = require("discord.js");
const superagent = require('superagent');

module.exports.run = async (bot, message, args) => {
  console.log('\033[2J');
  message.channel.send(`Console has been cleared!`);
}
module.exports.help = {
  name: "clearconsole"
}
