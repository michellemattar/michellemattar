import * as Helpers from '../_modules/helpers'
import throttle from 'lodash/throttle'

const sliders = document.querySelector('.slider')
const sliderItems = document.querySelector('.slider-item')
const modal = document.querySelector('.slider-modal')
const modalImage = document.querySelector('.sm-image')
const modalButton = document.querySelector('.sm-button')

/**
 * Listener for clicks on the image slider thumbnails
 * Grabs the src for the full image and passes it
 * to openModal()
 *
 * @param {MouseEvent} event
 */
function sliderListener(event) {
  let target

  if (event.target.classList.contains('slider-item')) {
    target = event.target
  } else if (event.target.parentNode.classList.contains('slider-item-inner')) {
    target = event.target.parentNode.parentNode
  } else {
    return
  }

  event.preventDefault()
  event.stopPropagation()

  const fullImageSrc = target.href

  openModal(fullImageSrc)
}

document.addEventListener('click', sliderListener, false)

/**
 * Adds the modal-open class to the body,
 * programatically loads the image then
 * swaps it into the modal.
 *
 * @param {string} imageSrc
 */
function openModal(imageSrc) {
  document.body.classList.add('modal-open')
  setTimeout(function() {
    document.body.classList.add('modal-visible')
  }, 50)

  const img = new Image()

  img.onload = function() {
    modalImage.src = imageSrc
    document.body.classList.add('modal-image-visible')
  }

  img.src = imageSrc
}

/**
 * Closes the modal by removing the modal-open
 * class form the body
 */
function closeModal() {
  document.body.classList.remove('modal-visible')
  setTimeout(function() {
    document.body.classList.remove('modal-open')
    document.body.classList.remove('modal-image-visible')
  }, 300)
}

/**
 * Listener to close the modal when clicking in
 * outer bounds of the overlay or on the close
 * button.
 */
modal.addEventListener(
  'click',
  function(event) {
    if (event.target === modal || event.target === modalButton) {
      closeModal()
    }
  },
  false
)

/**
 * Use the ESC key to close the modal
 */
document.addEventListener('keydown', event => {
  if (event.key == 'Escape' && document.body.classList.contains('modal-open')) {
    closeModal()
  }
})

/**
 * Lazy Loaded Images Animation
 */

/**
 * On page load, add dynamic transition delays to
 * the lazy loaded images to simulate a cascading effect.
 *
 * Add window event listeners on scroll and resize.
 */
function showcaseAnimationInit() {
  const hiddenImages = document.querySelectorAll('.showcase img:not(.visible)')

  Array.prototype.slice.apply(hiddenImages).forEach(function(image, index) {
    image.style.transitionDelay = Helpers.getRandomInt(200) + 'ms'
  })

  window.addEventListener('scroll', showcaseAnimationCheck, false)
  window.addEventListener('resize', showcaseAnimationCheck, false)
}

window.addEventListener('DOMContentLoaded', showcaseAnimationInit)

/**
 * Remove the window event listeners
 * (when all the images are visible)
 */
function showcaseAnimationCleanup() {
  window.removeEventListener('scroll', showcaseAnimationCheck, false)
  window.removeEventListener('resize', showcaseAnimationCheck, false)
}

/**
 * Find images to lazy load and check if they are
 * inside of the viewport. If they are, then change
 * the image src to start loading them. Upon load,
 * update the classes on the image to animate them
 * in.
 *
 * Triggered on page load, window scroll, and resize.
 * Throttled to only trigger once every 100ms.
 */
const showcaseAnimationCheck = throttle(function() {
  const hiddenImages = document.querySelectorAll('.showcase img:not(.visible)')

  if (!hiddenImages.length) {
    // all images are visible - trigger clean up
    showcaseAnimationCleanup()
    return
  }

  Array.prototype.slice.apply(hiddenImages).forEach(function(image, index) {
    if (Helpers.isElementInViewport(image)) {
      image.classList.add('visible')
    }
  })
}, 50)

window.addEventListener('load', showcaseAnimationCheck, false)
