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
      MAX_COLUMN_SIZE: 9
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

let bairnsdale = [
  { name: 'Flinders Street', stops: true },
  { name: 'Richmond', stops: false },
  { name: 'South Yarra', stops: false },
  { name: 'Hawksburn', stops: false },
  { name: 'Toorak', stops: false },
  { name: 'Armadale', stops: false },
  { name: 'Malvern', stops: false },
  { name: 'Caulfield', stops: false },
  { name: 'Carnegie', stops: false },
  { name: 'Murrumbeena', stops: false },
  { name: 'Hughesdale', stops: false },
  { name: 'Oakleigh', stops: false },
  { name: 'Huntingdale', stops: false },
  { name: 'Clayton', stops: false },
  { name: 'Westall', stops: false },
  { name: 'Springvale', stops: false },
  { name: 'Sandown Park', stops: false },
  { name: 'Noble Park', stops: false },
  { name: 'Yarraman', stops: false },
  { name: 'Dandenong', stops: false },
  { name: 'Hallam', stops: false },
  { name: 'Narre Warren', stops: false },
  { name: 'Berwick', stops: false },
  { name: 'Beaconsfield', stops: false },
  { name: 'Officer', stops: false },
  { name: 'Cardinia Road', stops: false },
  { name: 'Pakenham', stops: true },
  { name: 'East Pakenham', stops: false },
  { name: 'Nar Nar Goon', stops: false },
  { name: 'Tynong', stops: false },
  { name: 'Garfield', stops: true },
  { name: 'Bunyip', stops: false },
  { name: 'Longwarry', stops: false },
  { name: 'Drouin', stops: true },
  { name: 'Warragul', stops: true },
  { name: 'Yarragon', stops: false },
  { name: 'Trafalgar', stops: false },
  { name: 'Moe', stops: true },
  { name: 'Morwell', stops: true },
  { name: 'Traralgon', stops: true },
  { name: 'Rosedale', stops: true },
  { name: 'Sale', stops: true },
  { name: 'Stratford', stops: true },
  { name: 'Bairnsdale', stops: true }
]

let westall = [
  { name: 'Flinders Street', stops: true },
  { name: 'Richmond', stops: true },
  { name: 'South Yarra', stops: true },
  { name: 'Hawksburn', stops: false },
  { name: 'Toorak', stops: false },
  { name: 'Armadale', stops: false },
  { name: 'Malvern', stops: false },
  { name: 'Caulfield', stops: true },
  { name: 'Carnegie', stops: true },
  { name: 'Murrumbeena', stops: true },
  { name: 'Hughesdale', stops: true },
  { name: 'Oakleigh', stops: true },
  { name: 'Huntingdale', stops: true },
  { name: 'Clayton', stops: true },
  { name: 'Westall', stops: true }
]

let pid = new MetroLCDPlatformPID(Object.keys(search.hash)[0] || 'platform')
window.pid = pid
pid.updateServices([{
  schTime: '7:30am',
  estTime: 0,
  destination: 'Bairnsdale',
  summary: 'Not Taking Suburban Passengers',
  line: 'vline',
  platform: '6',
  stops: bairnsdale,
  disruptions: [{
    origin: 'Bairnsdale',
    text: 'Due to the forecast temperature on Thursday, 26 December, we are runing a Full Extreme Heat timetable on the Traralgon and Bairnsdale Lines.'
  }],
  isArrival: false
}, {
  schTime: '7:34am',
  estTime: 4,
  destination: 'Westall',
  summary: 'Express',
  line: 'pakenham',
  platform: '6',
  stops: westall,
  disruptions: [],
  isArrival: false
}, {
  schTime: '7:37am',
  estTime: 7,
  destination: 'Cheltenham',
  summary: 'Express',
  line: 'frankston',
  platform: '6',
  stops: westall,
  disruptions: [{
    origin: 'Cheltenham',
    text: 'Train services are disrupted between Cheltenham and Frankston. Alternative transport has been arranged Metro Trains apologises for any inconvenience.'
  }],
  isArrival: false
}])