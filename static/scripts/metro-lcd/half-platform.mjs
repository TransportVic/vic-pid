import { Clock, getTextSize } from '../pid-utils.mjs'
import PID from '../pid.mjs'
import StoppingPattern from './stopping-pattern.mjs'

export class HalfPlatformPID extends PID {

  #subsequentServiceTemplate
  #subsequentServiceCount = 2
  #currentPattern
  #clock

  constructor() {
    super()
    this.#subsequentServiceTemplate = $('.subsequent-service.template').outerHTML.replace(' template', '')
    this.#clock = new Clock($('.clock'), 'h:mm:ss a')
  }

  #updateSubsequentServices(services) {
    services.forEach((service, i) => {
      let correspondingRow = $(`.subsequent-service:nth-child(${i + 1})`)
      if (service) {
        correspondingRow.className = `subsequent-service ${service.line} ${service.disruptions.length > 0 ? 'disrupted' : ''}`

        $('.service-sch-time', correspondingRow).textContent = service.schTime
        $('.service-destination', correspondingRow).textContent = service.destination

        $('.service-summary', correspondingRow).textContent = service.summary

        $('.service-est-time', correspondingRow).textContent = this.formatEstimatedTime(service.estTime)
      } else {
        correspondingRow.className = `subsequent-service no-line`

        $('.service-sch-time', correspondingRow).textContent = '--'
        $('.service-destination', correspondingRow).textContent = '--'
        $('.service-summary', correspondingRow).textContent = ''
        $('.service-est-time', correspondingRow).textContent = `-- min`
      }
    })
  }

  getPIDConfig() {
    return {
      MAX_COLUMNS: 4,
      CONNECTION_LOSS: 2,
      MIN_COLUMN_SIZE: 5,
      MAX_COLUMN_SIZE: 6,
      PERFECT_SPLIT: true,
    
      ALWAYS_SPLIT: false
    }
  }

  updateServices(services) {
    this.hideFixedMessage()
    if (services[0]) {
      // this.hideNoTrains()
      this.#updateNextService(services[0])
    } else {
      // this.showNoTrains()
    }

    let subsequentServices = services.slice(1, 1 + this.#subsequentServiceCount)
      .concat(Array(this.#subsequentServiceCount).fill(null))
      .slice(0, this.#subsequentServiceCount)
    this.#updateSubsequentServices(subsequentServices)
  }

  #updateNextService(service) {
    this.#updateNextServiceInfo(service)
    this.#updateNextServicePattern(service)

    // if (service.isArrival) this.#setArrival()
    // else this.hideMainServiceMessage()

    // if (service.disruptions.length > 0) {
    //   let disruption = service.disruptions[0]
    //   this.showDisruption(disruption.origin, disruption.text)
    // } else this.hideNextServiceMessage()
  }

  #updateNextServiceInfo(service) {
    $('div.next-service-info').className = `next-service-info ${service.disruptions.length > 0 ? 'disrupted' : ''}`

    $('span.next-service-sch-time').textContent = service.schTime
    $('span.next-service-est-time').textContent = this.formatEstimatedTime(service.estTime)
    
    $('span.next-service-destination').textContent = service.destination
    if (service.destination.length > 18) {
      $('span.next-service-destination').className = 'next-service-destination smaller'
    } else if (service.destination.length > 15) {
      $('span.next-service-destination').className = 'next-service-destination small'
    } else {
      $('span.next-service-destination').className = 'next-service-destination'
    }

    $('span.next-service-summary').textContent = service.summary
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

}

window.HalfPlatformPID = HalfPlatformPID