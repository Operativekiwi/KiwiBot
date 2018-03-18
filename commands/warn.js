const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    //+warn @user <reason>
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Insufficient permissions.")
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("Couldn't find that user.");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't warn this user.");
    let reason = args.join(" ").slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

fs.writeFile("./warnings", JSON.stringify(warns), (err) => {
 if (err) console.logg(err);
}) 

let warnEmbed = new Discord.RichEmbed()
.setDescription("Warns")
.setAuthor(message.author.username)
.setColor("fc6400")
.addField("Warned User", wUser.tag)
.addField("Warned In", message.channel)
.addField("Number of Warnings", warns[wUser.id].warns)
.addField("Reason", reason);

let warnchannel = message.guild.channels.find(`name`, "incidents");
if(!warnchannel) return message.reply("Couldn't find channel");

warnchannel.send(warnEmbed);

if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("You should create the role.")

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`${wUser.tag} has been temporarily muted`);

    setTimeout(function(){
        wUser.removeRole(muterole.id);
        message.channel.reply(`They have been unmuted.`);
    })
}

if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).ban(reason);
    message.channel.send(`${wUser.tag} has been banned.`);
}

}

module.exports.help = {
    name: "warn"
}