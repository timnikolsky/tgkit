import { PaidMediaType } from '../utils/enums';
import Base from './Base';
import Client from '../client/Client';
import PaidMedia from './PaidMedia';
import Video from './Video';
import { toCamelCase } from '../utils/converters';

export default class PaidMediaVideo extends Base implements PaidMedia {
	/** Type of the paid media */
	type: PaidMediaType.Video;

	/** The video */
	video: Video;

	constructor(client: Client, data: any) {
		super(client);
		this.type = toCamelCase(data.type);
		this.video = new Video(client, data.video);
	}
}
