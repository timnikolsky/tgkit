import Client from '../client/Client';

export default class Base {
    client: Client

    constructor(client: Client) {
        this.client = client
    }
}