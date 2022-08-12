import { EventEmitter } from 'events'
import Chat from 'structures/Chat'
import { ClientEvents, ClientOptions } from 'typings'
import RestManager from '../rest/RestManager'
import EventManager from './Events/EventManager'
import PollingManager from './PollingManager'

export default class Client extends EventEmitter {
    token?: string
    rest: RestManager
    polling: PollingManager
    eventManager: EventManager
    // ws: WebSocketManager

    constructor(options: ClientOptions = {}) {
        super()

        this.token = options.token ?? process.env.TELEGRAM_TOKEN

        this.rest = new RestManager(this)

        this.polling = new PollingManager(this)

        this.eventManager = new EventManager(this)

        // this.ws = new WebSocketManager(this)
    }

    async login(token = this.token) {
        if (!token || typeof token !== 'string') throw new Error('TOKEN_INVALID')

        this.token = token

        // this.ws.createServer('/', 443, '127.0.0.1')
    }


    async getUpdates() {
        return await this.rest.request('getUpdates')
    }


    async getChat(chatId: number | string) {
        const chat = await this.rest.request('getChat', {
            chat_id: chatId
        })
    }

    on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void) {
        // @ts-ignore
        return super.on(event, listener)
    }

    once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void) {
        // @ts-ignore
        return super.once(event, listener)
    }
}