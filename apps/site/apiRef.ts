import type { ProjectReflection } from 'typedoc';

import apiRefJson from '../../.temp/api-ref.json';

export const apiRef = apiRefJson as unknown as ProjectReflection;
