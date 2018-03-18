const Discord = require("discord.js");
const ms = require("ms");

//import { Permissions } from "discord.js";


module.exports.run = async (bot, message, args) => {

    //+tempmute @user 1s/m/h/d

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Couldn't find user.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
    let muterole = message.guild.roles.find(`name`, "muted");
    //start create of roll - creates a role "mute" if it doesn't exist
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "muted", 
                color: "#00000",
                Permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                })
            })
        }catch(e){
            console.log(e.stack);
        }
    }
    //end of create role
    let mutetime = args[1];
    //if mutetime isn't specified, it'll default to 10seconds
    if(!mutetime){
        mutetime = "10s"
    }

    await(tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));

    let tempmuteEmbed = new Discord.RichEmbed()
    .setDescription("Temp mute")
    .setColor("#1ae0d3")
    .addField("Temp muted User", `${tomute} with ID: ${tomute.id}`)
    .addField("Temp muted By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Temp muted In", message.channel)
    .addField("Time", message.createdAt)
    
    let incidentschannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentschannel) return message.channel.send("Couldn't find incidents channel.");

    message.delete().catch(O_o=>{});
    incidentschannel.send(tempmuteEmbed);

//end of module
}

module.exports.help = {
    name: "tempmute"
}
