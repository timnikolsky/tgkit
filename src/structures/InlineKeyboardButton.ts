import { InlineKeyboardButtonData, WebAppInfo } from 'typings'

/** Represents one button of an inline keyboard. You must use exactly one of the optional fields. */
export default class InlineKeyboardButton {
    /** Label text on the button */
    text?: string

    /** HTTP or tg:// url to be opened when the button is pressed. Links tg://user?id=<userId> can be used to mention a user by their ID without using a username, if this is allowed by their privacy settings. */
    url?: string

    /** An HTTP URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget. */
    // loginUrl?: LoginUrl

    /** Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes */
    callbackData?: string

    /** Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Available only in private chats between a user and the bot. */
    webApp?: WebAppInfo

    /** If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. Can be empty, in which case just the bot's username will be inserted. */
    switchInlineQuery?: string

    /** If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. Can be empty, in which case only the bot's username will be inserted. */
    switchInlineQueryCurrentChat?: string

    /** Description of the game that will be launched when the user presses the button. */
    // callbackGame?: CallbackGame

    /** Specify True, to send a Pay button. NOTE: This type of button must always be the first button in the first row and can only be used in invoice messages. */
    pay?: boolean

    constructor(data: InlineKeyboardButtonData = {}) {
        this.text = data.text,
        this.url = data.url
        this.callbackData = data.callbackData
        this.webApp = data.webApp
        this.switchInlineQuery = data.switchInlineQuery
        this.switchInlineQueryCurrentChat = data.switchInlineQueryCurrentChat
        this.pay = data.pay
    }

    setText(text: string) {
        this.text = text
        return this
    }

    setUrl(url: string) {
        this.url = url
        return this
    }

    // setLoginUrl(loginUrl: null) {
    //     this.loginUrl = loginUrl
    //     return this
    // }

    setCallbackData(callbackData: string) {
        this.callbackData = callbackData
        return this
    }

    setWebApp(webApp: WebAppInfo) {
        this.webApp = webApp
        return this
    }

    setSwitchInlineQuery(switchInlineQuery: string) {
        this.switchInlineQuery = switchInlineQuery
        return this
    }

    setSwitchInlineQueryCurrentChat(switchInlineQueryCurrentChat: string) {
        this.switchInlineQueryCurrentChat = switchInlineQueryCurrentChat
        return this
    }

    // setCallbackGame(callbackGame: CallbackGame) {
    //     this.callbackGame = callbackGame
    //     return this
    // }

    setPay(pay: boolean) {
        this.pay = pay
        return this
    }

    toJSON() {
        return {
            text: this.text,
            url: this.url,
            // login_url: null,
            callback_data: this.callbackData,
            switch_inline_query: this.switchInlineQuery,
            switch_inline_query_current_chat: this.switchInlineQueryCurrentChat,
            // callback_game: this.callbackGame,
            pay: this.pay,
            web_app: this.webApp
        }
    }
}