import Client from '../client/Client'
import Base from './Base'
import PhotoSize from './PhotoSize'

/** 
 * Represents a video message 
 * @see {@link https://telegram.org/blog/video-messages-and-telescope}
*/
export default class VideoNote extends Base {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string

	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	fileUniqueId: string

	/** Video width and height (diameter of the video message) as defined by sender */
	length: number

	/** Duration of the video in seconds as defined by sender */
	duration: number

	/** Document thumbnail as defined by sender */
	thumbnail?: PhotoSize
    
	/** File size in bytes */
	fileSize?: number

    
	constructor(client: Client, data: any) {
		super(client)

		this.fileId = data.file_id
		this.fileUniqueId = data.file_unique_id
		this.length = data.length
		this.duration = data.duration
		this.thumbnail = data.thumbnail && new PhotoSize(client, data.thumbnail)
		this.fileSize = data.file_size
	}
}