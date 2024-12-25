import { Clock } from '../pid-utils.mjs'
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
    $('span.next-service-sch-time').textContent = service.schTime

    if (service.estTime < 1) {
      $('span.next-service-est-time').textContent = 'NOW'
    } else {
      $('span.next-service-est-time').textContent = service.estTime + ' min'
    }

    $('span.next-service-destination').textContent = service.destination
    $('span.next-service-summary').textContent = service.summary

    $('div.line-marker').className = `line-marker ${service.line}`
  }

  updateServices(services) {
    this.#updateNextService(services[0])
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
  schTime: '12:34pm',
  estTime: 9,
  destination: 'Westall',
  summary: 'Express, Change at Dandenong for Cranbourne',
  line: 'pakenham',
  stops: westall
}])