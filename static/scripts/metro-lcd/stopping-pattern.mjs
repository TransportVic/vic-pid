import { splitStops } from '../pid-utils.mjs'

export default class StoppingPattern {

  #columns

  constructor(stops, cutoff, options) {
    let { columns } = splitStops(
      stops.map(stop => stop.stops ? new Stop(stop.name) : new ExpressStop(stop.name)),
      false, options
    )

    this.#columns = columns.map(column => new StopsColumn(column))
  }

  getColumns() { return this.#columns }

}

export class StopsColumn {

  #stops

  constructor(stops) {
    this.#stops = stops.map((stop, i) => {
      if (stop.isExpress() && (i === 0 || !stops[i - 1].isExpress())) {
        return new ArrowExpressStop(stop.getStopName())
      }

      return stop
    })
  }

  getStops() { return this.#stops }

}

export class Stop {

  #stopName

  constructor(stopName) {
    this.#stopName = stopName
  }

  getStopName() { return this.#stopName }
  isExpress() { return false }

}

export class ExpressStop extends Stop {
  
  isExpress() { return true }

}

export class ArrowExpressStop extends ExpressStop {
  
  isExpress() { return true }

}

export class TerminatingStop extends Stop {
  
}