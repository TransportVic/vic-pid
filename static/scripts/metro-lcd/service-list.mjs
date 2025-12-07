import PID from '../pid.mjs' 
import { BoldLineHeader } from './header.mjs'

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
  mount() {}
  toHTML() {}

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
    this.#mount.innerHTML += this.toHTML()
  }

  removeHeader() {
    $('.service-list.compact .line-marker', this.#mount).remove()
    $('.service-list.compact .content > p.title', this.#mount).remove()
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
    this.#mount.innerHTML += this.toHTML()
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

export class LineGroupServiceList extends ServiceList {

  #HTML_DATA = (() => {
    const headerTemplate = $('.next-service-info.template')
    if (!headerTemplate) return null

    const outerHTML = headerTemplate.outerHTML
    return {
      outerHTML: outerHTML.replaceAll('template', '')
    }
  })()

  #smallServices
  #smallServiceCount
  #header
  #mount

  constructor(name, lineClass, bigServiceCount, smallServiceCount) {
    super(name, lineClass, bigServiceCount)
    this.#header = new BoldLineHeader(name, lineClass)
    this.#smallServices = new CompactServiceList(name, lineClass, smallServiceCount)
    this.#smallServiceCount = smallServiceCount
  }

  escapeName(name) {
    return name.toLowerCase().replace(/[^\w]+/g, '-')
  }

  mount(query) {
    const escapedName = this.escapeName(this.getName())
    const container = $(query)
    container.innerHTML = `<div class='line-group-container ${escapedName}'></div>`

    const subQuery = query + ` .line-group-container.${escapedName}`
    this.#mount = $(subQuery)
    this.#header.mount(subQuery)

    this.#mount.innerHTML += `<div class='inner'></div>`
    const containerQuery = subQuery + ' .inner'

    const bigServiceHTML = Array(this.getServiceCount()).fill(this.#HTML_DATA.outerHTML).join('')
    $(containerQuery).innerHTML += bigServiceHTML

    this.#smallServices.mount(containerQuery)
    this.#smallServices.removeHeader()
  }

  updateServices(services) {
    const totalServiceCount = this.getServiceCount() + this.#smallServiceCount
    const allServices = services.concat(Array(totalServiceCount).fill(null))

    const bigServices = Array.from(this.#mount.querySelectorAll('.next-service-info'))
    allServices.slice(0, this.getServiceCount()).forEach((service, i) => {
      const container = bigServices[i]

      if (service) {
        container.className = `next-service-info compact ${service.line} ${service.disruptions.length > 0 ? 'disrupted' : ''}`

        $('span.next-service-sch-time', container).textContent = service.schTime
        $('span.next-service-est-time', container).textContent = this.formatEstimatedTime(service.estTime)

        $('span.next-service-platform', container).textContent = service.platform
        
        $('span.next-service-destination', container).textContent = this.shorternNextDestination(service.destination)
        $('span.next-service-summary', container).textContent = service.summary
      } else {
        container.className = `next-service-info compact`

        $('span.next-service-sch-time', container).textContent = '--'
        $('span.next-service-est-time', container).textContent = ''

        $('span.next-service-platform', container).innerHTML = '&nbsp;'
        
        $('span.next-service-destination', container).textContent = '--'
        $('span.next-service-summary', container).textContent = ''
      }
    })

    this.#smallServices.updateServices(allServices.slice(this.getServiceCount()))
  }

  shorternNextDestination(dest) {
    if (dest === 'Flemington Racecourse') return 'Flemington Races'
    if (dest === 'Upper Ferntree Gully') return 'Upper F.T Gully' 

    return dest
  }
}

if (typeof window !== 'undefined') {
  window.CompactMultiServiceList = CompactMultiServiceList
  window.MiniCompactMultiServiceList = MiniCompactMultiServiceList

  window.CompactServiceList = CompactServiceList
  window.MiniCompactServiceList = MiniCompactServiceList
  window.LineGroupServiceList = LineGroupServiceList
}