const Discord = require("discord.js");
const Canvas = require("canvas");
const config = require('./config.json')
const client = new Discord.Client({fetchAllMembers:true})
require('dotenv').config()

const welcome = require("./welcome");
welcome(client);

client.on("ready", async () => {
  console.log(`${client.user.username} is ready`);
  client.user.setActivity("English House | @Takiya Genji", { type: "PLAYING" }); //UBAH PRESENCE/STATUS BOT DISINI
});

client.on("message", async message => {
  
  //CMD HANDLER
  if (message.author.bot) return null;
  if (message.content.indexOf(config.prefix) !== 0) return null;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g); // (" ");
  const cmd = args.shift().toLowerCase();
  try {
    const commandsFile = require(`./commands/${cmd}.js`);
    commandsFile.run(client, message, args);
  } catch (e) {
    console.log(e.message)
  } finally {
    console.log(`${message.author.tag} menggunakan command ${config.prefix}${cmd}`);
  }
  
});

client.on("guildMemberUpdate", async (oldState, newState) => {

    // Boost

    if (!oldState.premiumSince && newState.premiumSince) {
      
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${newState.user.tag}** just boosted the server! Thank you, mate!`)
      .setTitle('Boost Log')
      .setColor("BLACK")
      .setTimestamp()

      client.channels.cache.get("665680031988842496").send(embed)

    }

})

client.on("guildMemberAdd", member => {

  const welcomeembed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTimestamp()
        .setAuthor(member.guild.iconURL({ dynamic: true }))
        .setTitle("Welcome!!")
        .setDescription(`Hey ${member.user}, Welcome To English House!\n\n・Check out <#769315817137373194>\n・Feel free to introduce yourself briefly at <#552724672710705152>\n・You can also assign a few roles by yourself at <#572928865417166898> to be able to enter the locked channels.\n・Our general chat is <#571065207384703002>\n\nFor further information, don't hesitate to ask questions to either **Hosts** or **Moderators** , you will be assisted shortly. Bless you~`)
        .setImage("https://cdn.discordapp.com/attachments/762823411184697395/773845290935386112/77709.jpg")
      
      //channel-welcomenya
      const channel = member.guild.channels.cache.find(ch => ch.id === "587018766173601794");
      
      channel.send(welcomeembed);
      

  const embed = new Discord.MessageEmbed()
.setTitle(`Welcome To English House`)
.setColor("BLACK")
.setImage("https://cdn.discordapp.com/attachments/765397858010267758/765434690437251083/EH_Logopink.gif")
.setThumbnail(member.user.displayAvatarURL())
.setDescription(`Hello ${member.user}\n\nI am English House Bot, pleasure to meet you. Welcome to English House!\n\nCheck out <#769315817137373194> . If you are new on discord, please read the messages at <#549792030910447616> and you can always ask for help from the **Hosts** or **Moderators** in this server. And if you're experiencing inconvenience in this server, please immediately report it to one of these roles as well.\n\nIf you are not from Indonesia, I would like you to let the **Hosts** know, so you'll be assigned either a **Native English Speaker** or **Foreign** role. Likewise, you can introduce yourself at <#552724672710705152> and let us know where you came from! Have a great time!\n\n\nYou are our **${member.guild.memberCount}** Member`)


  member.send(embed)
});

client.login(process.env.TOKEN);
