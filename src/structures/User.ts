import Client from '../client/Client';
import Base from './Base';

export default class User extends Base {
    /** Unique identifier for this user or bot */
    id: number

    /** True, if this user is a bot */
    isBot: boolean

    /** User's or bot's first name */
    firstName: string

    /** User's or bot's last name */
    lastName?: string

    /** User's or bot's username */
    username?: string

    /**
     * IETF language tag of the user's language
     * @see {@link https://en.wikipedia.org/wiki/IETF_language_tag}
     * */
    languageCode?: string

    /** True, if this user is a Telegram Premium user */
    isPremium?: boolean

    /** True, if this user added the bot to the attachment menu */
    addedToAttachmentMenu?: boolean

    constructor(client: Client, data: any) {
        super(client)

        this.id = data.id
        this.isBot = data.is_bot
        this.firstName = data.first_name
        this.lastName = data.last_name
        this.username = data.username
        this.languageCode = data.language_code
        this.isPremium = data.is_premium
        this.addedToAttachmentMenu = data.added_to_attachment_menu
    }

    toString() {
        return '@' + this.username
    }
}