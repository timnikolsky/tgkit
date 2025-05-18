import { apiRef } from '../apiRef.js';

export default {
	paths() {
		return apiRef.children?.map((node) => ({
			params: { node: node.name },
		}));
	},
};
