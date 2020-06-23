import * as Helpers from '../_modules/helpers'
import throttle from 'lodash/throttle'

const sliderBatches = document.querySelectorAll('.as-batch')
const sliderPager = document.querySelector('.as-pager')
const sliderPagerButtons = document.querySelectorAll('.as-pager-button')
const sliderPagerLabel = document.querySelector('.as-pager-label')
let sliderTimeout1
let sliderTimeout2

const fibtContainer = document.querySelector('.fixed-image-by-text')
const fibtText = document.querySelector('.fibt-text')
const fibtImage = document.querySelector('.fibt-image')

/**
 * Decides whether or not the image in the top info panel
 * should be fixed. Throttled to every 50 ms.
 *
 * Logic:
 * - If the bottom of the info text is past the window height,
 * then the image should definitely be fixed - remove the
 * 'unfixed' class.
 * - Otherwise, if the bottom of the info image is past the
 * bottom of the info text then the image should be static -
 * apply the 'unfixed' class.
 */
const fixedImageCheck = throttle(function() {
  const posImage = fibtImage.getBoundingClientRect().bottom
  const posText = fibtText.getBoundingClientRect().bottom

  if (posText + 25 > window.innerHeight) {
    fibtContainer.classList.remove('unfixed')
  } else if (posImage >= posText) {
    fibtContainer.classList.add('unfixed')
  }
}, 50)

window.addEventListener('scroll', fixedImageCheck, false)
window.addEventListener('resize', fixedImageCheck, false)

/**
 * Pager button listener for the Blog Post Slider
 *
 * Uses the value of the data-set attribute on the button
 */
sliderPager.addEventListener(
  'click',
  function(event) {
    if (event.target.classList.contains('as-pager-button')) {
      const index = parseInt(event.target.getAttribute('data-set'), 10)
      slideTo(index)
    }
  },
  false
)

/**
 * More Articles button listener for the Blog Post Slider
 *
 * Checks the active pager button and moves to the next one.
 */
sliderPagerLabel.addEventListener('click', function() {
  const activeButton = document.querySelector('.as-pager-button[data-active="true"]')
  const activeIndex = parseInt(activeButton.getAttribute('data-set'), 10)
  const targetIndex = sliderPagerButtons.item(activeIndex + 1) ? activeIndex + 1 : 0

  slideTo(targetIndex)
})

/**
 * "Slides" the Blog Post slider to the slide with the
 * given index
 *
 * @param {*} targetIndex
 */
function slideTo(targetIndex) {
  clearTimeout(sliderTimeout1)
  clearTimeout(sliderTimeout2)

  const activeBatch = document.querySelector('.as-batch[data-active="true"]')
  const targetBatch = sliderBatches.item(targetIndex)

  if (activeBatch === targetBatch) {
    return
  }

  // prevent clicking too fast aka double-clicking
  sliderPagerLabel.disabled = true

  // animate the pager buttons immediately
  sliderPagerButtons.forEach(function(button, index) {
    button.disabled = true
    if (index === targetIndex) {
      button.setAttribute('data-active', 'true')
    } else {
      button.removeAttribute('data-active')
    }
  })

  // make the current batch of blog posts fade out
  activeBatch.classList.add('fade-out')

  // after the current batch of blog posts fade out,
  // fade in the next batch of blog posts, then
  // add the data-active attribute
  sliderTimeout1 = setTimeout(function() {
    activeBatch.removeAttribute('data-active')
    activeBatch.classList.remove('fade-out')
    targetBatch.classList.add('fade-in')

    sliderTimeout2 = setTimeout(function() {
      targetBatch.classList.remove('fade-in')
      targetBatch.setAttribute('data-active', 'true')

      sliderPagerButtons.forEach(function(button) {
        button.disabled = false
        sliderPagerLabel.disabled = false
      })
    }, 200)
  }, 200)
}

/**
 * About Page Animation
 */

/**
 * On page load, add dynamic transition delays to
 * the row cells to simulate a cascading effect.
 *
 * Add window event listeners on scroll and resize.
 */
function aboutPageAnimationInit() {
  const items = document.querySelectorAll('.what-i-do .table-row-list')
  const items2 = document.querySelectorAll('.as-batch:first-child .as-item')

  Array.prototype.slice.apply(items).forEach(function(item, index) {
    item.style.transitionDelay = 100 * index + 'ms'
  })

  Array.prototype.slice.apply(items2).forEach(function(item, index) {
    item.style.transitionDelay = 100 * index + 'ms'
  })

  window.addEventListener('scroll', aboutPageAnimationCheck, false)
  window.addEventListener('resize', aboutPageAnimationCheck, false)
}

window.addEventListener('DOMContentLoaded', aboutPageAnimationInit)

/**
 * Remove the window event listeners
 * (when all the cells are visible)
 */
function aboutPageAnimationCleanup() {
  window.removeEventListener('scroll', aboutPageAnimationCheck, false)
  window.removeEventListener('resize', aboutPageAnimationCheck, false)
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
const aboutPageAnimationCheck = throttle(function() {
  const hiddenItems = document.querySelectorAll('.what-i-do .table-row-list:not(.visible)')
  const hiddenItems2 = document.querySelectorAll('.as-batch:first-child .as-item:not(.visible)')

  if (!hiddenItems.length && !hiddenItems2.length) {
    // all cells are visible - trigger clean up
    aboutPageAnimationCleanup()
    return
  }

  Array.prototype.slice.apply(hiddenItems).forEach(function(item, index) {
    if (Helpers.isElementInViewport(item)) {
      item.classList.add('visible')
    }
  })

  Array.prototype.slice.apply(hiddenItems2).forEach(function(item, index) {
    if (Helpers.isElementInViewport(item)) {
      item.classList.add('visible')
    }
  })
}, 100)

window.addEventListener('load', aboutPageAnimationCheck)
