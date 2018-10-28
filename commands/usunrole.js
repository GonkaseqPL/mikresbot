const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorki, nie zrobie tego.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Nie moge znaleść tego użytkownika.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Ale jaką role? :thinking:");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Nie moge znaleśc tej roli. :thinking:");

  if(!rMember.roles.has(gRole.id)) return message.reply("Ta osoba nie ma tej roli.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`Usunąłeś sobie role "${gRole.name}".`)
  }catch(e){
    message.channel.send(`Usuneliśmy <@${rMember.id}> role ${gRole.name}.`)
  }
}
module.exports.help = {
  name:"usunrole"
}