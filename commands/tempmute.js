const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Nie moge znaleść użytkownika.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Nie z-mutuje tej osoby!");
  let muterole = message.guild.roles.find(`name`, "zmutowany");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "zmutowany",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Nie powiedziałeś na jaki czas!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> dostał mute na ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> został od-mutowany!`);
  }, ms(mutetime));
}
module.exports.help = {
  name:"tempmute"
}