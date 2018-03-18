const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You don't have permission ${message.author}`);
        if(!bUser) return message.channel.send("Couldn't find user to ban.");
        let bReason = args.join(" ").slice(22);
        if(!bReason) return message.channel.send(`${message.author} Please specify a reason to ban ${bUser}`);
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");

        let banEmbed = new Discord.RichEmbed()
        .setDescription("Ban")
        .setColor("#1ae0d3")
        .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);
        
        let incidentschannel = message.guild.channels.find(`name`, "incidents");
        if(!incidentschannel) return message.channel.send("Couldn't find incidents channel.");

        message.delete().catch(O_o=>{});
        message.guild.member(bUser).ban(bReason);
        incidentschannel.send(banEmbed);

        return;

}

module.exports.help = {
    name: "ban"
}