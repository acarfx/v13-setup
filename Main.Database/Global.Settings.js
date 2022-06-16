const mongoose = require("mongoose");

const schema = mongoose.model('Setting', new mongoose.Schema({
    guildID: String,
    updated: Number,
    staffs: {type:Array, default:["327236967265861633"]},
    yasakTaglar: {type: Array, default: []},
    tag: String,
    taglıalım: {type: Boolean, default: false},
    hosgeldinKanal: String,
    kayıtsızRolleri: {type: Array, default: []},
    izinliKanallar: {type: Array, default: []},
    jailRolü: String,
    şüpheliRolü: String,
    yasaklıTagRolü: String,
    muteRolü: String,
    üyeRolü: String,
    uyarıRoleI: String,
    uyarıRoleII: String,
    vipRolü: String
}));

module.exports = schema;