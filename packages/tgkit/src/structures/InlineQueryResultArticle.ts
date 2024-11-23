import Client from '../client/Client';
import { InlineQueryResultArticleOptions, InputMessageContent } from '../types';
import { InlineQueryResultType } from '../utils/enums';
import InlineKeyboardMarkup from './InlineKeyboardMarkup';
import InlineQueryResult from './InlineQueryResult';

/** Represents a link to an article or web page. */
export default class InlineQueryResultArticle extends InlineQueryResult {
	/** Title of the result */
	title: string;

	/** Content of the message to be sent */
	inputMessageContent: InputMessageContent;

	/** Inline keyboard attached to the message */
	replyMarkup?: InlineKeyboardMarkup;

	/** URL of the result */
	url?: string;

	/** Pass *true* if you don't want the URL to be shown in the message */
	hideUrl?: boolean;

	/** Short description of the result */
	description?: string;

	/** Url of the thumbnail for the result */
	thumbnailUrl?: string;

	/** Thumbnail width */
	thumbnailWidth?: number;

	/** Thumbnail height */
	thumbnailHeight?: number;

	constructor(client: Client, id: string, options: InlineQueryResultArticleOptions) {
		super(client, InlineQueryResultType.Article, id);

		this.title = options.title;
		this.inputMessageContent = options.inputMessageContent;
		this.replyMarkup = options.replyMarkup;
		this.hideUrl = options.hideUrl;
		this.description = options.description;
		this.thumbnailUrl = options.thumbnailUrl;
		this.thumbnailWidth = options.thumbnailWidth;
		this.thumbnailHeight = options.thumbnailHeight;
	}

	toJSON(): object {
		return {
			title: this.title,
			input_message_content: {
				message_text:
					'messageText' in this.inputMessageContent
						? this.inputMessageContent.messageText
						: undefined,
				parse_mode:
					'parseMode' in this.inputMessageContent
						? (this.inputMessageContent.parseMode ??
							this.client.options.defaultParseMode)
						: undefined,
				entity:
					'entities' in this.inputMessageContent
						? this.inputMessageContent.entities?.map((e) => e.toJSON())
						: undefined,
				disable_web_page_preview:
					'disableWebPagePreview' in this.inputMessageContent
						? this.inputMessageContent.disableWebPagePreview
						: undefined,
			},
			reply_markup: this.replyMarkup?.toJSON(),
			hide_url: this.hideUrl,
			description: this.description,
			thumbnail_url: this.thumbnailUrl,
			thumbnail_width: this.thumbnailWidth,
			thumbnail_height: this.thumbnailHeight,
		};
	}
}
