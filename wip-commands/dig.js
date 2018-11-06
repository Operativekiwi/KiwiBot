const Discord = require("discord.js");
const dns = require('dns');
module.exports.run = async (bot, message, args) => {
	let msgText = args.join(" ").slice(22);
        let sicon = message.guild.iconURL;
	dns.lookup(`${msgText}`, options, (err, address, family) =>
  	console.log('address: %j family: IPv%s', address, family));

	//let nsRecord = dns.resolveNs(msgText, records);
	//let mxRecord = dns.resolveMx(msgText, records);
        let serverembed = new Discord.RichEmbed()
        .setDescription(`DIG Info for${msgText}`)
        .setColor("#1ae0d3")
        .setThumbnail(sicon)
        .addField(`Domain name: ${msgText}`)
        //.addField(`IP: ${aRecord}`)
        //.addField(`NS: ${nsRecord}`)
        //.addField(`MX: ${mxRecord}`);

        return message.channel.send(serverembed);

}

module.exports.help = {
    name: "dig"
}
