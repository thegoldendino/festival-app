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

	timeFor(idx: number): Date {
		const start = new Date(this.startTime);
		start.setMinutes(start.getMinutes() + idx * Number(this.scheduleIncrement));
		return start
	}

	activeFor(idx: number): boolean {
		const start = new Date(this.startTime);
		start.setMinutes(start.getMinutes() + idx * Number(this.scheduleIncrement));
		const end = new Date(this.startTime);
		end.setMinutes(end.getMinutes() + (idx + 1) * Number(this.scheduleIncrement));
		const now = new Date();
		return now >= start && now < end;
	}

	get scheduleGrid(): string[][] {
		const schedule: string[][] = [];
		const startTime = new Date(this.startTime);
		const endTime = new Date(this.endTime);
		const increment = Number(this.scheduleIncrement);

		for (let time = startTime; time < endTime; time.setMinutes(time.getMinutes() + increment)) {
			const timeSlot = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			schedule.push([timeSlot,]);
		}

		return schedule;
	}
}