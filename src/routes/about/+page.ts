import type {PageLoad} from "./$types"

export const load: PageLoad =  async () => {

	const readme = await import(`../../../README.md`);
	
	return {
		content: readme.default,
	};
}