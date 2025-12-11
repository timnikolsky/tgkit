import { MethodParams } from 'types';
import Client from '../client/Client';
import TelegramBotAPIError from '../errors/TgKitError';

export default class RestManager {
	client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	async request(method: string, params?: MethodParams): Promise<any> {
		const formData = objectToFormData(params);
		const res = await fetch(`https://api.telegram.org/bot${this.client.token}/${method}`, {
			method: 'POST',
			body: formData,
		});
		const data = await res.json();

		if (!data.ok) {
			throw new TelegramBotAPIError(data.description, params);
		}

		return data.result;
	}
}

function objectToFormData(obj: Record<string, any> | undefined): FormData | undefined {
	if (obj === undefined) return undefined;

	const formData = new FormData();

	const appendValue = (key: string, value: any) => {
		if (value instanceof Blob) {
			formData.append(key, value);
		} else if (value instanceof Buffer) {
			formData.append(key, new Blob([new Uint8Array(value)]));
		} else if (Array.isArray(value)) {
			value.forEach((v) => appendValue(key + '[]', v));
		} else if (typeof value === 'object' && value !== null) {
			formData.append(key, JSON.stringify(value));
		} else if (value !== undefined && value !== null) {
			formData.append(key, String(value));
		}
	};

	for (const key in obj) {
		if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
		appendValue(key, obj[key]);
	}

	return formData;
}
