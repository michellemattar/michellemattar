const navToggle = document.querySelector('.mh-nav-toggle')

/**
 * Navigation
 */

/**
 * Close the nav menu
 *
 * First removes 'nav-visible' for a 500ms nav slide out,
 * then removes 'nav-open' for a 500ms fade in of
 * the main content.
 */
function closeNav() {
  document.body.classList.remove('nav-visible')
  setTimeout(() => {
    document.body.classList.remove('nav-open')
  }, 500)
}

/**
 * Open the nav menu
 *
 * First adds 'nav-open' class for a 500ms fade out
 * of the main content, then add 'nav-visible' class
 * for a 500ms slide in of the nav menu
 */
function openNav() {
  document.body.classList.add('nav-open')
  setTimeout(function() {
    document.body.classList.add('nav-visible')
  }, 500)
}

/**
 * Hamburger menu listener
 */
navToggle.addEventListener(
  'click',
  () => {
    if (document.body.classList.contains('nav-visible')) {
      closeNav()
    } else {
      openNav()
    }
  },
  false
)

/**
 * Use the ESC key to close the nav menu
 */
document.addEventListener('keydown', event => {
  if (event.key == 'Escape' && document.body.classList.contains('nav-visible')) {
    closeNav()
  }
})
