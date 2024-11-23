import Client from '../client/Client';
import Base from './Base';
import PhotoSize from './PhotoSize';
import { toCamelCase } from '../utils/converters';
import Sticker from './Sticker';
import { StickerType } from '../utils/enums';

/** Represents a sticker set. */
export default class StickerSet extends Base {
	/** Sticker set name */
	name: string;

	/** Sticker set title */
	title: string;

	/** Type of stickers in the set */
	type: StickerType;

	/** *true*, if the sticker set contains animated stickers */
	isAnimated: boolean;

	/** *true*, if the sticker set contains video stickers */
	isVideo: boolean;

	/** List of all set stickers */
	stickers: Sticker[];

	/** Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format */
	thumbnail?: PhotoSize;

	constructor(client: Client, data: any) {
		super(client);

		this.name = data.name;
		this.title = data.title;
		this.type = data.type && toCamelCase(data.type);
		this.isAnimated = data.is_animated;
		this.isVideo = data.is_video;
		this.stickers =
			data.stickers && data.stickers.map((sticker: any) => new Sticker(client, sticker));
		this.thumbnail = data.thumbnail && new PhotoSize(client, data.thumbnail);
	}
}
