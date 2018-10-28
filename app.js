const botconfig = require("./botconfig.json");
const tokenf = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});
bot.on("ready", () => {

console.log(`${bot.user.username} jest online na ${bot.guilds.size} serwerach!`);
bot.user.setActivity("Wersja 1.0.0", {type: "PLAYING"});
}); 

bot.on('guildMemberAdd', member =>{
  member.guild.channels.get('505613631497699330').send('**' + member.user + '** dołączył na serwer!')
});

bot.on('guildMemberRemove', member =>{
  member.guild.channels.get('505613631497699330').send('**' + member.user.username + '** dołączył na serwerwyszedł z serwera. :(')
});
bot.on('message', message => {
	if (message.channel.type == "dm") return;
    const swearWords = ["kurwa","chuj","jebać", "discord.gg", "https://discord.gg", "http://discord.gg"]; // These are the words that wll be filtered. If you would like to add more, simple add ,"word" inbetween the [ and ] and then it'll filter that word as well
    if (swearWords.some(word => message.content.toLowerCase().includes(word))) {
        message.delete();
        message.channel.send(`Hej ${message.author}! nie możesz przeklinać na tym serwerze ani wysyłać zaproszeń na inne serwery!!`).then(m => m.delete(3000)); // This function will tell the user off for using the filtered words, and then the message which telsl the user off will be deleted after 3 seconds. If you would like to extend the time, feel free to change it but take note that it's measured in milliseconds. If you don't want the bot to remove the warning message, take off the ".then(m => m.delete(3000))" bit!
        embed = new Discord.RichEmbed() // The log feature will log embeds, instead of simple messages. This improves the look of the word filter and makes it easier to code.
        embed.setAuthor(name=`${message.author.tag}`, icon=message.author.avatarURL) // The author label will show the user who actually used the word. It will show their FULL tag and their profile picture.
        embed.setDescription('Przekleństwo w - '+ message.channel) // This will tell you which channel the word was used in.
        embed.setColor(0xff0000) // This is just a random colour. If you'd like to change it, simple change the "ff0000" to a different code. Make sure "0x" stays before the number.
        embed.addField(name="Wiadomość:", value=message.content) // This will tell you the entire message, so you can spot out the word which was used.
        embed.setFooter(name=`ID: ${message.author.id}`) // This will give you the UserID of the user who used a filtered word in the embed's footer.
        embed.setTimestamp() // This will tell you what time the word was used at.
      }
}); // end of function



bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

 
});


bot.login(tokenf.token);