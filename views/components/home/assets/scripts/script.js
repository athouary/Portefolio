/*
 * components/home/assets/script
 */

const speed = 50

export function createParallax () {
  const parallaxFrames = [...document.querySelectorAll('[data-parallax-frame]')]

  parallaxFrames.map(parallaxFrame => {
    const width = parallaxFrame.offsetWidth
    const height = parallaxFrame.offsetHeight

    parallaxFrame.addEventListener('mousemove', (event) => {
      const mouseX = event.clientX - parallaxFrame.offsetLeft
      const mouseY = event.clientY - parallaxFrame.offsetTop
      const left = -(((mouseX - (width / 2)) / width) * speed) + 'px'
      const top = -(((mouseY - (height / 2)) / height) * speed) + 'px'
      parallaxFrame.style.backgroundPosition = `${left} ${top}`
    })
  })
}
