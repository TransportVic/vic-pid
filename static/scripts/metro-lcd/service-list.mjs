import PID from '../pid.mjs'

export class ServiceList extends PID {

  #name
  #lineClass
  #serviceCount

  constructor(name, lineClass, serviceCount) {
    super()
    this.#name = name
    this.#lineClass = lineClass
    this.#serviceCount = serviceCount
  }

  getName() { return this.#name }
  getLineClass() { return this.#lineClass }
  getServiceCount() { return this.#serviceCount }

}

export class CompactServiceList extends ServiceList {

  #HTML_DATA = (() => {
    const template = $('.service-list.compact.template')
    if (!template) return null

    const outerHTML=  template.outerHTML
    const rowOuterHTML = $('.service-row.template', template).outerHTML

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
    super(name, lineClass, serviceCount)
    this.#html = this.#HTML_DATA.outerHTML
      .replace('{0}', lineClass)
      .replace('{1}', name)
      .replace('{2}', Array(this.getServiceCount()).fill(this.#HTML_DATA.rowOuterHTML).join(''))
  }

  updateServices(services) {
    let screenServices = services
      .concat(Array(this.getServiceCount()).fill(null))
      .slice(0, this.getServiceCount())

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

export class CompactMultiServiceList extends ServiceList {

  #HTML_DATA = (() => {
    const template = $('.service-list.multi.template')
    if (!template) return null

    const outerHTML=  template.outerHTML
    const rowOuterHTML = $('.service-row.template', template).outerHTML

    return {
      outerHTML: outerHTML.replace(rowOuterHTML, '{2}').replaceAll('template', ''),
      rowOuterHTML
    }
  })()

  description

  #html
  #mount

  constructor(name, description, serviceCount) {
    super(name, '', serviceCount)
    this.description = description

    this.#html = this.#HTML_DATA.outerHTML
      .replace('{0}', name)
      .replace('{1}', description)
      .replace('{2}', Array(this.getServiceCount()).fill(this.#HTML_DATA.rowOuterHTML).join(''))
  }

  updateServices(services) {
    let screenServices = services
      .concat(Array(this.getServiceCount()).fill(null))
      .slice(0, this.getServiceCount())

    this.#updateServices(screenServices)
  }

  #updateServices(services) {
    services.forEach((service, i) => {
      let correspondingRow = $(`.services .service-row:nth-child(${i + 1})`, this.#mount)
      if (service) {
        correspondingRow.className = `service-row ${service.line}`
        $('.service-platform', correspondingRow).textContent = service.platform
        $('.service-est-time', correspondingRow).textContent = this.formatEstimatedTime(service.estTime)
      } else {
        correspondingRow.className = `service-row ${i === 0 ? 'no-line' : 'hidden'}`
        $('.service-platform', correspondingRow).textContent = ''
        $('.service-est-time', correspondingRow).textContent = ''
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

export class MiniCompactMultiServiceList extends CompactMultiServiceList {

  constructor(name, description, serviceCount) {
    super(name, description, serviceCount)
  }

  toHTML() {
    return super.toHTML().replace('service-list multi', 'service-list multi mini')
  }

}

export class MiniCompactServiceList extends CompactServiceList {

  constructor(name, lineClass, serviceCount) {
    super(name, lineClass, serviceCount)
  }

  toHTML() {
    return super.toHTML().replace('service-list compact', 'service-list compact mini')
  }

}

if (typeof window !== 'undefined') {
  window.CompactMultiServiceList = CompactMultiServiceList
  window.MiniCompactMultiServiceList = MiniCompactMultiServiceList

  window.CompactServiceList = CompactServiceList
  window.MiniCompactServiceList = MiniCompactServiceList
}