import Client from 'client/Client'
import Base from './Base'
import { PaidMediaType } from 'utils/enums'
import { toCamelCase } from 'utils/converters'
import PaidMediaPhoto from '../structures/PaidMediaPhoto'
import PaidMediaVideo from '../structures/PaidMediaVideo'
import PaidMediaPreview from '../structures/PaidMediaPreview'

export default abstract class PaidMedia extends Base {
	/** Type of the paid media */
	abstract type: PaidMediaType

	static from(client: Client, data: any) {
		const type = toCamelCase(data.type)

		if (type === PaidMediaType.Photo) {
			return new PaidMediaPhoto(client, data)
		}
		else if (type === PaidMediaType.Preview) {
			return new PaidMediaPreview(client, data)
		}
		else if (type === PaidMediaType.Video) {
			return new PaidMediaVideo(client, data)
		}
	}
}