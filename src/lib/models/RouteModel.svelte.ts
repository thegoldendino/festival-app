import { RouteSchema, RouteViewDefault } from "$lib/schemas/route.schema.js"
import type { Route, RouteView } from "$types"

export default class RouteModel {

	public date = $state<string | null>(null)
	public view = $state<RouteView>(RouteViewDefault)
	public key = $state<string | null>(null)

	navigateTo(hash: string) {
		let params = hash.substring(1).split('/').slice(1) as Route
		while (params.length < 3) {
			params.push(null)
		}
		let route = RouteSchema.parse(params)
		this.date = route[0]
		this.view = route[1] as RouteView
		this.key = route[2]
	}
}
