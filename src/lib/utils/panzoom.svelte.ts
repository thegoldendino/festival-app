import type { Action } from 'svelte/action';

export interface Point {
	x: number;
	y: number;
}

interface TrackedPoint {
	point: Point;
	t: number; // time
}

interface Velocity {
	vx: number;
	vy: number;
	ts: number;
}

const MIN_VELOCITY = 0.02;
const TRACKED_DURATION = 120;

// Some basic 2D geometry
const distance = (p1: Point, p2: Point) => Math.hypot(p1.x - p2.x, p1.y - p2.y);
const midpoint = (p1: Point, p2: Point) => ({ x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 });
const subtract = (p1: Point, p2: Point) => ({ x: p1.x - p2.x, y: p1.y - p2.y });

export interface Options {
	maxZoom?: number;
	friction?: number;
	scale?: number;
}

export const panzoom: Action<HTMLElement, Options | undefined> = (node, data = {}) => {
	const rAF = requestAnimationFrame;
	let maxZoom = data.maxZoom ?? 16;
	let minScale = 0;
	let scale = data.scale ?? 1.0;
	let friction = data.friction ?? 0.97;
	let translation = { x: 0, y: 0 };
	let velocity: Velocity = { vx: 0, vy: 0, ts: 0 };
	let frame = 0;

	const pointers = new Map<number, Point>();
	const tracked: TrackedPoint[] = [];

	const content = node.firstElementChild as HTMLElement;
	if (!content) {
		throw new Error("Node must have at least one child element to apply panzoom.");
	}

	const mapPins = content.querySelectorAll(".map-pin") as NodeListOf<HTMLElement>;

	function updateTransform() {
		let offsetX = (content.clientWidth * (1 - scale) / 2);
		let offsetY = (content.clientHeight * (1 - scale) / 2);


		//clamp translation to avoid over-scrolling left side
		if (translation.x + offsetX > 0) {
			translation.x = - offsetX;
		}

		//clamp translation to avoid over-scrolling top side
		if (translation.y + offsetY > 0) {
			translation.y = - offsetY;
		}

		//clamp translation to avoid over-scrolling right side
		if (translation.x + offsetX < node.clientWidth - content.clientWidth * scale) {
			translation.x = node.clientWidth - content.clientWidth * scale - offsetX;
		}

		//can not zoom out more than the original size
		if (scale < minScale) {
			scale = minScale;
		}

		// keep map pin sizes proportional to the viewport
		mapPins.forEach((pin: HTMLElement) => {
			pin.style.transform = `scale(${1 / scale})`;
		});

		content.style.transform = `translate(${translation.x}px, ${translation.y}px) scale(${scale})`;
	}

	function track(point: Point) {
		const t = performance.now();
		prune(t);
		tracked.push({ point, t });
	}

	function prune(t: number) {
		while (tracked.length && t - tracked[0].t > TRACKED_DURATION) {
			tracked.shift();
		}
	}

	function stopMovement() {
		if (frame) {
			cancelAnimationFrame(frame);
			frame = 0;
		}
		velocity.vx = 0;
		velocity.vy = 0;
		tracked.length = 0;
	}

	function onpointerdown(event: PointerEvent) {
		event.stopPropagation();
		node.setPointerCapture(event.pointerId);
		pointers.set(event.pointerId, pointFromEvent(event));
		stopMovement();
	}

	function onpointerup(event: PointerEvent) {
		event.stopPropagation();
		node.releasePointerCapture(event.pointerId);
		pointers.delete(event.pointerId);

		if (pointers.size === 0) {
			prune(performance.now());
			if (tracked.length > 1) {
				const oldest = tracked[0];
				const latest = tracked[tracked.length - 1];
				const x = latest.point.x - oldest.point.x;
				const y = latest.point.y - oldest.point.y;
				const t = latest.t - oldest.t;
				velocity = {
					vx: x / t,
					vy: y / t,
					ts: performance.now(),
				};
				scheduleRender();
			}
		}
	}

	function onpointermove(event: PointerEvent) {
		event.stopPropagation();
		if (!pointers.has(event.pointerId)) return;


		const point = pointFromEvent(event);
		switch (pointers.size) {
			case 1: {
				const curr = point;
				track(curr);
				const prev = pointers.get(event.pointerId)!;
				const diff = subtract(curr, prev);
				translation.x += diff.x;
				translation.y += diff.y;
				updateTransform();
				pointers.set(event.pointerId, point);
				break;
			}
			case 2: {
				let points = [...pointers.values()];
				let p1 = points[0];
				let p2 = points[1];
				const prevMiddle = midpoint(p1, p2);
				const prevDist = distance(p1, p2);

				pointers.set(event.pointerId, point);
				points = [...pointers.values()];
				p1 = points[0];
				p2 = points[1];
				const middle = midpoint(p1, p2);
				const dist = distance(p1, p2);

				const diff = subtract(middle, prevMiddle);
				translation.x += diff.x;
				translation.y += diff.y;
				const zoom = dist / prevDist;
				scale = scale * zoom;
				updateTransform();
				break;
			}
		}
	}

	function onwheel(event: WheelEvent) {
		event.preventDefault();
		event.stopPropagation();
		const point = pointFromEvent(event);
		const zoom = Math.exp(-event.deltaY / 512);
		scale = scale * zoom;
		updateTransform();
	}


	function pointFromEvent(event: PointerEvent | WheelEvent): Point {
		return { x: event.clientX, y: event.clientY };
	}

	function scheduleRender() {
		if (!frame) {
			frame = rAF(renderFrame);
		}
	}

	function renderFrame(t: number) {
		const distance = Math.sqrt(velocity.vx * velocity.vx + velocity.vy * velocity.vy);
		const moving = distance > MIN_VELOCITY;

		if (moving) {
			const ts = t - velocity.ts;
			const x = velocity.vx * ts;
			const y = velocity.vy * ts;
			translation.x += x;
			translation.y += y;
			velocity.vx *= friction;
			velocity.vy *= friction;
			velocity.ts = t;
			updateTransform();
		}

		if (moving) {
			frame = rAF(renderFrame);
		} else {
			frame = 0;
		}
	}

	$effect(() => {
		const makePassive = { passive: true };

		node.addEventListener("pointerdown", onpointerdown, makePassive);
		node.addEventListener("pointerup", onpointerup, makePassive);
		node.addEventListener("pointercancel", onpointerup, makePassive);
		node.addEventListener("pointermove", onpointermove, makePassive);
		node.addEventListener("wheel", onwheel);

		scale = node.clientWidth / content.clientWidth;
		translation.x = -(content.clientWidth * (1 - scale) / 2);
		translation.y = -(content.clientHeight * (1 - scale) / 2);
		minScale = scale;

		updateTransform();


		return () => {
			node.removeEventListener("pointerdown", onpointerdown);
			node.removeEventListener("pointerup", onpointerup);
			node.removeEventListener("pointercancel", onpointerup);
			node.removeEventListener("pointermove", onpointermove);
			node.removeEventListener("wheel", onwheel);
		};
	});
}


