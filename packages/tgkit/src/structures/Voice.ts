import Client from '../client/Client'
import Base from './Base'

/** Represents a voice note */
export default class Voice extends Base {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string

	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	fileUniqueId: string

	/** Duration of the audio in seconds as defined by sender */
	duration: number

	/** Document thumbnail as defined by sender */
	mimeType?: string
    
	/** File size in bytes */
	fileSize?: number

    
	constructor(client: Client, data: any) {
		super(client)

		this.fileId = data.file_id
		this.fileUniqueId = data.file_unique_id
		this.duration = data.duration
		this.mimeType = data.mime_type
		this.fileSize = data.file_size
	}
}