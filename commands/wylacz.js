const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  if (message.author.id === "325315358233985025") {
    message.channel.send(":gear: Jestem wyłączany!")
    
    bot.destroy()
  message.channel.send("Tylko Gonkas może to zrobić!")
  }
    }
    module.exports.help = {
      name:"wylacz"
    }