import PID from '../pid.mjs'

class MetroLCDPlatformPID extends PID {

  #updateNextService(service) {
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

let pid = new MetroLCDPlatformPID()
window.pid = pid
pid.updateServices([{
  schTime: '12:34pm',
  estTime: 9,
  destination: 'Westall',
  summary: 'Express, Change at Dandenong for Cranbourne',
  line: 'pakenham',
  stops: [
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
}])