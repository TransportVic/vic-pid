import { getTextSize } from '../pid-utils.mjs'
import PID from '../pid.mjs'
import { StoppingPattern } from './stopping-pattern.mjs'

export class FullLCDPIDBase extends PID {

  #subsequentServiceTemplate
  #currentSubsequentServiceCount = 0
  #currentPattern

  constructor() {
    super()
    this.#subsequentServiceTemplate = $('.subsequent-service.template').outerHTML.replace(' template', '')
    this.getPIDClasses().forEach(className => $('div.pid').classList.add(className))
    this.updateServices([])
  }
  
  getPIDClasses() {
    return []
  }

  getPIDConfig() {
    return {}
  }

  getSubsequentServiceCount() { return 0 }

  #generateSubsequentServicesHTML(services) {
    let replacementHTML = services.map((service, i) => {
      if (service) {
        return this.#subsequentServiceTemplate
          .replace('no-line', `${service.line} ${service.disruptions.length > 0 ? 'disrupted' : ''}`)
          .replace('{0}', service.schTime)
          .replace('{1}', service.destination)
          .replace('{2}', service.summary)
          .replace('{3}', service.platform)
          .replace('{4}', this.formatEstimatedTime(service.estTime))
      } else { 
        return this.#subsequentServiceTemplate
          .replace('{0}', '--')
          .replace('{1}', '--')
          .replace('{2}', '')
          .replace('{3}', '')
          .replace('{4}', '-- min')
      }
    }).join('')

    $('table.subsequent-service-info > tbody').innerHTML = replacementHTML
  }

  #updateSubsequentServices(services) {
    if (this.#currentSubsequentServiceCount !== this.getSubsequentServiceCount()) {
      this.#currentSubsequentServiceCount = this.getSubsequentServiceCount()
      return this.#generateSubsequentServicesHTML(services)
    }

    services.forEach((service, i) => {
      let correspondingRow = $(`.subsequent-service:nth-child(${i + 1})`)
      if (service) {
        correspondingRow.className = `subsequent-service ${service.line} ${service.disruptions.length > 0 ? 'disrupted' : ''}`

        $('.service-sch-time span', correspondingRow).textContent = service.schTime
        $('.service-destination span', correspondingRow).textContent = service.destination

        $('.service-summary span', correspondingRow).textContent = service.summary

        $('.service-platform span', correspondingRow).textContent = service.platform
        $('.service-est-time span', correspondingRow).textContent = this.formatEstimatedTime(service.estTime)
      } else {
        correspondingRow.className = `subsequent-service no-line`

        $('.service-sch-time span', correspondingRow).textContent = '--'
        $('.service-destination span', correspondingRow).textContent = '--'
        $('.service-summary span', correspondingRow).textContent = ''
        $('.service-platform span', correspondingRow).textContent = ''
        $('.service-est-time span', correspondingRow).textContent = `-- min`
      }
    })
  }

  #updateNextService(service) {
    this.#updateNextServiceInfo(service)
    this.#updateNextServicePattern(service)

    if (service.isArrival) this.#setArrival()
    else this.hideMainServiceMessage()

    if (service.disruptions.length > 0) {
      let disruption = service.disruptions[0]
      this.showDisruption(disruption.origin, disruption.text)
    } else this.hideNextServiceMessage()
  }

  #updateNextServicePattern(service) {
    if (service.stops.length) {
      let stoppingPattern = new StoppingPattern(service.stops, false, this.getPIDConfig())
      $('.next-service-pattern').innerHTML = stoppingPattern.toHTML()
      $('.next-service-pattern').className = `next-service-pattern ${service.line}`
      this.#currentPattern = stoppingPattern
    } else {
      $('.next-service-pattern').innerHTML = ''
    }
  }

  getCurrentPattern() { return this.#currentPattern }

  #updateNextServiceInfo(service) {
    $('div.next-service-info').className = `next-service-info ${service.line} ${service.disruptions.length > 0 ? 'disrupted' : ''}`

    $('span.next-service-sch-time').textContent = service.schTime
    $('span.next-service-est-time').textContent = this.formatEstimatedTime(service.estTime)

    $('span.next-service-platform').textContent = service.platform
    
    $('span.next-service-destination').textContent = service.destination
    $('span.next-service-summary').textContent = service.summary

    $('div.line-marker').className = `line-marker ${service.line}`
  }

  updateServices(services) {
    this.hideFixedMessage()
    if (services[0]) {
      this.hideNoTrains()
      this.#updateNextService(services[0])
    } else {
      this.showNoTrains()
    }

    let subSvcCount = this.getSubsequentServiceCount()
    let subsequentServices = services.slice(1, 1 + subSvcCount)
      .concat(Array(subSvcCount).fill(null))
      .slice(0, subSvcCount)
    this.#updateSubsequentServices(subsequentServices)
  }

  showNoTrains() {
    let pid = $('div.pid')
    pid.classList.add('fixed-message-active')

    $('div.line-marker').className = `line-marker no-line`
    $('div.fixed-message').innerHTML = '<i class="no-trains-icon"></i><span>No trains are departing from this platform'
    $('div.fixed-message').className = `fixed-message ${getTextSize(1, 150)}`
  }

  hideNoTrains() {
    let pid = $('div.pid')
    pid.classList.remove('fixed-message-active')
  }

  showFixedMessage(text, raw) {
    let pid = $('div.pid')
    pid.classList.add('fixed-message-active')

    if (raw) $('div.fixed-message').innerHTML = text
    else $('div.fixed-message').textContent = text
    $('div.fixed-message').className = `fixed-message ${getTextSize(1, text.length)}`
  }

  hideFixedMessage() {
    let pid = $('div.pid')
    pid.classList.remove('fixed-message-active')
  }

  #setMainServiceMessageClasses() {
    let pid = $('div.pid')
    pid.classList.add('service-message-active')
  }

  showMainServiceMessage(text) {
    this.#setMainServiceMessageClasses()

    $('div.service-message').textContent = text
    $('div.service-message').className = `service-message alternating ${getTextSize(1, text.length)}`
  }

  hideMainServiceMessage() {
    let pid = $('div.pid')
    pid.classList.remove('service-message-active')

    $('div.service-message').className = `service-message`
  }

  showNextServiceMessage(text) {
    $('div.next-service-message').textContent = text
    $('div.next-service-message').className = `next-service-message text ${getTextSize(1, text.length)}`
  }

  hideNextServiceMessage() {
    $('div.next-service-message').textContent = ''
    $('div.next-service-message').className = `next-service-message`
  }

  showDisruption(origin, text) {
    $('div.next-service-message').innerHTML = `<span><strong>${origin}</strong> - ${text}</span>`
    $('div.next-service-message').className = `next-service-message disruption ${getTextSize(1, text.length)}`
  }

  showAnnouncementsMessage() {
    $('div.pid').classList.add('announcements-active')
  }

  hideAnnouncementsMessage() {
    $('div.pid').classList.remove('announcements-active')
  }

  #setArrival() {
    $('span.next-service-destination').textContent = 'Do not board'
    $('span.next-service-summary').textContent = ''

    this.#setMainServiceMessageClasses()
    $('div.service-message').innerHTML = `<i class="arrival-icon"></i><span>This train is not taking passengers.<br>Don't board this train.</span>`
    $('div.service-message').className = `service-message arrival`
  }
}

window.FullLCDPIDBase = FullLCDPIDBase