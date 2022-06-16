const { GuildMember, Guild, TextChannel, Message, MessageEmbed, ReactionCollector } = require("discord.js");
const Webhooklar = {};
const client = global.client;
const Settings = require("../Main.Database/Global.Settings")

GuildMember.prototype.rolTanımla = function (rolidler = []) {
    let rol = this.roles.cache.clone().filter(e => e.managed).map(e => e.id).concat(rolidler);
    return this.roles.set(rol);
}

GuildMember.prototype.rolVer = function (rolidler = []) {
    let rol = this.roles.cache.clone().filter(e => !e.managed).map(e => e.id).concat(rolidler);
    return this.roles.add(rol);
}


GuildMember.prototype.kayıtRolVer = function (rolidler = []) {
    let rol;
    if(this.roles.cache.has(Data.vipRolü)) { 
    rol = this.roles.cache.clone().filter(e => e.managed).map(e => e.id).concat(rolidler).concat(roller.vipRolü) 
    } else {
    rol = this.roles.cache.clone().filter(e => e.managed).map(e => e.id).concat(rolidler)
    };
    return this.roles.set(rol);
}

Guild.prototype.emojiGöster = function(emojiid) {
    let emoji = this.emojis.cache.get(emojiid)
    return emoji;
}

Guild.prototype.fetchSettings = async function() {
    let settings = await Settings.findOne({guildID: this.id})
    if(!settings) await Settings.updateOne({guildID: this.id}, {$set: {"updated": Date.now()}}, {upsert: true});
    global.Data = settings;
    return settings;
}

Guild.prototype.kanalBul = function(kanalisim) {
    let kanal = this.channels.cache.find(k => k.name === kanalisim)
    return kanal;
}
