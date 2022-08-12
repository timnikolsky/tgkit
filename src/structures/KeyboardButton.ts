import { KeyboardButtonData, KeyboardButtonPollType, PollType, WebAppInfo } from 'typings'
import Client from '../client/Client'
import Base from './Base'
import PhotoSize from './PhotoSize'

/** Represents one button of the reply keyboard. For simple text buttons String can be used instead of this object to specify text of the button. Optional fields request_contact, request_location, and request_poll are mutually exclusive. */
export default class KeyboardButton {
    /** Text of the button. If none of the optional fields are used, it will be sent as a message when the button is pressed */
    text?: string

    /** If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only. */
    requestContact?: boolean

    /** If True, the user's current location will be sent when the button is pressed. Available in private chats only */
    requestLocation?: boolean

    /** If specified, the user will be asked to create a poll and send it to the bot when the button is pressed. Available in private chats only */
    requestPoll?: KeyboardButtonPollType

    /** If specified, the described Web App will be launched when the button is pressed. Available in private chats only. */
    webApp?: WebAppInfo

    constructor(data: KeyboardButtonData = {}) {
        this.text = data.text,
        this.requestContact = data.requestContact
        this.requestLocation = data.requestLocation
        this.requestPoll = data.requestPoll
        this.webApp = data.webApp
    }

    setText(text: string) {
        this.text = text
        return this
    }

    setRequestContact(requestContact: boolean) {
        this.requestContact = requestContact
        return this
    }

    setRequestLocation(requestLocation: boolean) {
        this.requestLocation = requestLocation
        return this
    }

    setRequestPoll(requestPoll: KeyboardButtonPollType) {
        this.requestPoll = requestPoll
        return this
    }

    setWebApp(webApp: WebAppInfo) {
        this.webApp = webApp
        return this
    }

    toJSON() {
        return {
            text: this.text,
            request_contact: this.requestContact,
            request_location: this.requestLocation,
            request_poll: this.requestPoll
        }
    }
}