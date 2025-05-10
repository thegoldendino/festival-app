import type { Day } from '$lib/types.js';

export default class DayModel {
	public date!: string;
	public startTime!: Date;
	public endTime!: Date;
	public stageKeys!: string[];
	public artistKeys!: string[];
	public scheduleIncrement!: string | number;
	public location?: string;
	public mapUrl?: string;

	constructor(day: Day) {
		Object.assign(this, day);
	}

	static fromDay(day: Day): DayModel {
		return new DayModel(day);
	}

	scheduleGrid(): string[][] {
		const schedule: string[][] = [];
		const startTime = new Date(this.startTime);
		const endTime = new Date(this.endTime);
		const increment = Number(this.scheduleIncrement);

		for (let time = startTime; time <= endTime; time.setMinutes(time.getMinutes() + increment)) {
			schedule.push([time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })]);
		}

		return schedule;
	}
}