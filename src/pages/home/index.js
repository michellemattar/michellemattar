import * as Helpers from '../_modules/helpers'
import throttle from 'lodash/throttle'

const header = document.querySelector('.main-header')
const introSequence = document.querySelector('.intro-animation-wrapper')

/**
 * Intro Animation
 */

/**
 * Wait until all content has finished loading,
 * before proceeding with the animation.
 */
window.addEventListener('load', function() {
  introSequence.classList.add('animate')
})

/**
 * When the intro animation finishes,
 * remove the 'hidden' class from the header
 * to make it slide in.
 */
document.addEventListener(
  'animationend',
  function(event) {
    if (
      event.animationName === 'introSequenceMobile' ||
      event.animationName === 'introSequenceDesktop'
    ) {
      header.classList.remove('hidden')
    }
  },
  false
)

/**
 * When the header finishes sliding in,
 * add the 'fadeout' class to the full-screen
 * intro to have it fade out.
 */
header.addEventListener(
  'transitionend',
  function(event) {
    if (event.propertyName === 'transform') {
      introSequence.classList.add('fadeout')
    }
  },
  false
)

/**
 * When the full-screen intro finshes fading out,
 * add a 'hidden' class to it to make it display: none;
 * and also remove the 'lock-scrolling' class from
 * the body to unlock scrolling on the main content.
 */
introSequence.addEventListener(
  'transitionend',
  function(event) {
    if (event.propertyName === 'opacity') {
      introSequence.classList.add('hidden')
      document.body.classList.remove('lock-scrolling')
    }
  },
  false
)

/**
 * Home Grid Animation
 */

/**
 * On page load, add dynamic transition delays to
 * the row cells to simulate a cascading effect.
 *
 * Add window event listeners on scroll and resize.
 */
function homeGridAnimationInit() {
  const cells = document.querySelectorAll('.home-grid-row:nth-child(n + 3) .hgr-link')

  Array.prototype.slice.apply(cells).forEach(function(cell, index) {
    cell.style.transitionDelay = 100 * index + 'ms'
  })

  window.addEventListener('scroll', homeGridAnimationCheck, false)
  window.addEventListener('resize', homeGridAnimationCheck, false)
}

window.addEventListener('DOMContentLoaded', homeGridAnimationInit)

/**
 * Remove the window event listeners
 * (when all the cells are visible)
 */
function homeGridAnimationCleanup() {
  window.removeEventListener('scroll', homeGridAnimationCheck, false)
  window.removeEventListener('resize', homeGridAnimationCheck, false)
}

/**
 * Find hidden cells and check if they are inside
 * of the viewport. If they are, then add a class to
 * make them visible and animate in.
 *
 * Triggered on page load, window scroll, and resize.
 * Throttled to only trigger once every 100ms.
 *
 */
const homeGridAnimationCheck = throttle(function() {
  const hiddenCells = document.querySelectorAll(
    '.home-grid-row:nth-child(n + 3) .hgr-link:not(.visible)'
  )

  if (!hiddenCells.length) {
    // all cells are visible - trigger clean up
    homeGridAnimationCleanup()
    return
  }

  Array.prototype.slice.apply(hiddenCells).forEach(function(cell, index) {
    if (Helpers.isElementInViewport(cell)) {
      cell.classList.add('visible')
    }
  })
}, 100)

window.addEventListener('load', homeGridAnimationCheck)
