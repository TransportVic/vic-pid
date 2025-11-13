import { Clock } from '../pid-utils.mjs'
import PID from '../pid.mjs'
import StoppingPattern from './stopping-pattern.mjs'

export class HalfPlatformPID extends PID {

  #clock
  #currentPattern

  constructor() {
    super()
    // this.#clock = new Clock($('.clock'), 'h:mm:ss a')
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

    // let subSvcCount = this.getSubsequentServiceCount()
    // let subsequentServices = services.slice(1, 1 + subSvcCount)
    //   .concat(Array(subSvcCount).fill(null))
    //   .slice(0, subSvcCount)
    // this.#updateSubsequentServices(subsequentServices)
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

}

window.HalfPlatformPID = HalfPlatformPID