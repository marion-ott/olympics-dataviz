/**
 * Animated scrollTo function
 *
 * @param {number|undefined} [scrollTargetY] - the target scrollY property of the window
 * @param {number|undefined} [speed] - time in pixels per second
 * @param {string|undefined} [easing] - easing equation to use
 * @param {function|undefined} [callback]
 * @link https://stackoverflow.com/a/26798337
 */
const scrollToY = (scrollTargetY = 0, speed = 2000, easing = 'easeInOutSine', callback) => {

	let scrollY     = window.pageYOffset,
	    currentTime = 0;

	// Min time .1, max time .8 seconds
	const time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

	// Easing equations from https://github.com/danro/easing-js/blob/master/easing.js
	const easingEquations = {
		easeOutSine: (pos) => {
			return Math.sin(pos * (Math.PI / 2));
		},
		easeInOutSine: (pos) => {
			return (-0.5 * (Math.cos(Math.PI * pos) - 1));
		},
		easeInOutQuint: (pos) => {
			if ((pos /= 0.5) < 1) {
				return 0.5 * Math.pow(pos, 5);
			}
			return 0.5 * (Math.pow((pos - 2), 5) + 2);
		}
	};

	// Add animation loop
	const tick = () => {
		currentTime += 1 / 60;

		const p = currentTime / time,
		      t = easingEquations[easing](p);

		if (p < 1) {
			window.requestAnimationFrame(tick);
			window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
		} else {
			//            Console.log('scroll done');
			window.scrollTo(0, scrollTargetY);
			if (typeof callback === 'function') callback();
		}
	};

	// Call it once to get started
	tick();
};

export default scrollToY;
