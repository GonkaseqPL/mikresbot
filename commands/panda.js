const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot, message, args) => {
    let {body} = await superagent
    .get (`https://api-to.get-a.life/pandaimg`);

    let pandaembed = new Discord.RichEmbed(message.embeds[0])
    .setColor("#ff9900")
    .setTitle("Oto słodka panda... Dla ciebie!")
    .setImage(body.url);

    message.channel.send(pandaembed);
}
module.exports.help = {
    name:"panda"
  }
