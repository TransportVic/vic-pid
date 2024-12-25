import { Clock, getTextSize } from '../pid-utils.mjs'
import PID from '../pid.mjs'
import StoppingPattern from './stopping-pattern.mjs'

class MetroLCDPlatformPID extends PID {

  #clock

  constructor() {
    super()
    this.#clock = new Clock($('.clock'), 'h:mm:ss a')
  }

  #PID_CONFIG = {
    MAX_COLUMNS: 4,
    CONNECTION_LOSS: 2,
    MIN_COLUMN_SIZE: 6,
    MAX_COLUMN_SIZE: 9
  }

  #SUB_SVC_COUNT = 2

  #updateSubsequentServices(services) {
    services.forEach((service, i) => {
      let correspondingRow = $(`.subsequent-service:nth-child(${i + 1})`)
      if (service) {
        correspondingRow.className = `subsequent-service ${service.line}`

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
  }

  #updateNextServicePattern(service) {
    let stoppingPattern = new StoppingPattern(service.stops, false, this.#PID_CONFIG)
    $('.next-service-pattern').innerHTML = stoppingPattern.toHTML()
    $('.next-service-pattern').className = `next-service-pattern ${service.line}`
  }

  #updateNextServiceInfo(service) {
    $('div.next-service-info').className = `next-service-info ${service.line}`

    $('span.next-service-sch-time').textContent = service.schTime
    $('span.next-service-est-time').textContent = this.formatEstimatedTime(service.estTime)

    $('span.next-service-platform').textContent = service.platform

    $('span.next-service-destination').textContent = service.destination
    $('span.next-service-summary').textContent = service.summary

    $('div.line-marker').className = `line-marker ${service.line}`
  }

  updateServices(services) {
    this.hideFixedMessage()
    this.#updateNextService(services[0])

    let subsequentServices = services.slice(1, 1 + this.#SUB_SVC_COUNT)
      .concat(Array(this.#SUB_SVC_COUNT).fill(null))
      .slice(0, this.#SUB_SVC_COUNT)
    this.#updateSubsequentServices(subsequentServices)
  }

  showFixedMessage(text) {
    let pid = $('div.pid')
    pid.classList.remove('service-message-active')
    pid.classList.remove('showing-departure')
    pid.classList.add('fixed-message-active')

    $('div.fixed-message').textContent = text
    $('div.fixed-message').className = `fixed-message ${getTextSize(1, text.length)}`
  }

  hideFixedMessage() {
    let pid = $('div.pid')
    pid.classList.remove('service-message-active')
    pid.classList.remove('fixed-message-active')
    pid.classList.add('showing-departure')
  }

  showMainServiceMessage(text) {
    let pid = $('div.pid')
    pid.classList.remove('fixed-message-active')
    pid.classList.remove('showing-departure')
    pid.classList.add('service-message-active')

    $('div.fixed-message').textContent = text
    $('div.fixed-message').className = `fixed-message ${getTextSize(1, text.length)}`
  }

  hideMainServiceMessage() {
    this.hideFixedMessage()
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

let pid = new MetroLCDPlatformPID()
window.pid = pid
pid.updateServices([{
  schTime: '07:30am',
  estTime: 0,
  destination: 'Bairnsdale',
  summary: 'Not Taking Suburban Passengers',
  line: 'vline',
  platform: '6',
  stops: bairnsdale,
  disruptions: [{
    text: 'Due to the forecast temperature on Thursday, 26 December, we are runing a Full Extreme Heat timetable on the Traralgon and Bairnsdale Lines.'
  }]
}, {
  schTime: '07:34am',
  estTime: 4,
  destination: 'Westall',
  summary: 'Express',
  line: 'pakenham',
  platform: '6',
  stops: westall,
  disruptions: []
}, {
  schTime: '07:37am',
  estTime: 7,
  destination: 'Frankston',
  summary: 'Express',
  line: 'frankston',
  platform: '6',
  stops: westall,
  disruptions: []
}])