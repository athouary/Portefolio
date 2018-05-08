import getsInViewport from 'Views/assets/scripts/gets-in-viewport'

export default function gaugeFiller () {
  const gaugeElems = [...document.querySelectorAll('[data-gauge-total]')]

  const setWidths = () => {
    gaugeElems.map((elem, key) => {
      setTimeout(() => {
        const levelElem = elem.querySelectorAll('[data-gauge-level]')[0]
        const width = levelElem.dataset.gaugeLevel / elem.dataset.gaugeTotal * 100
        levelElem.style.width = `${width}%`
      }, key * 200)
    })
  }

  getsInViewport(document.getElementsByClassName('skills-hard-item')[0]).then(setWidths)
}
