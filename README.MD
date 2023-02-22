<p align="center">
    <a href="https://boticord.top/bot/832944817671634944">
        <img src="https://i.imgur.com/hJBpIdm.png" alt="Mono Logo" width="128" height="128">
    </a>
    <h1 align="center">TeleScript</h1>
</p>

<p align="center">
  <a aria-label="License" href="https://github.com/sadnesszephyr/mono/blob/main/LICENSE">
    <img alt="license" src="https://img.shields.io/github/license/sadnesszephyr/telescript?style=for-the-badge&labelColor=1A1A1A">
  </a>
  <a aria-label="Mono Lounge" href="https://discord.gg/exWW6gGcyw">
    <img alt="" src="https://img.shields.io/badge/Bot%20API-6.3-1d98dc?labelColor=%231A1A1A&logo=telegram&logoColor=%23FFF&style=for-the-badge">
  </a>
</p>

## About

TeleScript is a developer-friendly wrapper for [Telegram Bot API](https://core.telegram.org/bots/api)

## Installation

Using npm:
```sh
npm i telescript
yarn add telescript
pnpm add telescript
```

## Quick Examples

### Ping-Pong
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

### Inline Keyboard
<!-- TODO -->
```ts
...
```