import { KeyboardButtonData, KeyboardButtonPollType, PollType, ReplyKeyboardMarkupData, ReplyKeyboardRemoveData } from 'typings'
import Client from '../client/Client'
import Base from './Base'
import KeyboardButton from './KeyboardButton'
import PhotoSize from './PhotoSize'

/** 
 * Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a button.
*/
export default class ReplyKeyboardRemove {
    /** Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has replyToMessageId), sender of the original message. */
    selective?: boolean

    constructor(data: ReplyKeyboardRemoveData = {}) {
        this.selective = data.selective
    }

    setSelective(selective: boolean) {
        this.selective = selective
        return this
    }

    toJSON() {
        return {
            // This field must always be set to true
            remove_keyboard: true,
            selective: this.selective
        }
    }
}