import path from 'path'
import { Client } from 'discord.js'
import { readJSONSync } from 'fs-extra'

import lol from './games/lol'
import hypixel from './games/hypixel'

const PATH = path.resolve()
const { bot_token : token, hypixel : hypixel_json , lol : lol_json } = readJSONSync(PATH + '/settings.json')
export const client = new Client()

client.on('ready', async () => {
    console.log('[*] Ready')
    
    setInterval(() => {
        if (hypixel_json.enable) hypixel()
        if (lol_json.enable) lol()
    }, 60000)
})

client.on('message', async (msg) => {
    if (msg.content === 'ㅎㅇ') msg.channel.send('d')
})

client.login(token)
