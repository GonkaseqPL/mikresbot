const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


    message.channel.sendMessage(args.join(" "));
  }
  module.exports.help = {
    name:"powiedz"
  }