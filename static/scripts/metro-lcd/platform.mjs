import { Clock } from '../pid-utils.mjs'
import { FullLCDPIDBase } from './full-pid-base.mjs'
import { ContinuationText, StoppingPattern, TerminatingStop } from './stopping-pattern.mjs'

export class MetroLCDPlatformPID extends FullLCDPIDBase {

  #clock

  constructor() {
    super()
    this.#clock = new Clock($('.clock'), 'h:mm:ss a')
  }

  getPIDClasses() {
    return ['platform', 'landscape']
  }

  createStoppingPattern(stops) {
    return new PlatformStoppingPattern(stops)
  }

  getSubsequentServiceCount() { return 2 }
}

export class PlatformStoppingPattern extends StoppingPattern {
  
  static getColumnSize(stops) {
    if (stops.length === 16) return 8

    if (stops.length < 28) return 7
    if (stops.length < 32) return 8
    return 9
  }

  static splitStopsIntoColumns(stops, columnSize) {
    const split = super.splitStopsIntoColumns(stops, columnSize)
    const { columns, size } = split

    if (columns.length <= 4) return split
    
    const destination = stops[stops.length - 1]
    return { columns: columns.slice(0, 3).concat([[
      ...columns[3].slice(0, -2),
      new ContinuationText(),
      new TerminatingStop(destination.getStopName())
    ]]), size }
  }

}

if (typeof window !== 'undefined') window.MetroLCDPlatformPID = MetroLCDPlatformPID