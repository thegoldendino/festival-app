import type { Stage, Day } from '$types';

export default class MapModel {
	private transform = $state({ scale: 1, translation: { x: 0, y: 0 } });

	public stages = [] as Stage[];
	public imageUrl: string | undefined;
	public width: number;
	public height: number;

	public contentTransform = $derived(
		`translate(${this.transform.translation.x}px, ${this.transform.translation.y}px) scale(${this.transform.scale})`
	);

	public stageTransform = $derived(
		`scale(${1 / this.transform.scale})`
	);

	constructor({ stages, mapImageUrl, mapImageSize }: Day) {
		this.stages = stages;
		this.imageUrl = mapImageUrl;
		this.width = mapImageSize ? mapImageSize[0] : 0;
		this.height = mapImageSize ? mapImageSize[1] : 0;
	}

	public ontransform({ scale, translation }: { scale: number; translation: { x: number; y: number } }) {
		this.transform = { scale, translation };
	}
}