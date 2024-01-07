const Discord = require('discord.js');
const request = require('request');

module.exports = {
    name: 'sor',
    aliases: ['sor'],
    run: async (client, message, args) => {
        let soru = args.join(' ');
        if (!soru) return message.channel.send(`**Efendim dadlış şey seni ${message.author} nasıl yardımcı olabilirim sana**`);

        let encodedSoru = encodeURI(soru);

        // İlerleme durumu mesajı
        const progressMessage = await message.channel.send('<a:loadc:1183689114118262794> Cevap hazırlanıyor... %0');

        // Simüle edilmiş bir ilerleme durumu
        let percent = 0;

        // Belirli aralıklarla ilerleme durumunu güncelle
        const interval = setInterval(() => {
            percent += Math.floor(Math.random() * 20) + 10; // Rastgele bir yüzde artışı ekleyin

            // Yüzde 100'e ulaştığında işlemi sonlandır
            if (percent >= 100) {
                clearInterval(interval);
                percent = 100; // Yüzdeyi 100'e ayarlayın
                progressMessage.edit(`<:agla2:1117558014048739500> Cevap hazırlandı... %${percent}`);

                // Gerçek cevabı al
                request(`https://hercai.onrender.com/v3/hercai?question=${encodedSoru}`, (err, resp, body) => {
                    try {
                        body = JSON.parse(body);

                        if (err) {
                            console.error('Hata oluştu:', err);
                            return message.channel.send('**Hata oluştu, error verdim. Bir daha deneyin.**');
                        }

                        // Cevabı gönder
                        const embed = new Discord.MessageEmbed()
                            .setColor('#3498db')
                            .setTitle('Cevap')
                            .setDescription(body.reply)
                            .setTimestamp();

                        message.channel.send(embed);
                    } catch (error) {
                        console.error('Cevap ayrıştırılamadı:', error);
                        message.channel.send('**Hata oluştu, error verdim. Bir daha deneyin.**');
                    }
                });
            } else {
                progressMessage.edit(`<a:loadc:1183689114118262794> Cevap hazırlanıyor... %${percent}`);
            }
        }, 3000); // 3 saniyede bir güncelle, istediğiniz süreyi ayarlayabilirsiniz
    }
};
