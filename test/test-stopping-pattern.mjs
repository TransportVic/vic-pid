import { expect } from 'chai'
import { ArrowExpressStop, ExpressStop, Stop, StopsColumn } from '../static/scripts/metro-lcd/stopping-pattern.mjs'

let FSS_PLATFORM = {
  MAX_COLUMNS: 4,
  CONNECTION_LOSS: 2,
  MIN_COLUMN_SIZE: 6,
  MAX_COLUMN_SIZE: 9
}

let RMD_WTL = [
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

describe('The Stop class', () => {
  it('Should accept a stop name, and return if it is express based on the stop type', () => {
    let oak = new Stop('Oakleigh')
    expect(oak.getStopName()).to.equal('Oakleigh')
    expect(oak.isExpress()).to.be.false

    let cla = new ExpressStop('Clayton')
    expect(cla.getStopName()).to.equal('Clayton')
    expect(cla.isExpress()).to.be.true

    let wtl = new ArrowExpressStop('Westall')
    expect(wtl.getStopName()).to.equal('Westall')
    expect(wtl.isExpress()).to.be.true
  })
})

describe('The StopsColumn class', () => {
  it('Should take a list of Stops and convert insert express if the first stop is express', () => {
    let stopData = RMD_WTL.slice(3, 8).map(stop => stop.stops ? new Stop(stop.name) : new ExpressStop(stop.name))
    let column = new StopsColumn(stopData)

    expect(column.getStops()[0]).to.be.instanceOf(ArrowExpressStop)
    expect(column.getStops()[0].getStopName()).to.equal('Toorak')
    expect(column.getStops()[1]).to.be.instanceOf(ExpressStop).and.not.an.instanceOf(ArrowExpressStop)
    expect(column.getStops()[1].getStopName()).to.equal('Armadale')
    expect(column.getStops()[4]).to.be.instanceOf(Stop).and.not.an.instanceOf(ExpressStop)
    expect(column.getStops()[4].getStopName()).to.equal('Carnegie')
  })
})