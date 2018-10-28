const Discord = require('discord.js');
const weather = require('weather-js');

module.exports.run = async (bot, message, args) => {

  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
      if (err) message.channel.send(err);
      if (result === undefined || result.length === 0) {
          message.channel.send('**Wstaw lokacje!**')
          return;
      }
      var current = result[0].current;
      var location = result[0].location;
      const embed = new Discord.RichEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`Pogoda dla : ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setColor(0x00AE86)
          .addField('Czas',`GMT${location.timezone}`, true)
          .addField('Typ temperatury',location.degreetype, true)
          .addField('Temperatura',`${current.temperature} Stopni`, true)
          .addField('Czuć jakby...', `${current.feelslike} Stopni`, true)
          .addField('Wiatr',current.winddisplay, true)
          .addField('Wilgotność', `${current.humidity}%`, true)
          message.channel.send({embed});
  })
}
module.exports.help = {
    name:"pogoda"
  }