/* eslint-disable */
// Depend of environnement, require file
if ( process.env.NODE_ENV !== 'production' ) {
  // require('jquery')
}

// import Main JS
import './assets/scripts/main'

// import Main CSS
import './assets/styles/main'

// import Main Images
// import '../assets/images/sample.jpg'

// import Components
import 'Components/header/config'
import 'Components/home/config'

// TODO: move to appropriate place
function isInViewport(elem) {
  var element = document.getElementById(elem)
  var rect = element.getBoundingClientRect()
  var html = document.documentElement
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  )
}
