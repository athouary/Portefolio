import Glide, {Controls, Swipe} from '@glidejs/glide/dist/glide.modular.esm'

new Glide('[data-glide]', {
  type: 'carousel',
  animationDuration: 600,
  throttle: 200
}).mount({ Controls, Swipe })
