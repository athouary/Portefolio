export default function getsInViewport (element) {
  return new Promise((resolve) => {
    let scrollTimeout

    function onScroll () {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          const rect = element.getBoundingClientRect()
          const html = document.documentElement
          scrollTimeout = null
          if (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || html.clientHeight) &&
            rect.right <= (window.innerWidth || html.clientWidth)
          ) {
            window.removeEventListener('scroll', onScroll)
            resolve()
          }
        }, 200)
      }
    }

    window.addEventListener('scroll', onScroll)
  })
}
