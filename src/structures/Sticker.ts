import Client from '../client/Client'
import Base from './Base'
import File from './File'
import PhotoSize from './PhotoSize'
import { toCamelCase } from '../utils/converters'
import { MaskPosition } from '../../types'
import { StickerType } from '../utils/enums'

export default class Sticker extends Base {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string

	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	fileUniqueId: string

	/** Type of the sticker. The type of the sticker is independent from its format, which is determined by the fields `isAnimated` and `isVideo`. */
	type: StickerType

	/** Sticker width */
	width: number

	/** Sticker height */
	height: number

	/** *true*, if the sticker is animated */
	isAnimated: boolean

	/** *true*, if the sticker is a video */
	isVideo: boolean

	/** Sticker thumbnail in the .WEBP or .JPG format */
	thumbnail?: PhotoSize

	/** Emoji associated with the sticker */
	emoji?: string

	/** Name of the sticker set to which the sticker belongs */
	setName?: string

	/** For premium regular stickers, premium animation for the sticker */
	premiumAnimation?: File

	/** For mask stickers, the position where the mask should be placed */
	maskPosition?: MaskPosition

	/** For custom emoji stickers, unique identifier of the custom emoji */
	customEmojiId?: string

	/**
	 * If the sticker must be repainted to a text color in messages,
	 * the color of the Telegram Premium badge in emoji status
	 * white color on chat photos, or another appropriate color in other places
	 */
	needsRepainting?: boolean

	/** File size in bytes */
	fileSize?: number

	constructor(client: Client, data: any) {
		super(client)

		this.fileId = data.file_id
		this.fileUniqueId = data.file_unique_id
		this.type = data.type && toCamelCase(data.type)
		this.width = data.width
		this.height = data.height
		this.isAnimated = data.is_animated
		this.isVideo = data.is_video
		this.thumbnail = data.thumbnail && new PhotoSize(client, data.thumbnail)
		this.emoji = data.emoji
		this.setName = data.set_name
		this.premiumAnimation = data.premium_animation && new File(client, data.premium_animation)
		this.maskPosition = data.mask_position && {
			point: data.mask_position.point,
			xShift: data.mask_position.x_shift,
			yShift: data.mask_position.y_shift,
			scale: data.mask_position.scale
		}
		this.customEmojiId = data.custom_emoji_id
		this.needsRepainting = data.needs_repainting
		this.fileSize = data.file_size
	}
}