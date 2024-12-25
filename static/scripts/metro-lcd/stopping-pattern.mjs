import { splitStops } from '../pid-utils.mjs'

export default class StoppingPattern {

  constructor(stops, cutoff, options) {
    let columns = splitStops(stops.map(stop => new Stop(stop.name, stop.stops)), false, options)
  }

}

export class StopsColumn {

  #stops

  constructor(stops) {
    this.#stops = stops
  }

}

export class Stop {

  #stopName
  #stopsAt

  constructor(stopName, stopsAt) {
    this.#stopName = stopName
    this.#stopsAt = stopsAt
  }

  getStopName() { return this.#stopName }
  stopsAt() { return this.#stopsAt }

}