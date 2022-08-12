import Client from 'client/Client';
import Base from './Base';
import Chat from './Chat';
import MessageEntity from './MessageEntity';
import User from './User';
import Audio from './Audio';
import Document from './Document';
import PhotoSize from './PhotoSize';
import Video from './Video';
import VideoNote from './VideoNote';
import Voice from './Voice';
import Contact from './Contact';
import Dice from './Dice';
import Poll from './Poll';
import Venue from './Venue';
import InlineKeyboardMarkup from './InlineKeyboardMarkup';
import Location from './Location';
import InlineKeyboardButton from './InlineKeyboardButton';

/** Represents a message */
export default class Message extends Base {
    id: number
    author?: User
    senderChat?: Chat
    date: Date
    chat: Chat
    forwardFrom?: User
    forwardFromChat?: Chat
    forwardFromMessageId?: number
    forwardSignature?: string
    forwardSenderName?: string
    forwardDate?: Date
    isAutomaticForward?: Boolean
    replyToMessage?: Message
    viaBot?: User
    editDate?: Date
    hasProtectedContent: Boolean
    mediaGroupId?: string
    authorSignature?: string
    text?: string
    entities?: MessageEntity[]
    // animation?: Animation
    audio?: Audio
    document?: Document
    photo?: PhotoSize[]
    // sticker?: Sticker,
    video?: Video
    videoNote?: VideoNote
    voice?: Voice
    caption?: string
    captionEntities?: MessageEntity[]
    contact?: Contact
    dice?: Dice
    // game?: Game
    poll?: Poll
    venue?: Venue
    location?: Location
    pinnedMessage?: Message
    // invoice?: Invoice
    // sucessfulPayment?: SucessfulPayment
    connectedWebsite?: string
    // passportData?: PassportData
    replyMarkup?: InlineKeyboardMarkup 

    constructor(client: Client, data: any) {
        super(client)

        this.id = data.message_id
        this.author = new User(client, data.from)
        this.senderChat = data.sender_chat && new Chat(client, data.sender_chat)
        this.date = new Date(data.date * 1000)
        this.chat = new Chat(client, data.chat)
        this.forwardFrom = data.forward_from && new User(client, data.forward_from)
        this.forwardFromChat = data.forward_from_chat && new Chat(client, data.forward_from_chat)
        this.forwardFromMessageId = data.forward_from_message_id
        this.forwardSignature = data.forward_signature
        this.forwardSenderName = data.forward_sender_name
        this.forwardDate = new Date(data.forward_date * 1000)
        this.isAutomaticForward = data.is_automatic_forward
        this.replyToMessage = data.reply_to_message && new Message(client, data.reply_to_message)
        this.viaBot = data.via_bot && new User(client, data.via_bot)
        this.editDate = new Date(data.edit_date * 1000)
        this.hasProtectedContent = data.has_protected_content
        this.mediaGroupId = data.media_group_id
        this.authorSignature = data.author_signature
        this.text = data.text
        this.entities = data.entities && data.entities.map((entityData: any) => new MessageEntity(this.client, entityData))
        // animation
        this.audio = data.audio && new Audio(this.client, data.audio)
        this.document = data.document && new Document(this.client, data.document)
        this.photo = data.photo && data.photo.map((photoData: any) => new PhotoSize(this.client, photoData))
        // sticker
        this.video = data.video && new Video(this.client, data.video)
        this.videoNote = data.video_note && new VideoNote(this.client, data.video_note)
        this.voice = data.voice && new Voice(this.client, data.voice)
        this.caption = data.caption
        this.captionEntities = data.caption_entities && data.caption_entities.map((entityData: any) => new MessageEntity(this.client, entityData))
        this.contact = data.contact && new Contact(this.client, data.contact)
        this.dice = data.dice && new Dice(this.client, data.dice)
        this.venue = data.venue && new Venue(this.client, data.venue)
        this.location = data.location && new Location(this.client, data.location)
        this.pinnedMessage = data.pinned_message && new Message(this.client, data.pinned_message)
        this.connectedWebsite = data.connected_website
        this.replyMarkup = data.reply_markup && new InlineKeyboardMarkup(data.reply_markup)
    }

    async forward(chatId: number | string) {
        await this.client.rest.request('forwardMessage', {
            chat_id: chatId,
            from_chat_id: this.chat.id,
            message_id: this.id
        })
    }
}