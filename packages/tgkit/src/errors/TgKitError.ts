export default class TelegramBotAPIError extends Error {
	params?: Record<string, any>;

	constructor(message: string, params?: Record<string, any>) {
		super(message);
		this.name = 'TelegramBotAPIError';
		this.params = params;
	}
}

