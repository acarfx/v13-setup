const { Intents } = require('discord.js')
const { acar } = require('./Global.Client');

const client = global.client = new acar({ 
    fetchAllMembers: true,
    intents: [32767]
});

require('mongoose').connect(global.sistem.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
}).then(() => {
    console.log("MongoDB Bağlantısı Başarılı");
}).catch(err => {
    console.log("MongoDB Bağlantısı Başarısız");
});

client.fetchCommands()
client.fetchEvents()
client.login(sistem.token).catch(err => { console.log("[TOKEN]: ARIZALI.")})
