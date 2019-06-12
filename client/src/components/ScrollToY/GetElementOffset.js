/**
 * Get Offset position of an element with respect to the document
 *
 * @param {HTMLElement} el
 * @return {{top: *, left: *}}
 */
const getElementOffset = (el) => {
	let rect       = el.getBoundingClientRect(),
	    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	    scrollTop  = window.pageYOffset || document.documentElement.scrollTop;

	return {
		top: rect.top + scrollTop,
		left: rect.left + scrollLeft
	};
};

export default getElementOffset;
