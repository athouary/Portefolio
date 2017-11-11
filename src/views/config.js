/* eslint-disable */
// Depend of environnement, require file
if ( process.env.NODE_ENV !== 'production' ) {
//   if (module.hot) {
//     module.hot.accept()
//   }
}
// Expose jQuery to the global (window) namespace
// require('expose?$!expose?jQuery!jquery');

// import Main JS
import '../assets/scripts/main'

// import Main CSS
import '../assets/styles/main'

// // import Main Images
import '../assets/images/sample.jpg'

// // import Shared Component
import Header from 'template/shared/header/config';


function isInViewport(elem) {
  var element = document.getElementById(elem)
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}

function getFooter() {
  return import(/* webpackChunkName: "footer" */ 'template/shared/footer/config').then(fromComp => {

    return fromComp
    
  }).catch(error => 'An error occurred while loading the component');
}

var last_known_scroll_position = 0;
var ticking = false;

window.addEventListener('scroll', function(e) {
  
  last_known_scroll_position = window.scrollY;

  if (!ticking) {

    window.requestAnimationFrame(function() {
      // doSomething(last_known_scroll_position);
      
      if(isInViewport('footer')) {
        getFooter()
      }
      ticking = false;
    });
      
    ticking = true;

  }
  
});

function getBody() {
  console.log('inviewport2');
  return import(/* webpackChunkName: "home" */ 'template/components/home/config').then(fromComp => {

    return fromComp
    
  }).catch(error => 'An error occurred while loading the component');
}

getBody()

// getComponent().then(component => {
//   console.log( component );
// })
