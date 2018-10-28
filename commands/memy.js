const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot, message, args) => {
    let {body} = await superagent
    .get (`https://api-to.get-a.life/meme`);

    let memeembed = new Discord.RichEmbed(message.embeds[0])
    .setColor("#ff9900")
    .setTitle("Meeeeeeeeeeeeeemmmmmmmmmmmmmmyyyyyyyyyyyy!")
    .setImage(body.url);

    message.channel.send(memeembed);
}
module.exports.help = {
    name:"memy"
  }