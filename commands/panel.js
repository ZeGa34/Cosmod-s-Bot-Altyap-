const { Discord, MessageEmbed} = require("discord.js");
const oziayar = require("../Settings/config.json");
const { green , red } = require("../Settings/config.json");
const { MessageActionRow, MessageButton } = require('discord-buttons');

module.exports = {
    name: "panel",
    aliases: ["panel"],

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

      const row = new MessageActionRow()
      .addComponent(evet)
      .addComponent(hayır)

      let msg = await message.channel.send(`Lütfen **20 saniye** içerisinde hangi hizmeti kullanmak istediğinizi aşağıdaki butonlara tıklayarak belirtin.`,{buttons: [istek,sikayet,canlıdestek]})

    var filter = (button) => button.clicker.user.id === message.author.id;
    let ozi = msg.createButtonCollector(filter, { time: 20000 })

      ozi.on("collect", async (button) => {

        const filter = m => m.author === message.author;
				var cevaplar = {};
        istek: cevaplar["Öneri"]

      if(button.id === "istek") {
await button.reply.defer()
      msg.edit(`Lütfen **60** saniye içerisinde instagram kullanıcı adınızı belirtiniz.`,{components: null});

        message.channel.awaitMessages(filter, { max: 1 }).then(async function (collected) {
        collected.each(msj => cevaplar["Öneri"] = msj.content);
      var sa = new MessageButton()
      .setStyle('url')
      .setLabel('Ürün Takip')
      .setURL(`https://www.instagram.com/${cevaplar.Öneri}`)
      msg.edit(`<a:onay:1118454469001220176> **Ücretsiz İnstagram Takipçi Siparişiniz Verildi (.bilgi) Okuyun!** \n ||https://cdn.discordapp.com/attachments/1165619120201535498/1174039109254271078/Birkac_satr_govde_metni_ekle.gif?ex=65662420&is=6553af20&hm=5c72df7aafefbd2b40295e8433da3188a46a8d28fee543074b29e690b7812253&||`,{buttons: [sa]},{components: null});

let channel = client.channels.cache.get(oziayar.ÖneriİstekChannelID)
const ozi = new MessageEmbed()
.setAuthor("İnstagram Free Takipçi Servisi", client.user.avatarURL())
.setFooter(message.author.tag, message.author.avatarURL())
.setDescription(`**Gönderen:** ${message.author} - \`${message.author.id}\``)
.setTimestamp()
.addField("Kullanıcı Adı", cevaplar["Öneri"])
.setColor("RANDOM")
await channel.send({ embed: ozi })
await channel.send("İnstagram Yönlendirici", {buttons: [sa]},{components: null});
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
let channel = client.channels.cache.get(oziayar.SikayetChannelID)
const ozi = new MessageEmbed()
.setAuthor("Canlı Destek", client.user.avatarURL())
.setFooter(message.author.tag, message.author.avatarURL())
.setDescription(`**Gönderen:** ${message.author} - \`${message.author.id}\``)
.setTimestamp()
.setColor("RANDOM")
await channel.send({ embed: ozi })

}

      if(button.id === "hyr") {
await button.reply.defer()
      msg.edit(`Canlı desteğe bağlanılırken bir hata oluştu veya bağlantı onaylanmadı!`,{components: null}); 
}
});


}}