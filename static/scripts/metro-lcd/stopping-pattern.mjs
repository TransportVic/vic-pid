export class StoppingPattern {

  #columns
  #size

  constructor(stops) {
    const { columns, size } = this.constructor.splitStops(stops)

    this.#columns = columns.map(column => new StopsColumn(column))
    this.#columns[this.#columns.length - 1].markTerminating()
    this.#size = Math.floor(size / 5) * 5
  }

  getColumns() { return this.#columns }
  getSize() { return this.#size }

  toHTML() {
    return `<div class="stopping-pattern col-${this.getColumns().length} row-${this.#size}">
      ${this.getColumns().map(column => column.toHTML()).join('')}
    </div>`
  }

  static splitStops(stops) {
    const rowCount = this.getRowCountSize(stops)
    return this.splitStopsIntoColumns(stops, rowCount)
  }

  static getRowCountSize(stops) {
    throw new Error()
  }

  static splitStopsIntoColumns(stops, columnSize) {
    let parts = []
  
    let start = 0
    for (let i = 0; true; i++) {
      let end = start + columnSize
      let part = stops.slice(start, end)
      if (part.length === 0) break
      parts.push(part)
      start = end
    }

    return { columns: parts, size: columnSize }
  }
}

export class PlatformStoppingPattern extends StoppingPattern {
  
  static getRowCountSize(stops) {
    if (stops.length === 16) return 8

    if (stops.length < 28) return 7
    if (stops.length < 32) return 8
    return 9
  }

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

  markTerminating() {
    let lastStop = this.#stops[this.#stops.length - 1]
    this.#stops[this.#stops.length - 1] = new TerminatingStop(lastStop.getStopName())
  }

  toHTML() {
    return `<div class="stop-column">
      <div class="stop-continuation-marker"></div>
      ${this.getStops().map(stop => stop.toHTML()).join('')}
      <div class="stop-continuation-marker"></div>
    </div>`
  }

}

export class Stop {

  #stopName

  constructor(stopName) {
    this.#stopName = stopName
  }

  getStopName() { return this.#stopName }
  isExpress() { return false }

  getClassName() { return 'stopping' }

  toHTML() {
    return `<div class="station-row ${this.getClassName()}">
      <div class="column-bullet-container">
        <div class="column-backing"></div>
        <div class="column-bullet"></div>
      </div>
      <span class="station-row-name">${this.getStopName()}</span>
    </div>`
  }

}

export class ExpressStop extends Stop {
  
  isExpress() { return true }
  getClassName() { return 'express' }

}

export class ArrowExpressStop extends ExpressStop {
  
  isExpress() { return true }
  getClassName() { return 'express express-arrow' }

}

export class TerminatingStop extends Stop {

}