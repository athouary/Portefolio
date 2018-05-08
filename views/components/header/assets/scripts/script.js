const pageElems = [...document.querySelectorAll('[data-page]')]
const linksElems = [...document.querySelectorAll('[data-goto-page]')]
const marker = document.querySelector('[data-marker]')

export function setCurrentLink () {
  pageElems.map((elem) => {
    const rect = elem.getBoundingClientRect()
    const html = document.documentElement
    if (
      (rect.top >= 0 && rect.top <= (window.innerHeight || html.clientHeight) / 2) ||
      (rect.bottom <= (window.innerHeight || html.clientHeight) && rect.bottom >= (window.innerHeight || html.clientHeight) / 2) ||
      (rect.top <= 0 && rect.bottom >= (window.innerHeight || html.clientHeight))
    ) {
      const linkElem = document.querySelector(`[data-goto-page="${elem.dataset.page}"`)
      linksElems.map((link) => {
        link.classList.remove('isSelected')
      })
      if (linkElem) {
        linkElem.classList.add('isSelected')
        if (!linkElem.dataset.noMarker) {
          moveMarkerTo(linkElem)
        } else {
          moveMarkerTo()
        }
      }
    }
  })
}

export function selectLinkOnScroll () {
  let scrollTimeout

  function onScroll () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null
        setCurrentLink()
      }, 200)
    }
  }

  window.addEventListener('scroll', onScroll)
}

export function smoothScrollToPage () {
  function onLinkClick (event) {
    const targetElem = document.querySelector(`[data-page="${event.currentTarget.dataset.gotoPage}"`)
    targetElem.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
  }

  linksElems.map((elem) => {
    elem.addEventListener('click', onLinkClick)
  })
}

export function moveMarkerTo (target) {
  if (target !== undefined) {
    marker.style.top = `${target.offsetTop - 3}px`
  } else {
    marker.style.top = '-100px'
  }
}
