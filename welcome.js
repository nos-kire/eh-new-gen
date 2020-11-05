const Canvas = require("canvas");
const Discord = require("discord.js");

module.exports = function (client) {

    const description = {
        name: "WelcomeImages",
        filename: "welcome.js",
        version: "4.8"
    }
   
    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)
    
    client.on("guildMemberAdd", async member => {
    
      if(!member.guild) return;
 
      const canvas = Canvas.createCanvas(1772, 633);

      const ctx = canvas.getContext('2d');
     
      const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/587018766173601794/773842731722080276/EHBannerR_2.png");
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#f2f2f2';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
      var textString3 = `${member.user.username}`;
    
      if (textString3.length >= 14) {
        ctx.font = 'bold 100px Genta';
        ctx.fillStyle = '#6495ED';
        ctx.fillText(textString3, 720, canvas.height / 10 + 20);
      }
    
      else {
        ctx.font = 'bold 150px Genta';
        ctx.fillStyle = '#6495ED';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      
        var textString4 = `Welcome to English House`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#6495ED';
      ctx.fillText(textString4, 700, canvas.height / 2 - 150);
      //create a circular "mask"
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();
     
     
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();
 
       const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      //gambar avatar
      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
      
   //attachmentnya
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
         const welcomeembed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTimestamp()
        .setTitle("Welcome!!")
        .setDescription(`Hey ${member.user}, Welcome To English House!\n\n・Check out <#769315817137373194>\n・Feel free to introduce yourself briefly at <#552724672710705152>\n・You can also assign a few roles by yourself at <#572928865417166898> to be able to enter the locked channels.\n・Our general chat is <#571065207384703002>\n\nFor further information, don't hesitate to ask questions to either **Hosts** or **Moderators** , you will be assisted shortly. Bless you~`)
        .setImage("attachment://welcome-image.png")
        .attachFiles(attachment);
      
      //channel-welcomenya
      const channel = member.guild.channels.cache.find(ch => ch.id === "587018766173601794");
      
      channel.send(welcomeembed);
      
    })
}

//Coded by Tomato#6966!
