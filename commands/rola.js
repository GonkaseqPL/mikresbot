const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!addrole @andrew Dog Person
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Nie zrobie tego!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Nie moge znaleść tego użytkownika.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Ale jaką role? :thinking:");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Nie mogę znaleść tej roli. :thinking:");

  if(rMember.roles.has(gRole.id)) return message.reply("Już masz tą role!");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(` <@${rMember.id}> ma od teraz role ${gRole.name}.`)
  }catch(e){
    message.channel.send(` <@${rMember.id}> ma od teraz role ${gRole.name}.`)
  }
}
module.exports.help = {
  name:"rola"
}