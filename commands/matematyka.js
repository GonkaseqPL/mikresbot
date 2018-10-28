const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c)=> p + c);

message.channel.sendMessage(total);
  }
  module.exports.help = {
    name:"matematyka"
  }