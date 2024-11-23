import type { LayoutServerLoad } from './$types';
import docsModel from '../../../../../.temp/api-ref.json';

export const prerender = true;

export const load: LayoutServerLoad = async () => {
	return docsModel;
};
