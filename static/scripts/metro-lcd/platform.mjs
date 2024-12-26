import { Clock, getTextSize } from '../pid-utils.mjs'
import PID from '../pid.mjs'
import StoppingPattern from './stopping-pattern.mjs'

export class MetroLCDPlatformPID extends PID {

  #clock

  constructor(type = 'platform') {
    super()
    if ($('.clock')) this.#clock = new Clock($('.clock'), 'h:mm:ss a')
    if (type !== 'platform') {
      $('div.pid').classList.remove('platform')
      $('div.pid').classList.add(type)
    }
  }

  getPIDConfig() {
    return {
      MAX_COLUMNS: 4,
      CONNECTION_LOSS: 2,
      MIN_COLUMN_SIZE: 6,
      MAX_COLUMN_SIZE: 9,
      PERFECT_SPLIT: true,
    
      ALWAYS_SPLIT: false
    }
  }

  getSubsequentServiceCount() { return 2 }

  #updateSubsequentServices(services) {
    services.forEach((service, i) => {
      let correspondingRow = $(`.subsequent-service:nth-child(${i + 1})`)
      if (service) {
        correspondingRow.className = `subsequent-service ${service.line}`

        $('.service-sch-time span', correspondingRow).textContent = service.schTime

        let destination = $('.service-destination span', correspondingRow)
        destination.textContent = service.destination
        destination.setAttribute('disrupted', service.disruptions.length > 0)

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
      this.#showDisruption(disruption.origin, disruption.text)
    } else this.hideNextServiceMessage()
  }

  #updateNextServicePattern(service) {
    let stoppingPattern = new StoppingPattern(service.stops, false, this.getPIDConfig())
    $('.next-service-pattern').innerHTML = stoppingPattern.toHTML()
    $('.next-service-pattern').className = `next-service-pattern ${service.line}`
  }

  #updateNextServiceInfo(service) {
    $('div.next-service-info').className = `next-service-info ${service.line}`

    $('span.next-service-sch-time').textContent = service.schTime
    $('span.next-service-est-time').textContent = this.formatEstimatedTime(service.estTime)

    $('span.next-service-platform').textContent = service.platform
    
    let destination = $('span.next-service-destination')
    destination.setAttribute('disrupted', service.disruptions.length > 0)
    destination.textContent = service.destination
    $('span.next-service-summary').textContent = service.summary

    $('div.line-marker').className = `line-marker ${service.line}`
  }

  updateServices(services) {
    this.hideFixedMessage()
    this.#updateNextService(services[0])

    let subSvcCount = this.getSubsequentServiceCount()
    let subsequentServices = services.slice(1, 1 + subSvcCount)
      .concat(Array(subSvcCount).fill(null))
      .slice(0, subSvcCount)
    this.#updateSubsequentServices(subsequentServices)
  }

  showFixedMessage(text) {
    let pid = $('div.pid')
    pid.classList.add('fixed-message-active')

    $('div.fixed-message').textContent = text
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

  hideNextServiceMessage(text) {
    $('div.next-service-message').textContent = ''
    $('div.next-service-message').className = `next-service-message`
  }

  #showDisruption(origin, text) {
    $('div.next-service-message').innerHTML = `<span><strong>${origin}</strong> - ${text}</span>`
    $('div.next-service-message').className = `next-service-message disruption ${getTextSize(1, text.length)}`
  }

  #setArrival() {
    this.#setMainServiceMessageClasses()
    $('div.service-message').innerHTML = `This train is not taking passengers.<br>Don't board this train.`
    $('div.service-message').className = `service-message arrival`
  }
}

window.MetroLCDPlatformPID = MetroLCDPlatformPID