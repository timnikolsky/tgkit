export default class TelegramBotAPIError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'TelegramBotAPIError';
	}
}
