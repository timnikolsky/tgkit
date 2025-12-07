import { WebhookOptions } from '../types';
import Client from './Client';

export default class WebhookManager {
	client: Client;
	options?: WebhookOptions;

	constructor(client: Client, options?: WebhookOptions) {
		this.client = client;
		this.options = options;
	}
}
