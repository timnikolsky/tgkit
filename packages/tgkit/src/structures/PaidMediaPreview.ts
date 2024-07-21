import { PaidMediaType } from '../utils/enums'
import Base from './Base'
import Client from '../client/Client'
import PaidMedia from './PaidMedia'
import { toCamelCase } from '../utils/converters'

export default class PaidMediaPreview extends Base implements PaidMedia {
	/** Type of the paid media */
	type: PaidMediaType.Preview

	/** Media width as defined by the sender */
	width?: number

	/** Media height as defined by the sender */
	height?: number

	/** Duration of the media in seconds as defined by the sender */
	duration?: number

	constructor(client: Client, data: any) {
		super(client)
		this.type = toCamelCase(data.type)
		this.width = data.width
		this.height = data.height
		this.duration = data.duration
	}
}
