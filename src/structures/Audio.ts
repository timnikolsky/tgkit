import Client from '../client/Client'
import Base from './Base'
import PhotoSize from './PhotoSize'

/** Represents an audio file to be treated as music by the Telegram clients */
export default class Audio extends Base {
    /** Identifier for this file, which can be used to download or reuse the file */
    fileId: string

    /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
    fileUniqueId: string

    /** Duration of the video in seconds as defined by sender */
    duration: number

    /** Performer of the audio as defined by sender or by audio tags */
    performer?: string

    /** Title of the audio as defined by sender or by audio tags */
    title?: string
    
    /** Original filename as defined by sender */
    fileName?: string
    
    /** MIME type of the file as defined by sender */
    mimeType?: string
    
    /** File size in bytes */
    fileSize?: number

    /** Thumbnail of the album cover to which the music file belongs */
    thumb?: PhotoSize
    
    constructor(client: Client, data: any) {
        super(client)

        this.fileId = data.file_id
        this.fileUniqueId = data.file_unique_id
        this.duration = data.duration
        this.performer = data.performer
        this.title = data.title
        this.fileName = data.file_name
        this.mimeType = data.mime_type
        this.fileSize = data.file_size
        this.thumb = data.thumb && new PhotoSize(client, data.thumb)
    }
}