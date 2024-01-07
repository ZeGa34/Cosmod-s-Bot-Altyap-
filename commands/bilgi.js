const { Discord, MessageEmbed} = require("discord.js");
const oziayar = require("../Settings/config.json");
const { green , red } = require("../Settings/config.json");
const { MessageActionRow, MessageButton } = require('discord-buttons');

module.exports = {
    name: "bilgi",
    aliases: ["bilgi"],

    run: async (client, message, args, embed, prefix) => {

      var istek = new MessageButton()
      .setID("istek")
      .setEmoji("1130823059134218330")
      .setLabel("İnstagram Ücretsiz Sipariş")
      .setStyle("green")

      var sikayet = new MessageButton()
      .setID("sikayet")
      .setLabel("Şikayet")
      .setStyle("red")

      var canlıdestek = new MessageButton()
      .setID("canlıdestek")
      .setLabel("Canlı Destek")
      .setStyle("blurple")

      var evet = new MessageButton()
      .setID("evt")
      .setEmoji("1118454469001220176")
      .setLabel("Evet")
      .setStyle("green")

      var hayır = new MessageButton()
      .setID("hyr")
      .setEmoji("1118454470934806599")
      .setLabel("Hayır")
      .setStyle("red")

      var sa = new MessageButton()
      .setStyle('url')
      .setLabel('Ürün Takip')
      .setURL("https://www.instagram.com/login")

      const row = new MessageActionRow()
      .addComponent(evet)
      .addComponent(hayır)

      let msg = await message.channel.send(`1 - İnstagram **Kullanıcı Adınızı** Doğru Giriniz. \n 2 - Günde **1** Defa Kullanabilirsiniz. \n 3 - Otomatik **0-24** Saat İçinde Gönderim Tamamlanır. \n 4 - Şansınıza **20 - 50** Arasında Gönderilir. \n 5 - Eğer Gönderim Hatalı veya Başarısız Olursa **Şikayet** Talebini Açın. \n 6 - Hesabınız **Gizli** Olmasın Ve En Az 1 Gönderi Olursa Takipçi Şansınız Artabilir.\n `)

    var filter = (button) => button.clicker.user.id === message.author.id;
    let ozi = msg.createButtonCollector(filter, { time: 200000000000000000000 })

      ozi.on("collect", async (button) => {

        const filter = m => m.author === message.author;
				var cevaplar = {};
        istek: cevaplar["Öneri"]

      if(button.id === "istek") {
await button.reply.defer()
      msg.edit(`Lütfen **60** saniye içerisinde instagram kullanıcı adınızı belirtiniz.`,{components: null});

        message.channel.awaitMessages(filter, { max: 1 }).then(async function (collected) {
        collected.each(msj => cevaplar["Öneri"] = msj.content);

      msg.edit(`<a:onay:1118454469001220176> **Ücretsiz İnstagram Takipçi Siparişiniz Verildi (.bilgi) Okuyun!**`,{buttons: [sa]},{components: null});

let channel = client.channels.cache.get(oziayar.ÖneriİstekChannelID)
const ozi = new MessageEmbed()
.setAuthor("Öneri / İstek", client.user.avatarURL())
.setFooter(message.author.tag, message.author.avatarURL())
.setDescription(`**Gönderen:** ${message.author} - \`${message.author.id}\``)
.setTimestamp()
.addField("Mesaj İçeriği", cevaplar["Öneri"])
.setColor("RANDOM")
await channel.send({ embed: ozi })
})

}

      if(button.id === "sikayet") {
await button.reply.defer()
      msg.edit(`Lütfen **60** saniye içerisinde şikayetinizi belirtiniz.`,{components: null}); 

        message.channel.awaitMessages(filter, { max: 1 }).then(async function (collected) {
        collected.each(msj => cevaplar["Şikayet"] = msj.content);

      msg.edit(`<a:onay:1118454469001220176> **Şikayetiniz başarıyla iletildi!**`,{components: null});

let channel = client.channels.cache.get(oziayar.SikayetChannelID)
const ozi = new MessageEmbed()
.setAuthor("Şikayet", client.user.avatarURL())
.setFooter(message.author.tag, message.author.avatarURL())
.setDescription(`**Gönderen:** ${message.author} - \`${message.author.id}\``)
.setTimestamp()
.addField("Mesaj İçeriği", cevaplar["Şikayet"])
.setColor("RANDOM")
await channel.send({ embed: ozi })
})
}

     if(button.id === "canlıdestek") {
await button.reply.defer()
     msg.edit(`<a:ast_nlem:1119991342836228096> Görüşmelerimiz kayıt altına alınmaktadır! Trolleyen/Gereksiz kullananlar cezalandırılacaktır. Canlı desteğe bağlanmak istediğinizden emin misiniz?`,{components: [row]});
    }

      if(button.id === "evt") {
await button.reply.defer()
      msg.edit(`<a:1086034096255414384:1118920677509038150> Sizi canlı destek ekibimize bağlıyorum, lütfen beklemede kalın...`,{components: null}); 
}

      if(button.id === "hyr") {
await button.reply.defer()
      msg.edit(`Canlı desteğe bağlanılırken bir hata oluştu veya bağlantı onaylanmadı!`,{components: null}); 
}
});


}}