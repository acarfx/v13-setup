# Örnek Discord.js v13 Setup Projesidir.
Öncelikle düzenlenmesi gereken yerler "Main.Settings/_settings.js" sunucu tokeni ve mongo urlsini girebilirsiniz ayrıca kendinizi direk kurulumla beraber bota ekletmek için "Main.Database/Global.Settings.js" dosyası içerisinde bulunan id bulunan kısımda kendi idinizi Array içine girebilirsiniz.

Not: **Bu projenin amacı anlık kurulum mantığını anlatmaktır.**

#### Verileri Anlık Çekmek İçin Kullanılabilir (Async):
```js
await <Guild>.fetchSettings()
```

### genEmbed ne için var?

genEmbed:
```js
const { genEmbed } = require("../../Main.Init/GenEmbed")

let embed = new genEmbed()
  .setFooter("Content", "iconURL")
  .setAuthor("Content", "iconURL")
  .setImage("URL")
  .setDescription("Content")

// Otomatik renk "RANDOM" olarak ayarlıdır.
// Değiştirmek için .setColor("2F3236") şeklinde ekleyebilirsiniz.

<TextChannel>.send({embeds: [embed}})

```

MessageEmbed:
```js
const { MessageEmbed } = require('discord.js')

let embed = new MessageEmbed()
  .setFooter({text: "Content", iconURL: "iconURL"})
  .setAuthor({name: "Content", iconURL: "iconURL"})
  .setImage("URL")
  .setDescription("Content")
  .setColor("RANDOM")
  
<TextChannel>.send({embeds: [embed}})

```
