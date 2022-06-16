
const { MessageButton, MessageActionRow } = require('discord.js');
const { on } = require('../../Main.Database/Global.Settings');
const Settings = require("../../Main.Database/Global.Settings")
const { genEmbed } = require("../../Main.Init/GenEmbed")
module.exports = {
    
    name: "setup",
    aliases: [],
    description: "acar",
    permissions: ["OWNER"],
    category: [],
    active: true,

    /**
    * @param {Client} client 
    */
   
    onLoad: function (client) {
        console.log(`[SETUP] Modül başarıyla yüklendi.`)

    },

    /**
    * @param {Client} client 
    * @param {Message} message 
    * @param {Array<String>} args 
    */

    onRequest: async function (client, message, args) {
      let fetchSettings = await message.guild.fetchSettings()
      let seçim = args[0]
      if(!seçim) {
        let allSettings = new genEmbed()
        .setDescription(`Aşağıda bulunan ayarlar veya yapılmamış ayarlar listelenmektedir. Bu ayarlar ${message.guild.name} sunucusuna aittir.

**Taglı Alım Modu**: **\` ${fetchSettings.taglıalım ? "Açık!" : "Kapalı!"} \`** (Bu ayarı değiştirmek için \`${sistem.prefix[0]}setup taglıalım\` yazabilirsiniz.)

**Tagınız**: ${fetchSettings.tag ? fetchSettings.tag : "**` Ayarlanmadı! `**"} (Bu ayarı değiştirmek için \`${sistem.prefix[0]}setup tag\` yazabilirsiniz.)

**Yasaklı Taglar**: ${fetchSettings.yasakTaglar.length ? fetchSettings.yasakTaglar.map(x => x).join(", ") : "**` Ayarlanmadı! `**"} (Bu ayarı değiştirmek için \`${sistem.prefix[0]}setup yasakTaglar\` yazabilirsiniz.)

**Hoşgeldin Kanalınız**: ${fetchSettings.hosgeldinKanal ? message.guild.channels.cache.get( fetchSettings.hosgeldinKanal) ? message.guild.channels.cache.get( fetchSettings.hosgeldinKanal) : `**\` Veri Tekrardan Girilmeli! \`**` : "**` Ayarlanmadı! `**"} (Bu ayarı değiştirmek için \`${sistem.prefix[0]}setup hosgeldinKanalı\` yazabilirsiniz.)

**İzinli Kanallar**: ${fetchSettings.izinliKanallar.length ? fetchSettings.izinliKanallar.map(x => message.guild.channels.cache.get(x)).join(", ") : "**` Ayarlanmadı! `**"} (Bu ayarı değiştirmek için \`${sistem.prefix[0]}setup izinliKanallar\` yazabilirsiniz.)

**Kayıtsız Rolleri**: ${fetchSettings.kayıtsızRolleri.length ? fetchSettings.kayıtsızRolleri.map(x => message.guild.roles.cache.get(x)).join(", ") : "**` Ayarlanmadı! `**"} (Bu ayarı değiştirmek için \`${sistem.prefix[0]}setup kayıtsızRolleri\` yazabilirsiniz.)

**Üye Rolü**: ${fetchSettings.üyeRolü ? message.guild.roles.cache.get(fetchSettings.üyeRolü) ? message.guild.roles.cache.get(fetchSettings.üyeRolü) : `**\` Veri Tekrardan Girilmeli! \`**` : "**` Ayarlanmadı! `**"} (Bu ayarı değiştirmek için \`${sistem.prefix[0]}setup üyeRolü\` yazabilirsiniz.)
`)
        return message.channel.send({embeds: [allSettings]})
      }
      if(seçim == "taglıalım") {
        let tagliAlim = fetchSettings.taglıalım
        updateStringData("taglıalım", !tagliAlim, message.guild.id)
        return message.channel.send(`Başarıyla taglı alım modu ${!tagliAlim ? "**` Açık! `**" : "**` Kapalı! `**"} şekilde ayarlandı!`)
      }


      if(seçim == "tag") {
        if(!args[1]) return message.channel.send("Lütfen tagınızı yazınız!")
        let tag = args.slice(1).join(" ")
        await updateStringData("tag", tag, message.guild.id)
        return message.channel.send("Tag başarıyla güncellendi!")
      }
      if(seçim == "yasakTaglar") {
        if(args[1] == "-temizle") {
        return updateStringData("yasakTaglar", [], message.guild.id), message.channel.send("Yasak taglar başarıyla temizlendi!")
        }
        let tag = args.splice(1).join(' ');
        if(!tag) return message.channel.send("Lütfen yasaklanacak tagı veya tagları yazınız!")
        let arr = fetchSettings.yasakTaglar || []
        let index = arr.find(e => e == tag);
        if(index) arr.splice(arr.indexOf(tag), 1);
        else arr.push(tag);
        await updateStringData("yasakTaglar", arr, message.guild.id)
        return message.channel.send("Yasaklı taglar başarıyla güncellendi!")

      }
      if(seçim == "hosgeldinKanal") {
        if(!args[1]) return message.channel.send("Lütfen hoşgeldin kanalınızı yazınız!")
        let hoşgeldinKanal = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!hoşgeldinKanal) return message.channel.send("Lütfen geçerli bir kanal yazınız!")
        await updateStringData("hosgeldinKanal", hoşgeldinKanal.id, message.guild.id)
        return message.channel.send("Hoşgeldin kanalı başarıyla güncellendi!")
      }
      if(seçim == "üyeRolü") {
        if(!args[1]) return message.channel.send("Lütfen üye rolünü yazınız!")
        let üyeRolü = message.guild.roles.cache.get(args.splice(1)[0]) || message.mentions.roles.first();
        if(!üyeRolü) return message.channel.send("Lütfen geçerli bir üye rolü yazınız!")
        await updateStringData("üyeRolü", üyeRolü.id, message.guild.id)
        return message.channel.send("Üye rolü başarıyla güncellendi!")
      }
      if(seçim == "izinliKanallar") {
        if(!args[1]) return message.channel.send("Lütfen izinli kanallarınızı yazınız!")
        let kanallar;
        if(message.mentions.channels.size > 0) {
          kanallar = message.mentions.channels.map(c => c.id)
        } else {
          kanallar = args.slice(1).filter(c => message.guild.channels.cache.some(channel => c == channel.id))
        }
        if(kanallar.length < 0) return message.channel.send("Belirtilen kanallar, kanal olarak bulunamadı.")
        await updateStringData("izinliKanallar", kanallar, message.guild.id)
        return message.channel.send("İzinli kanallar başarıyla güncellendi!")
      }

      if(seçim == "kayıtsızRolleri") {
        if(!args[1]) return message.channel.send("Lütfen kayıtsız rollerini yazınız!")
        let kanallar;
        if(message.mentions.roles.size > 0) {
          kanallar = message.mentions.roles.map(c => c.id)
        } else {
          kanallar = args.slice(1).filter(c => message.guild.roles.cache.some(channel => c == channel.id))
        }
        if(kanallar.length < 0) return message.channel.send("Belirtilen roller, rol olarak bulunamadı.")
        await updateStringData("kayıtsızRolleri", kanallar, message.guild.id)
        return message.channel.send("Kayıtsız rolleri başarıyla güncellendi!")
      }

      if(seçim == "jailRolü") {
        if(!args[1]) return message.inreply("Lütfen jail rolü belirtiniz!")
        let jailRolü = message.guild.roles.cache.get(args.splice(1)[0]) || message.mentions.roles.first();

      }

    }
};

/**
 * @param {String} data
 * @param {String} inData
 * @returns {String}
 * @description Aşağıda bulunan fonksiyonu kullanarak string değerleri değiştirmeye yarar.
 */

async function updateStringData(data, inData, guildID) {
    await Settings.updateOne({guildID: guildID}, {$set: {[`${data}`]: inData}}, {upsert: true})
    console.log(`[SETTINGS] ${data} verisi ${inData} olarak güncellendi!`)
}
