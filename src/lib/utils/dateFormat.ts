export function shortTime(time: Date, smartMer: boolean = false): string {
	console.log({ smartMer })
	const formatted = time.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
	});

	let [hours, minutes, meridiem] = splitTime(formatted)

	return smartMer &&
		`${hours}:${minutes} ${eitherGtZero(minutes, '', meridiem)}` ||
		`${hours}:${minutes} ${meridiem}`;
}

export function formatShortDay(date: string): string {
	return newDate(date)
		.toLocaleDateString('en-US', { weekday: 'short' });
};

export function formatLongDay(date: Date): string {
	return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const formatDate = (date: string): string => {
	return new Date(Date.parse(`${date}T00:00`))
		.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'numeric',
		});
};

export const timeRange = (date: string, from: string, to: string): string => {
	const fromDate = newDate(date, from);
	const toDate = newDate(date, to);

	const formattedFrom = fromDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
	});
	const formattedTo = toDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
	});

	let [hrFrom, minFrom, _] = splitTime(formattedFrom)
	let [hrTo, minTo, merTo] = splitTime(formattedTo)

	return `${hrFrom}${eitherGtZero(minFrom, ':' + minFrom)} - ${hrTo}${eitherGtZero(minTo, ':' + minTo)} ${merTo}`
}

function eitherGtZero(number: string, either: string = '', or: string = ''): string {
	return parseInt(number) > 0 ? either : or
}

function splitTime(timeString: string): [string, string, string] {
	let [time, meridiem] = timeString.split(' ');
	let [hours, minutes] = time.split(':');

	return [hours, minutes, meridiem];
}

export function newDate(date: string, time?: string): Date {
	return new Date(Date.parse(`${date}T${time || '00:00'}`));
}

