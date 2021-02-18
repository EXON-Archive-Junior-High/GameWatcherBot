import path from 'path'
import fetch from 'node-fetch'
import { readJSONSync } from 'fs-extra'
import sendMsg from '../util/sendMsg'
import { client } from '..'
import { MessageEmbed } from 'discord.js'

const PATH = path.resolve()

const { hypixel, channel_id } = readJSONSync(PATH + '/settings.json')

export default async function main() {
    const url = 'https://api.hypixel.net/status?key=' + hypixel.key + '&uuid=' + hypixel.player_uuid
    const body = await (await fetch(url)).json()
    const profile_url = 'https://sessionserver.mojang.com/session/minecraft/profile/' + hypixel.player_uuid
    const { name } = await (await fetch(profile_url)).json()
    const skin_url = 'https://crafatar.com/avatars/' + hypixel.player_uuid

    if (body.session.online) {
        sendMsg(new MessageEmbed({
            title: name,
            author: {
                name: 'Hypixel',
                icon_url: 'https://avatars.githubusercontent.com/u/3840546?s=280&v=4'
            },
            thumbnail: {
                url: 'https://crafatar.com/avatars/' + hypixel.player_uuid,
            },
            color: 0xffffff,
            fields: [
                {
                    name: 'Hypixel 실행 중',
                    value: bold(body.session.gameType) + ' 에서 ' + bold(body.session.mode) + ' 하는 중'
                }
            ],
            timestamp: new Date(),
        }), client, channel_id)
    }
    else console.log('[hypixel] offline')
}

const bold = (str: string) => { return '**' + str + '**' } 