//+msg @user <msg>
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let msgMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!msgMember) return message.reply("Couldn't find that user.");
let msgText = args.join(" ").slice(22);


try{
    await msgMember.send(`<@${message.author.id}> sent you a DM: ${msgText}`)
    message.delete().catch(O_o=>{});
}catch(e){
    message.channel.send(`<@${msgMember.id}>, We tried to DM them, but their DMs are locked.`);
    }
}

module.exports.help = {
    name: "msg"
}