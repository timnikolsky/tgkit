import { CallbackQueryAnswerOptions, ChatType } from 'typings'
import Client from '../client/Client'
import Base from './Base'
import Location from './Location'
import Message from './Message'
import PhotoSize from './PhotoSize'
import User from './User'

/** This object represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present. If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present. Exactly one of the fields data or game_short_name will be present. */
export default class CallbackQuery extends Base {
    /** Unique identifier for this query */
    id: string

    /** Sender */
    from: User

    /** Message with the callback button that originated the query. Note that message content and message date will not be available if the message is too old. */
    message?: Message

    /** Identifier of the message sent via the bot in inline mode, that originated the query. */
    inlineMessageId?: string
    
    /** Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games. */
    chatInstance?: string

    /** Data associated with the callback button. Be aware that a bad client can send arbitrary data in this field. */
    data?: string

    /** Short name of a Game to be returned, serves as the unique identifier for the game */
    gameShortName?: string

    
    constructor(client: Client, data: any) {
        super(client)

        this.id = data.id
        this.from = new User(client, data.from)
        this.message = data.message && new Message(client, data.message)
        this.inlineMessageId = data.inline_message_id
        this.chatInstance = data.chat_instance
        this.data = data.data
        this.gameShortName = data.game_short_name
    }

    async answer(options: CallbackQueryAnswerOptions): Promise<boolean> {
        return await this.client.rest.request('answerCallbackQuery', {
            callback_query_id: this.id,
            text: options.text,
            showAlert: options.showAlert,
            url: options.url,
            cacheTime: options.cacheTime
        })
    }
}