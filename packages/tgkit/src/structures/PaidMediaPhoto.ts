import { PaidMediaType } from '../utils/enums'
import Base from './Base'
import Client from '../client/Client'
import PaidMedia from './PaidMedia'
import { toCamelCase } from '../utils/converters'
import PhotoSize from '../structures/PhotoSize'

export default class PaidMediaPhoto extends Base implements PaidMedia {
	/** Type of the paid media */
	type: PaidMediaType.Photo

	/** The photo */
	photo: PhotoSize[]

	constructor(client: Client, data: any) {
		super(client)
		this.type = toCamelCase(data.type)
		this.photo = data.photo.map(
			(photoSizeData: any) => new PhotoSize(client, photoSizeData)
		)
	}
}
