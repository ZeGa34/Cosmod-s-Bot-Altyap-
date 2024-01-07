const Discord = require('discord.js');


module.exports = {
    name: "mesaj",
    aliases: ["mesaj"],

  run: async(client, message, args) => {   
  if (message.author.id != "924369071070404668") return message.reply('Bunu sadece botun sahibi kullanabilir'); // Bu kısmı silerseniz yetkili olan herkes kullanabilir. silmenizi tavsiye etmem.
    
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('⚠ Uyarı ⚠', 'Bu komutu özel mesajlarda kullanamazsın.');
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild;
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (reason.length < 1) return message.reply('Ne yazmam gerek onuda söyle.');
  if (message.mentions.users.size < 1) return message.reply('Ama böyle olmaz kimede mesaj atacağımı yazman gerek.').catch(console.error);
  message.delete();
  message.reply('Mesajını ilettim kanka.')
  const embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setTitle(`**Huhu orda mısın bir mesajın var ^^ **`)
  .setTimestamp()
  .setDescription(reason);
  return user.send(embed);
  
}
}