const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    //+addrole @member role 
if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry, you don't have permission.");
let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!rMember) return message.reply("Couldn't find that user.");
let role = args.join(" ").slice(22);
if(!role) return message.reply("Specify a role!");
let gRole = message.guild.roles.find(`name`, role);
if(!gRole) return message.reply("Couldn't find that role.");

if(rMember.roles.has(gRole.id)) return message.reply("They already have the role.");
await(rMember.addRole(gRole.id));

try{
    rMember.send(`Congrats, you have been given the role ${gRole.name}`)
}catch(e){
    message.channel.send(`Congrats to <@${rMember.id}>, you have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`);
    }
}

module.exports.help = {
    name: "addrole"
}