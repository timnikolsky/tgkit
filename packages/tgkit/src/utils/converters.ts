export function toCamelCase<T>(str: T) {
	if (typeof str !== 'string') {
		return str;
	}

	return str
		.toLowerCase()
		.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', ''));
}

export function toSnakeCase<T>(str: T) {
	if (typeof str !== 'string') {
		return str;
	}

	return str
		.split(/(?=[A-Z])/)
		.join('_')
		.toLowerCase();
}

export function dateToUnix(date: Date) {
	return Math.floor(date.getTime() / 1000);
}

export function unixToDate(unix: number) {
	return new Date(unix * 1000);
}
