import { InlineQueryResultType } from '../utils/enums'

/** 
 * Represents one result of an inline query.
 * 
 * **Note:** All URLs passed in inline query results will be available to end users and therefore must be assumed to be **public**.
 */
export default class InlineQueryResult {
	/** Type of the result */
	type: InlineQueryResultType

	/** Unique identifier for this result, 1-64 bytes */
	id: string

	constructor(type: InlineQueryResultType, id: string) {
		this.type = type
		this.id = id
	}

	toJSON(): object {
		return {}
	}
}