import { expect } from 'chai'
import { PlatformStoppingPattern, ArrowExpressStop, ExpressStop, Stop, StopsColumn, TerminatingStop } from '../static/scripts/metro-lcd/stopping-pattern.mjs'

let RMD_WTL = [
  { name: 'Richmond', stops: true },
  { name: 'South Yarra', stops: true },
  { name: 'Hawksburn', stops: false },
  { name: 'Toorak', stops: false },
  { name: 'Armadale', stops: false },
  { name: 'Malvern', stops: false },
  { name: 'Caulfield', stops: true },
  { name: 'Carnegie', stops: false },
  { name: 'Murrumbeena', stops: false },
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
  it('Should take a list of Stops and convert the first express to an arrow express', () => {
    let stopData = RMD_WTL.slice(3).map(stop => stop.stops ? new Stop(stop.name) : new ExpressStop(stop.name))
    let column = new StopsColumn(stopData)

    expect(column.getStops()[0]).to.be.instanceOf(ArrowExpressStop)
    expect(column.getStops()[0].getStopName()).to.equal('Toorak')
    expect(column.getStops()[1]).to.be.instanceOf(ExpressStop).and.not.an.instanceOf(ArrowExpressStop)
    expect(column.getStops()[1].getStopName()).to.equal('Armadale')

    expect(column.getStops()[4]).to.be.instanceOf(ArrowExpressStop)
    expect(column.getStops()[4].getStopName()).to.equal('Carnegie')
    expect(column.getStops()[5]).to.be.instanceOf(ExpressStop).and.not.an.instanceOf(ArrowExpressStop)
    expect(column.getStops()[5].getStopName()).to.equal('Murrumbeena')

    expect(column.getStops()[6]).to.be.instanceOf(Stop).and.not.an.instanceOf(ExpressStop)
    expect(column.getStops()[6].getStopName()).to.equal('Hughesdale')
  })
})

describe('The StoppingPattern class', () => {
  it('Should break a list of stops down into their columns', () => {
    let pattern = new PlatformStoppingPattern(RMD_WTL)

    expect(pattern.getColumns().length).to.equal(2)
    expect(pattern.getColumns()[0]).to.be.instanceOf(StopsColumn)
    expect(pattern.getColumns()[0].getStops()[0].getStopName()).to.equal('Richmond')

    expect(pattern.getColumns()[1].getStops()[0].getStopName()).to.equal('Carnegie')
    expect(pattern.getColumns()[1].getStops()[0]).to.be.instanceOf(ArrowExpressStop)
  })

  it('Should mark the last stop of the last column as a terminating stop', () => {
    let pattern = new PlatformStoppingPattern(RMD_WTL)

    expect(pattern.getColumns()[1].getStops()[6].getStopName()).to.equal('Westall')
    expect(pattern.getColumns()[1].getStops()[6]).to.be.instanceOf(TerminatingStop)
  })
})