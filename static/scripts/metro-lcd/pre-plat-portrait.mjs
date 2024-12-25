import { Clock, getTextSize } from '../pid-utils.mjs'
import PID from '../pid.mjs'
import { MetroLCDPlatformPID } from './platform.mjs'

export class PrePlatformPortraitPID extends MetroLCDPlatformPID {

  constructor() {
    super()
  }

  getPIDConfig() {
    return {
      MAX_COLUMNS: 2,
      CONNECTION_LOSS: 2,
      MIN_COLUMN_SIZE: 5,
      MAX_COLUMN_SIZE: 22
    }
  }

  getSubsequentServiceCount() { return 4 }
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

let pid = new PrePlatformPortraitPID()
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