# Örnek Discord.js v13 Setup Projesidir.
Öncelikle düzenlenmesi gereken yerler "Main.Settings/_settings.js" sunucu tokeni ve mongo urlsini girebilirsiniz ayrıca kendinizi direk kurulumla beraber bota ekletmek için "Main.Database/Global.Settings.js" dosyası içerisinde bulunan id bulunan kısımda kendi idinizi Array içine girebilirsiniz.

#### Verileri Anlık Çekmek İçin Kullanılabilir:
```js
await <ClientGuild>.fetchSettings()
```

Not: **Bu projenin amacı anlık kurulum mantığını anlatmaktır.**
