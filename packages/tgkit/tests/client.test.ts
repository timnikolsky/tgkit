import { describe, expect, test } from 'vitest';
import { Client } from '../src';

describe('client', () => {
	test('initialize client', () => {
		const client = new Client();
		expect(client).toBeDefined();
	});
});
