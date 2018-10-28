const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie zrobie tego przyjacielu!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ta osoba nie może zostać wyrzucona!");
    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Zbanowany użytkownik :", `${bUser} z ID ${bUser.id}`)
    .addField("Zbanowany przez :", `<@${message.author.id}> z ID ${message.author.id}`)
    .addField("Zbanowany w :", message.channel)
    .addField("Czas :", message.createdAt)
    .addField("Powód :", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "mod-log");
    if(!incidentchannel) return message.channel.send("Nie moge znaleść kanału #mod-log!");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  }
  module.exports.help = {
    name:"ban"
  }