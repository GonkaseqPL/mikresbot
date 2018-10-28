const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {



    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Nie moge wyszukać tego użytkownika!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie zrobie tego przyjacielu!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ta osoba nie może zostać wyrzucona!");
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Zckicowany użytkownik :", `${kUser} z ID ${kUser.id}`)
    .addField("Zckicowany przez :", `<@${message.author.id}> z ID ${message.author.id}`)
    .addField("Zckicowany w :", message.channel)
    .addField("Czas :", message.createdAt)
    .addField("Powód", kReason);

    let kickChannel = message.guild.channels.find(`name`, "mod-log");
    if(!kickChannel) return message.channel.send("Nie moge znaleść kanału o nazwie #mod-log!");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }
  module.exports.help = {
    name:"kick"
  }