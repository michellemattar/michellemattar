/**
 * Given an html element, check if 25%
 * of it is inside of the viewport.
 *
 * @param {Element} el
 * @returns {boolean}
 */
export function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()

  return (
    (rect.top >= 0 &&
      rect.top + rect.height * 0.25 <=
        (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.bottom >= 0 &&
      rect.bottom - rect.height * 0.25 <=
        (window.innerHeight || document.documentElement.clientHeight))
  )
}

/**
 * Pick a number between 0 and max
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}
