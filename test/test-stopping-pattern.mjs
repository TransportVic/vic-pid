import { expect } from 'chai'
import { ArrowExpressStop, ContinuationText, ExpressStop, Stop, StopsColumn, TerminatingStop } from '../static/scripts/metro-lcd/stopping-pattern.mjs'
import { PlatformStoppingPattern } from '../static/scripts/metro-lcd/platform.mjs'

const RMD_WTL = [
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

const WER_FKN = [
  'Werribee',         'Hoppers Crossing',
  'Williams Landing', 'Aircraft',
  'Laverton',         'Newport',
  'Spotswood',        'Yarraville',
  'Seddon',           'Footscray',
  'South Kensington', 'North Melbourne',
  'Southern Cross',
  'Flinders Street', 'Richmond',
  'South Yarra',     'Hawksburn',
  'Toorak',          'Armadale',
  'Malvern',         'Caulfield',
  'Glen Huntly',     'Ormond',
  'McKinnon',        'Bentleigh',
  'Patterson',       'Moorabbin',
  'Highett',         'Southland',
  'Cheltenham',      'Mentone',
  'Parkdale',        'Mordialloc',
  'Aspendale',       'Edithvale',
  'Chelsea',         'Bonbeach',
  'Carrum',          'Seaford',
  'Kananook',        'Frankston'
].map(name => ({ name, stops: true }))

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

describe('The PlatformStoppingPattern class', () => {
  it('Truncates stops past 36 stops', () => {
    const pattern = new PlatformStoppingPattern(WER_FKN)
    expect(pattern.getColumns().length).to.equal(4)
    expect(pattern.getColumns()[3].getStops()[6].getStopName()).to.equal('Aspendale')
    expect(pattern.getColumns()[3].getStops()[7]).to.be.instanceOf(ContinuationText)
    expect(pattern.getColumns()[3].getStops()[7]).to.be.instanceOf(ContinuationText)
    expect(pattern.getColumns()[3].getStops()[8]).to.be.instanceOf(TerminatingStop)
    expect(pattern.getColumns()[3].getStops()[8].getStopName()).to.equal('Frankston')
  })
})