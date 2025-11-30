export class CapacityIndicator {

  #HTML_DATA = (() => {
    const template = $('.capacity-indicator.template')
    if (!template) return null

    const outerHTML = template.outerHTML
    
    return {
      outerHTML: outerHTML.replaceAll('template', '')
    }
  })()

  #id
  #html
  #mount

  constructor(id) {
    this.#html = this.#HTML_DATA.outerHTML.replace('{0}', id)
    this.#id = id
  }

  toHTML() {
    return this.#html
  }

  mount(query) {
    this.#mount = $(query)
    this.#mount.innerHTML += this.toHTML()
  }

  setActive(carriage) {
    const currentlyActive = $(`#${this.#id} div.carriage.active`)
    if (currentlyActive) {
      currentlyActive.classList.remove('active')
    }

    $(`#${this.#id} div.carriage:nth-child(${carriage + 1})`).classList.add('active')
  }

  setCarriageCount(count) {
    const carriageElements = Array.from(document.querySelectorAll(`#${this.#id} div.carriage`))

    const inactiveCount = carriageElements.length - count
    carriageElements.slice(0, inactiveCount).forEach(carriage => carriage.classList.add('blocked'))
    carriageElements.slice(inactiveCount).forEach(carriage => carriage.classList.remove('blocked'))
  }
}

if (typeof window !== 'undefined') window.CapacityIndicator = CapacityIndicator