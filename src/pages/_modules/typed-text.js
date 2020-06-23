window.addEventListener(
  'load',
  function() {
    const typedText = document.querySelectorAll('.typed-text-wrapper')

    if (typedText) {
      setTimeout(function() {
        typedText.forEach(function(node) {
          node.classList.add('animate')
        })
      }, 500)
    }
  },
  false
)
