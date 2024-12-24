import PID from '../pid.mjs'

class MetroLCDPlatformPID extends PID {

  #updateNextService(service) {
    
  }

  updateServices(services) {
    this.#updateNextService(services[0])
  }

}

let pid = new MetroLCDPlatformPID()
window.pid = pid
pid.updateServices([{
  schTime: '12:34pm',
  estTime: '9',
  destination: 'East Pakenham',
  summary: 'Express, Change at Dandenong for Cranbourne',
  line: 'pakenham'
}])