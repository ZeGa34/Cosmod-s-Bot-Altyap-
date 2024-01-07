const { Client, Collection, RichEmbed, ModalBuilder, TextInputBuilder, ActionRowBuilder, InteractionType, EmbedBuilder, createAudioPlayer, createAudioResource, joinVoiceChannel, MessageAttachment, NoSubscriberBehavior, VoiceConnectionStatus } = require("discord.js");
const Discord = require('discord.js');
require("discord-reply")
const client = (global.client = new Client({ fetchAllMembers: true }));
require('discord-buttons')(client)
const fs = require('fs');
const db = require('quick.db');
const oziayar = require('./Settings/config.json')
require('moment-duration-format')
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();
const instagram = require("user-instagram")
const cooldowns = new Discord.Collection();
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const Canvas = require('canvas');
const moment = require("moment");


fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})


client.on('message', message => {
    const prefix = "c!";
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args, prefix)
})

    client.on('ready', async () => {
        setInterval(() => {
        const oyun = Math.floor(Math.random() * (oziayar.Activity.length));
        client.user.setActivity(`${oziayar.Activity[oyun]}`, {type: "LISTENING"});
    }, 10000);
        client.user.setStatus("idle");
        console.log(`${client.user.tag} olarak giriş yapıldı.`);

    let botVoiceChannel = client.channels.cache.get(oziayar.BotVoiceChannel); 
    if (botVoiceChannel) 
    botVoiceChannel.join().then(e => {
     e.voice.setSelfDeaf(true);
    })
})

Date.prototype.toTurkishFormatDate = function (format) {
    let date = this,
      day = date.getDate(),
      weekDay = date.getDay(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
  
    let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
    let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");
  
    if (!format) {
      format = "dd MM yyyy | hh:ii:ss";
    };
    format = format.replace("mm", month.toString().padStart(2, "0"));
    format = format.replace("MM", monthNames[month]);
    
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    };
    
    format = format.replace("dd", day.toString().padStart(2, "0"));
    format = format.replace("DD", dayNames[weekDay]);
  
    if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("hh") > -1) {
      if (hours > 24) hours -= 24;
      if (hours === 0) hours = 24;
      format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
    };
    if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
    return format;
  };
    ////////////////////////////////
client.on('message', async message => {
  if (!message.content.startsWith("c!") || message.author.bot) return;

  const args = message.content.slice("c!".length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'valorant') {
    // Cooldown kontrolü
    if (!cooldowns.has(command)) {
      cooldowns.set(command, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command);
    const cooldownAmount = 30 * 60 * 1000; // 30 dakika cooldown süresi

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
        return message.reply(`Lütfen ${timeLeft} saniye bekleyin, !valorant komutunu tekrar kullanmadan önce.`);
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // İlerleme durumu mesajı
    const progressMessage = await message.channel.send('<a:loadc:1183689114118262794> Valorant hesabı oluşturuluyor...');

    // Metin dosyasındaki içeriği oku
    const filePath = './valorant.txt';
    let data = fs.readFileSync(filePath, 'utf8');

    // Satırları diziye ayır
    let lines = data.split('\n');

    // Diziden rastgele bir satır seç
    const randomLineIndex = Math.floor(Math.random() * lines.length);
    const randomLine = lines[randomLineIndex];
    // İlerleme durumu güncelleme fonksiyonu
    const updateProgress = async (percentage) => {
      await progressMessage.edit(`<a:loadc:1183689114118262794> İlerleme durumu: **${percentage}%**`);
    };

    // İlerleme durumu simülasyonu
    for (let i = 0; i <= 100; i += 10) {
      await updateProgress(i);
      // Burada gerçek bir işlemi bekleyebilirsiniz (örneğin, dosya indirme, veritabanı güncelleme, vb.)
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    // Seçilen satırı kullanıcının DM'ine gönder
    const dm = new Discord.MessageEmbed()
      .setColor('#008000')
      .setTitle('Generated account')
      .addField("Service", `\`\`\`valorant\`\`\``, true)
      .addField("Account", `\`\`\`${randomLine}\`\`\``, true)
      .setTimestamp();

    await message.author.send(dm)
      .then(() => {
        // Seçilen satırı .txt dosyasından sil
        lines.splice(randomLineIndex, 1);
        data = lines.join('\n');
        fs.writeFileSync(filePath, data, 'utf8');
      })
      .catch(error => {
        console.error(`Hata: ${error.message}`);
        message.reply('Özel mesaj gönderilemedi. Lütfen DM (özel mesaj) ayarlarınızı kontrol edin.');
        progressMessage.edit('Hesap oluşturma işlemi başarısız oldu.');
        return;
      });

    // İlerleme durumu mesajını güncelle
    progressMessage.edit('<:agla2:1117558014048739500> Hesap oluşturulma işlemi tamamlandı. <:valorant1:1139484297586294924>');

    // Seçilen satırı yazıldığı kanala embed mesajlı gönder
    const embedMessage = new Discord.MessageEmbed()
      .setColor('#008000')
      .setTitle('Account generated successfully!')
      .setTimestamp()
      .setDescription(`Check your private messages, ${message.author}! If you do not receive the message, please unlock your private messages!`);
    message.channel.send(embedMessage);
  }
});
//////////////////////
const symbols = ['🎄', '🎅', '⛄', '🔔', '🎁'];
const winMultiplier = 2;

client.on('message', async message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'c!slots') {
    const user = message.author;
    
    // Slot makinesi simgelerini rastgele seç
    const result = [];
    for (let i = 0; i < 3; i++) {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      result.push(randomSymbol);
    }

    // Sonucu ekrana yazdır
    const slotEmbed = new Discord.MessageEmbed()
      .setColor('#FFD700')
      .setTitle('Yılbaşı Slot Oyunu')
      .addField('Sonuç', result.join('  '), true)
      .setTimestamp();

    // Kazanma kontrolü
    if (result.every(symbol => symbol === result[0])) {
      const kazanç = winMultiplier * 100; // Örnek kazanç miktarı
      slotEmbed.setDescription(`Tebrikler, kazandınız! **Yılbaşı** hediyesi kazandınız.`);
    } else {
      slotEmbed.setDescription('Üzgünüz, kaybettiniz. Daha şanslı olabilirsiniz!');
    }

    // Sonucu kullanıcının DM'ine gönder
    message.channel.send(slotEmbed);

  }
});
///////////////
// Load the existing promo codes from a file
const promoCodes = require('./promoCodes.json');
client.on('message', (message) => {
    if (message.author.bot) return;

    // Command handling
    if (message.content.startsWith("")) {
        const args = message.content.slice("c!".length).trim().split(' ');
        const command = args.shift().toLowerCase();

        switch (command) {
            case 'generatecode':
                generateCode(message.author.id);
                break;
            case 'redeemcode':
                redeemCode(message.author.id, args[0]);
                break;
            default:
                break;
        }
    }
});

// Function to generate a promo code for a user
function generateCode(userId) {
    const promoCode = generateRandomCode();
    
    // Store the promo code and associate it with the user ID
    promoCodes[promoCode] = userId;

    // Save the updated promo codes to the file
    fs.writeFileSync('./promoCodes.txt', JSON.stringify(promoCodes, null, 2));

    // Send the generated code to the user
    client.users.cache.get(userId).send(`Your promo code: \`${promoCode}\``);
}

// Function to redeem a promo code
function redeemCode(userId, code) {
    // Check if the promo code exists
    if (promoCodes[code]) {
        // Check if the code is not redeemed already
        if (promoCodes[code] === 'redeemed') {
            return client.users.cache.get(userId).send('This promo code has already been redeemed.');
        }

        // Redeem the code for the user
        promoCodes[code] = 'redeemed';

        // Save the updated promo codes to the file
        fs.writeFileSync('./promoCodes.txt', JSON.stringify(promoCodes, null, 2));

        // Send a confirmation to the user
        client.users.cache.get(userId).send('Promo code redeemed successfully!');
    } else {
        // Send an error message if the promo code is invalid
        client.users.cache.get(userId).send('Invalid promo code.');
    }
}

// Function to generate a random alphanumeric code
function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 8;

    let result = '';

    for (let i = 0; i < codeLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}
/////////////////////
client.on('message', message => {
  if (message.content === 'o') {
    message.channel.send('Shifumi oyununa hoş geldin! **1** Taş, **2** Kağıt, **3** Makas yazarak bir seçim yapabilirsin.');
  }
  
  if (message.content === '1' || message.content === '2' || message.content === '3') {
    const choices = ['Taş', 'Kağıt', 'Makas'];
    const randomNumber = Math.floor(Math.random() * 3);
    const botChoice = choices[randomNumber];

    let result;

    if (message.content === '1' && botChoice === 'Makas') {
      result = '**Kazandın!** Bot Makas seçti.';
    } else if (message.content === '2' && botChoice === 'Taş') {
      result = '**Kazandın!** Bot Taş seçti.';
    } else if (message.content === '3' && botChoice === 'Kağıt') {
      result = '**Kazandın!** Bot Kağıt seçti.';
    } else if (message.content === '1' && botChoice === 'Kağıt') {
      result = '**Kaybettin!** Bot Kağıt seçti.';
    } else if (message.content === '2' && botChoice === 'Makas') {
      result = '**Kaybettin!** Bot Makas seçti.';
    } else if (message.content === '3' && botChoice === 'Taş') {
      result = '**Kaybettin!** Bot Taş seçti.';
    } else if (message.content === '1' && botChoice === 'Taş') {
      result = '**Berabere!** Her ikisi de Taş seçti.';
    } else if (message.content === '2' && botChoice === 'Kağıt') {
      result = '**Berabere!** Her ikisi de Kağıt seçti.';
    } else if (message.content === '3' && botChoice === 'Makas') {
      result = '**Berabere!** Her ikisi de Makas seçti.';
    } else {
      result = 'Geçersiz bir seçenek girdin! Lütfen **1**, **2** veya **3** yazarak bir seçim yap.';
    }

    message.channel.send(result);
  }
});
/////
client.on('ready', () => {
    console.log(`Bot logged in as ${client.user.tag}`);
});
/////////
client.on('message', message => {
    if (!message.content.startsWith("!") || message.author.bot) return;

    const args = message.content.slice("!".length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'slot') {
        const emojis = [':apple:', ':banana:', ':grapes:', ':watermelon:', ':tangerine:', ':strawberry:']; //Slot ikonları
        const slot1 = emojis[Math.floor(Math.random() * emojis.length)]; //1. slot
        const slot2 = emojis[Math.floor(Math.random() * emojis.length)]; //2. slot
        const slot3 = emojis[Math.floor(Math.random() * emojis.length)]; //3. slot

        message.channel.send(slot1 + ' | ' + slot2 + ' | ' + slot3); //Slotları ekrana yazdır

        if (slot1 === slot2 && slot2 === slot3) {
            message.reply('Tebrikler, kazandın!');
        } else {
            message.reply('Üzgünüm, kaybettin!');
        }
    }
});

console.warn("")
console.log("sa")
client.login(process.env.BotToken);
