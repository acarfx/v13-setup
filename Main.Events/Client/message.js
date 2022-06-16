const { Message, MessageEmbed } = require("discord.js");
const waitCommand = new Set();
const talentConfig = require('../../Main.Settings/talentPerms.json');
const Settings = require('../../Main.Database/Global.Settings');

 /**
 * @param {Message} message 
 */


module.exports = async (message) => {
    if (message.author.bot || !global.sistem.prefix.some(x => message.content.startsWith(x)) || !message.channel || message.channel.type == "dm") return;
    let Data  = await Settings.findOne({guildID: message.guild.id})
    if(!Data) {
      await Settings.updateOne({guildID: message.guild.id}, {$set: {"updated": Date.now()}}, {upsert: true});
    }
    global.Data = Data
    let args = message.content.substring(global.sistem.prefix.some(x => x.length)).split(" ")
    let TalentPerms = talentConfig.talentPerms.find((kom) => kom.commands.includes(args[0]));
    let commandOn = message.client.commands.get(args[0]) || message.client.aliases.get(args[0]) || TalentPerms;
    args = args.splice(1);
    let uye = message.guild.members.cache.get(message.member.id) || message.author;
    if(commandOn) {

        //if(waitCommand.has(uye.id)) return message.channel.send(global.reply.coolDown);
        if(Data.izinliKanallar && Data.izinliKanallar.length && !Data.izinliKanallar.some(x => message.channel.id == x) && !Data.staffs.includes(uye.id) && !uye.permissions.has('ADMINISTRATOR')) return message.channel.send(`${global.reply.botCommands} ${message.guild.channels.cache.get(Data.izinliKanallar[0])} kanalında tekrar deneyin.`)
        if(commandOn.permissions && commandOn.permissions.length) {
            if(commandOn.permissions.includes("OWNER")) {
                if(!Data.staffs.includes(uye.id)) return message.channel.send(global.reply.noPerms);
            } else {
                if(!Data.staffs.includes(uye.id) && !commandOn.permissions.some(x => uye.roles.cache.has(x)) && !uye.permissions.has('ADMINISTRATOR')) 
                return message.channel.send(`${global.reply.noPerms} ${commandOn.permissions.map(x => message.guild.roles.cache.get(x)).join(' ')} rollerine sahip olmalısın.`);
            }
        };
        
        if(!Data.staffs.includes(uye.id) && !uye.permissions.has('ADMINISTRATOR')) waitCommand.add(uye.id);

        if(TalentPerms) {
            let roleUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!roleUser) return message.channel.send(global.reply.notMember);
            if (TalentPerms.roles.some(role => roleUser.roles.cache.has(role))) { roleUser.roles.remove(TalentPerms.roles) } else { roleUser.roles.add(TalentPerms.roles) }
            message.react("✅")
          } else { commandOn.onRequest(message.client, message, args) };

         // setTimeout(() => { waitCommand.delete(uye.id) }, 2000);
        
    }
}

module.exports.Options = {
        active: true,
        name: 'messageCreate',
}
