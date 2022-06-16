const { Message, MessageEmbed } = require("discord.js");
const waitCommand = new Set();
const { genEmbed } = require("../../Main.Init/genEmbed");
const Settings = require("../../Main.Database/Global.Settings");
 /**
 * @param {GuildMember} member 
 */
  
 
  module.exports = async (member) => {
    member = member.guild.members.cache.get(member.id)
    let Data = await Settings.findOne({guildID: member.guild.id})
    if(!Data) {
      await Settings.updateOne({guildID: member.guild.id}, {$set: {"updated": Date.now()}}, {upsert: true});
    }
    global.Data = Data
    await member.setNickname("Kayıtsız Üye").catch(err => {});
    let OneWeak = Date.now()-member.user.createdTimestamp <= 1000*60*60*24*7;
    if(OneWeak) {
        await member.rolTanımla(_set.şüpheliRolü)
        return await member.guild.channels.cache.get(Data.hosgeldinKanal).send(`${member} isimli üye sunucuya katıldı fakat hesabı ${global.timeTag(Date.parse(member.user.createdAt))} açıldığı için şüpheli olarak işaretlendi.`);
        // member.guild.kanalBul("şüpheli-log").send({embeds: [new genEmbed().setDescription(`${member} isimli üye sunucuya katıldı fakat hesabı ${global.timeTag(Date.parse(member.user.createdAt))} açıldığı için şüpheli olarak işaretlendi.`)]});
    };

    let hosgeldinKanal = member.guild.channels.cache.get(Data.hosgeldinKanal);

    member.rolTanımla(Data.kayıtsızRolleri)

    if(hosgeldinKanal) hosgeldinKanal.send({content: `${member.user.tag} adlı kullanıcı sunucuya katıldı!
Hesabın __${global.tarihsel(member.user.createdAt)}__ tarihinde (${global.timeTag(Date.parse(member.user.createdAt))}) oluşturulmuş!`})


  }

module.exports.Options = {
        active: true,
        name: 'guildMemberAdd',
}
