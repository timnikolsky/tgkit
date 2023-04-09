import Client from '../client/Client'
import Base from './Base'

/** Represents one size of a photo or a file / sticker thumbnail */
export default class PhotoSize extends Base {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string

	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	fileUniqueId: string

	/** Photo width */
	width: number

	/** Photo height */
	height: number

	/** File size in bytes */
	fileSize?: number

	constructor(client: Client, data: any) {
		super(client)

		this.fileId = data.file_id
		this.fileUniqueId = data.file_unique_id
		this.width = data.width
		this.height = data.height
		this.fileSize = data.file_size
	}
}