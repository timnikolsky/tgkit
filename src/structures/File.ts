import Client from '../client/Client'
import Base from './Base'

/** Represents a file ready to be downloaded. The file can be downloaded via the link `https://api.telegram.org/file/bot<token>/<file_path>`. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile. */
export default class File extends Base {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string

	/** 
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	fileUniqueId: string

	/** File size in bytes, if known */
	fileSize?: number

	/** File path */
	filePath?: string

	constructor(client: Client, data: any) {
		super(client)

		this.fileId = data.file_id
		this.fileUniqueId = data.fileUniqueId
		this.fileSize = data.file_size
		this.filePath = data.file_path
	}
}