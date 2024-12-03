import type { Snippet } from "svelte"

export default class RouteModel {
	#definedRoutes: Array<{ path: string, view: Snippet }> = [];
	#currentHash: string = $state('');
	view: Snippet | undefined = $derived(
		(this.#currentHash && this.#definedRoutes.find((definedRoute) =>
			definedRoute.path && this.matchPath(definedRoute.path, this.#currentHash)
		) || {}).view);
	params = $derived.by(() => {
		const parts = this.#currentHash.substring(1).split('/').slice(1);
		const date = parts[0];
		const view = parts[1];
		const key = parts[2];
		return { date, view, key };
	});

	defineRoute(path: string, view: Snippet) {
		this.#definedRoutes = [...this.#definedRoutes, { path, view }]
	}

	set currentHash(hash: string) {
		this.#currentHash = hash && hash.length > 0 ? hash : '#/';
	}

	matchPath(pathExpression: string, testPath: string): boolean {
		// Convert the path expression into a regular expression
		const regex = new RegExp(
			"^#" +
			pathExpression
				.split("/") // Split the expression by "/"
				.map((segment) =>
					segment.startsWith(":") ? "[^/]+" : segment // Replace :params with a wildcard
				)
				.join("/") + // Join the segments back with "/"
			"$"
		);

		// Test the path against the generated regex
		return regex.test(testPath);
	}
}
