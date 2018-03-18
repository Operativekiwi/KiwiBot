const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You don't have permission ${message.author}`);
        if(!kUser) return message.channel.send("Couldn't find user to kick.");
        let kReason = args.join(" ").slice(22);
        if(!kReason) return message.channel.send(`${message.author} Please specify a reason to kick ${kUser}`);
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("Kick")
        .setColor("#1ae0d3")
        .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason);
        
        let incidentschannel = message.guild.channels.find(`name`, "incidents");
        if(!incidentschannel) return message.channel.send("Couldn't find incidents channel.");

        message.delete().catch(O_o=>{});
        message.guild.member(kUser).kick(kReason);
        incidentschannel.send(kickEmbed);

        return;

}

module.exports.help = {
    name: "kick"
}
