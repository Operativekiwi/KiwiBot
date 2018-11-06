const Discord = require("discord.js");
const request = require('request');

module.exports.run = async (bot, message, args) => {
  let player = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  data = request('http://services.runescape.com/m=hiscore_oldschool_ironman/index_lite.ws?player=${player}', function (error, response, body));
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  message.channel.send(`${data}`);
}
module.exports.help = {
  name: "runescape"
}
