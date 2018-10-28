const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot, message, args) => {
    let {body} = await superagent
    .get (`https://random.dog/woof.json`);

    let dogembed = new Discord.RichEmbed(message.embeds[0])
    .setColor("#ff9900")
    .setTitle("Oto twoje zdjęcie psa!")
    .setImage(body.url);

    message.channel.send(dogembed);
}
module.exports.help = {
    name:"pies"
  }