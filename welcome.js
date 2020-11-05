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
     
      const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/762823411184697395/771980958579949588/EHBannerR_3.png");
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#f2f2f2';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
      var textString3 = `"READ the EMBED MESSAGE."`;
    
      if (textString3.length >= 14) {
        ctx.font = 'bold 100px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 10 + 20);
      }
    
      else {
        ctx.font = 'bold 150px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      
     
     
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();
 
      
   
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
      
      
      const channel = member.guild.channels.cache.find(ch => ch.id === "587018766173601794");
      
      channel.send(attachment);
      
    })
}

//Coded by Tomato#6966!
