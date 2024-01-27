import Client from '../client/Client'
import Base from './Base'
import PhotoSize from './PhotoSize'

/** Represents a video file */
export default class Video extends Base {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string

	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	fileUniqueId: string

	/** Video width as defined by sender */
	width: number

	/** Video height as defined by sender */
	height: number

	/** Duration of the video in seconds as defined by sender */
	duration?: number
    
	/** Video thumbnail */
	thumbnail?: PhotoSize

	/** Original filename as defined by sender */
	fileName?: string
    
	/** MIME type of the file as defined by sender */
	mimeType?: string
    
	/** File size in bytes */
	fileSize?: number
    
	constructor(client: Client, data: any) {
		super(client)

		this.fileId = data.file_id
		this.fileUniqueId = data.file_unique_id
		this.width = data.width
		this.height = data.height
		this.duration = data.duration
		this.thumbnail = data.thumbnail && new PhotoSize(client, data.thumbnail)
		this.fileName = data.file_name
		this.mimeType = data.mime_type
		this.fileSize = data.file_size
	}
}