import PID from '../pid.mjs'

export class CompactServiceList extends PID {

  #HTML_DATA = (() => {
    const outerHTML=  $('.service-list.template').outerHTML
    const rowOuterHTML = $('.service-list.template .service-row.template').outerHTML
    return {
      outerHTML: outerHTML.replace(rowOuterHTML, '{2}').replaceAll('template', ''),
      rowOuterHTML
    }
  })()

  #name
  #lineClass
  #serviceCount

  #html
  #mount

  constructor(name, lineClass, serviceCount) {
    super()
    this.#name = name
    this.#lineClass = lineClass
    this.#serviceCount = serviceCount

    this.#html = this.#HTML_DATA.outerHTML
      .replace('{0}', lineClass)
      .replace('{1}', name)
      .replace('{2}', Array(serviceCount).fill(this.#HTML_DATA.rowOuterHTML).join(''))
  }

  updateServices(services) {
    let screenServices = services
      .concat(Array(this.#serviceCount).fill(null))
      .slice(0, this.#serviceCount)

    this.#updateServices(screenServices)
  }

  #updateServices(services) {
    services.forEach((service, i) => {
      let correspondingRow = $(`.services .service-row:nth-child(${i + 1})`, this.#mount)
      if (service) {
        // correspondingRow.className = `service-row ${service.disruptions.length > 0 ? 'disrupted' : ''}`
        $('.service-sch-time', correspondingRow).textContent = service.schTime
        $('.service-destination', correspondingRow).textContent = service.destination
        $('.service-platform', correspondingRow).textContent = service.platform
        $('.service-est-time', correspondingRow).textContent = this.formatEstimatedTime(service.estTime)
      } else {
        correspondingRow.className = `service-row`
        $('.service-sch-time', correspondingRow).textContent = '--'
        $('.service-destination', correspondingRow).textContent = '--'
        $('.service-platform', correspondingRow).textContent = ''
        $('.service-est-time', correspondingRow).textContent = ``
      }
    })
  }

  toHTML() {
    return this.#html
  }

  mount(query) {
    this.#mount = $(query)
    this.#mount.innerHTML = this.toHTML()
  }

}

window.CompactServiceList = CompactServiceList