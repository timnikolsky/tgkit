import Message from 'structures/Message'
import MessageEntity from 'structures/MessageEntity'
import ReplyKeyboardMarkup from 'structures/ReplyKeyboardMarkup'
import ReplyKeyboardRemove from 'structures/ReplyKeyboardRemove'
import InlineKeyboardButton from 'structures/InlineKeyboardButton'
import InlineKeyboardMarkup from 'structures/InlineKeyboardMarkup'
import CallbackQuery from 'structures/CallbackQuery'

export type ChatType = 'private' | 'group' | 'supergroup' | 'channel'

export type MessageEntityType = 
    | 'mention'
    | 'hashtag'
    | 'cashtag' 
    | 'botCommand' 
    | 'url'
    | 'email'
    | 'phoneNumber'
    | 'bold' 
    | 'italic'
    | 'underline'
    | 'strikethrough'
    | 'spoiler'
    | 'code'
    | 'pre'
    | 'textMention'

export type DiceEmoji =
    | '🎲'
    | '🎯'
    | '🎳'
    | '🏀'
    | '⚽'
    | '🎰'

export type PollType = 'regular' | 'quiz'

export type KeyboardButtonPollType = 'quiz' | 'regular'

export interface ClientOptions {
    token?: string,
    polling?: PollingOptions
}

export interface PollingOptions {
    limit: number
    timeout: number
}

export interface ChatPhoto {
    smallFileId: string
    smallFileUniqueId: string
    bigFileId: string
    bigFileUniqueId: string
}

export interface ChatPermissions {
    /** True, if the user is allowed to send text messages, contacts, locations and venues */
    canSendMessages?: boolean
    /** True, if the user is allowed to send audios, documents, photos, videos, video notes and voice notes, implies canSendMessages */
    canSendMediaMessages?: boolean
    /** True, if the user is allowed to send polls, implies canSendMessages */
    canSendPolls?: boolean
    /** True, if the user is allowed to send animations, games, stickers and use inline bots, implies canSendMediaMessages */
    canSendOtherMessages?: boolean
    /** True, if the user is allowed to add web page previews to their messages, implies canSendMediaMessages */
    canAddWebPagePreviews?: boolean
    /** True, if the user is allowed to change the chat title, photo and other settings. Ignored in public supergroups */
    canChangeInfo?: boolean
    /** True, if the user is allowed to invite new users to the chat */
    canInviteUsers?: boolean
    /** True, if the user is allowed to pin messages. Ignored in public supergroups */
    canPinMessages?: boolean
}

export interface TextMessageSendOptions {
    /**
     * Mode for parsing entities in the document caption.
     * @see {@link https://core.telegram.org/bots/api#formatting-options}
     * */
    parseMode?: 'Markdown' | 'MarkdownV2' | 'HTML',
    /** List of special entities that appear in message text, which can be specified instead of parse_mode */
    entities?: MessageEntity[],
    /** Disables link previews for links in this message */
    disableWebPagePreview?: boolean,
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean,
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean,
    /** If the message is a reply, ID of the original message */
    replyToMessageId?: number,
    /** Pass true, if the message should be sent even if the specified replied-to message is not found */
    allowSendingWithoutReply?: boolean,
    /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
    replyMarkup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        // | ForceReply
}

export interface WebAppInfo {
    /** An HTTPS URL of a Web App to be opened with additional data */
    url: string
}

export interface ClientEvents {
    raw: [data: any]
    ready: [client: Client]
    messageCreate: [message: Message]
    messageEdit: [message: Message]
    channelPostCreate: [message: Message]
    channelPostEdit: [message: Message]
    inlineQuery: []
    chosenInlineResult: []
    callbackQuery: [callbackQuery: CallbackQuery]
    shippingQuery: []
    preCheckoutQuery: []
    poll: []
    pollAnswer: []
    chatMeUpdate: [],
    chatMemberUpdate: [],
    chatJoinRequest: []
}

export interface KeyboardButtonData {
    text?: string,
    requestContact?: boolean,
    requestLocation?: boolean,
    requestPoll?: KeyboardButtonPollType,
    webApp?: WebAppInfo
}

export interface ReplyKeyboardMarkupData {
    keyboard?: KeyboardButton[][],
    resizeKeyboard?: boolean,
    oneTimeKeyboard?: boolean,
    inputFieldPlaceholder?: string,
    selective?: boolean
}

export interface ReplyKeyboardRemoveData {
    selective?: boolean
}

export interface CallbackQueryAnswerOptions {
    /** Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters */
    text?: string,
    /** If true, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false. */
    showAlert?: boolean,
    /**
     * URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @Botfather, specify the URL that opens your game — note that this will only work if the query comes from a callback_game button.
     * Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter.
     */
    url?: string
    /** The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram apps will support caching starting in version 3.14. Defaults to 0. */
    cacheTime?: number
}

export interface InlineKeyboardMarkupData {
    inlineKeyboard?: InlineKeyboardButton[][]
}

export interface InlineKeyboardButtonData {
    text?: string,
    url?: string,
    // loginUrl?: LoginUrl,
    callbackData?: string,
    webApp?: WebAppInfo,
    switchInlineQuery?: string,
    switchInlineQueryCurrentChat?: string,
    // callbackGame?: CallbackGame,
    pay?: boolean
}