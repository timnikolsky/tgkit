import Client from '../client/Client'
import Base from './Base'

/** Represents a phone contact */
export default class Contact extends Base {
    /** Contact's phone number */
    phoneNumber: string

    /** Contact's first name */
    firstName: string

    /** Contact's last name */
    lastName?: string

    /** Contact's user identifier in Telegram */
    userId?: number

    /**
     * Additional data about the contact in the form of a vCard
     * @see {@link https://en.wikipedia.org/wiki/VCard}
     */
    vcard?: string

    
    constructor(client: Client, data: any) {
        super(client)

        this.phoneNumber = data.phoneNumber
        this.firstName = data.first_name
        this.lastName = data.last_name
        this.userId = data.user_id
        this.vcard = data.vcard
    }
}