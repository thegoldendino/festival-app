import type { Stage, Artist, Day } from '$types';

export default class MapModel {
	public transform = $state({ scale: 1, translation: { x: 0, y: 0 } });
	public stages = [] as Stage[];
	public imageUrl: string | undefined;
	public width: number;
	public height: number;

	constructor({ stages, mapImageUrl, mapImageSize }: Day) {
		this.stages = stages;
		this.imageUrl = mapImageUrl;
		this.width = mapImageSize ? mapImageSize[0] : 0;
		this.height = mapImageSize ? mapImageSize[1] : 0;
	}
}