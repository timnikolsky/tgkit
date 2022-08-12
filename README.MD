<img src="https://i.imgur.com/NzHUvon.png#gh-dark-mode-only" width="384" alt="discord.js"/>

---

## About

TeleScript is a library inspired by [discord.js](https://github.com/discordjs/discord.js) that allows you to easly create Telegram bots.

## Quick Example
```ts
import { Client } from 'telescript'

const client = new Client()

client.on('messageCreate', async (message) => {
    if(message.text === '/ping') {
        await message.reply('Pong!')
    }
})

client.login(process.env.TOKEN)
client.startPolling()
```
