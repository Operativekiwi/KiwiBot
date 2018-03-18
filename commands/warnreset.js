//+warnreset @user
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Insufficient permissions.")
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("Couldn't find that user.");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't warn this user.");
    let reason = args.join(" ").slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns === 0;
    message.channel.send(`Warning level reset for <@${wUser.id}>`);

fs.writeFile("./warnings", JSON.stringify(warns), (err) => {
 if (err) console.logg(err);
}) 

}

module.exports.help = {
    name: "warnreset"
}
