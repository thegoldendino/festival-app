import type { Action } from 'svelte/action';

export interface Point {
	x: number;
	y: number;
}

export interface Transform {
	scale: number;
	translation: Point;
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

export const panzoom: Action<HTMLElement, undefined, { ontransform: (e: CustomEvent) => void }> = (node) => {
	const rAF = requestAnimationFrame;
	let minScale = 0;
	let scale = 1.0;
	let translation = { x: 0, y: 0 };
	let lastTouchEndTime = 0;

	const pointers = new Map<number, Point>();

	const content = node.firstElementChild as HTMLElement;
	if (!content) {
		throw new Error("Node must have at least one child element to apply panzoom.");
	}

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

		//clamp translation to avoid over-scrolling bottom side
		if (translation.y + offsetY < node.clientHeight - content.clientHeight * scale) {
			translation.y = node.clientHeight - content.clientHeight * scale - offsetY;
		}

		//can not zoom out more than the original size
		if (scale < minScale) {
			scale = minScale;
		}

		node.dispatchEvent(new CustomEvent<Transform>("transform", { detail: { scale, translation } }));
	}

	function onpointerdown(event: PointerEvent) {
		event.stopPropagation();
		node.setPointerCapture(event.pointerId);
		pointers.set(event.pointerId, pointFromEvent(event));
	}

	function onpointerup(event: PointerEvent) {
		event.stopPropagation();
		node.releasePointerCapture(event.pointerId);
		pointers.delete(event.pointerId);
	}

	function onpointermove(event: PointerEvent) {
		event.stopPropagation();
		if (!pointers.has(event.pointerId)) return;


		const point = pointFromEvent(event);
		switch (pointers.size) {
			case 1: {
				const curr = point;
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
		const zoom = Math.exp(-event.deltaY / 512);
		scale = scale * zoom;
		updateTransform();
	}

	function resetScale() {
		scale = Math.max(node.clientWidth / content.clientWidth, node.clientHeight / content.clientHeight);
		translation.x = -(content.clientWidth * (1 - scale) / 2);
		translation.y = -(content.clientHeight * (1 - scale) / 2);
		minScale = scale;
	}

	function ontouchend(event: TouchEvent) {
		event.preventDefault();
		event.stopPropagation();
		pointers.clear();

		const currentTime = new Date().getTime();
		const tapLength = currentTime - lastTouchEndTime;

		if (tapLength < 300 && tapLength > 0) {
			resetScale();
			updateTransform();
		}

		lastTouchEndTime = currentTime;
	}


	function pointFromEvent(event: PointerEvent | WheelEvent): Point {
		return { x: event.clientX, y: event.clientY };
	}

	$effect(() => {
		const makePassive = { passive: true };

		node.addEventListener("pointerdown", onpointerdown, makePassive);
		node.addEventListener("pointerup", onpointerup, makePassive);
		node.addEventListener("pointercancel", onpointerup, makePassive);
		node.addEventListener("pointermove", onpointermove, makePassive);
		node.addEventListener("touchend", ontouchend);
		node.addEventListener("wheel", onwheel);

		resetScale();

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


