const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {

    const anjay = new MessageEmbed()
    .setTitle("English House Bot")
    .setDescription("Hello, I'am **English House Official Bot**\nI will help you with the command that I have\n\nMy Prefix Is `eh!`\n\nCommand\n```avatar, ping```")
    .setTimestamp()
    .setColor("BLACK")

    return message.channel.send(anjay);
}