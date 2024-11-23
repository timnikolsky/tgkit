import Client from '../client/Client';
import Base from './Base';
import MessageEntity from './MessageEntity';

export default class TextQuote extends Base {
	/** Text of the quoted part of a message that is replied to by the given message */
	text: string;

	/** Approximate quote position in the original message in UTF-16 code units as specified by the sender */
	position: number;

	/**
	 * Special entities that appear in the quote.
	 * Currently, only bold, italic, underline, strikethrough, spoiler, and customEmoji entities are kept in quotes.
	 */
	entities?: MessageEntity[];

	/**
	 * True, if the quote was chosen manually by the message sender.
	 * Otherwise, the quote was added automatically by the server.
	 */
	isManual?: boolean;

	constructor(client: Client, data: any) {
		super(client);

		this.text = data.text;
		this.position = data.position;
		this.entities = data.entities.map(
			(entityData: any) => new MessageEntity(client, entityData),
		);
		this.isManual = data.is_manual;
	}
}
