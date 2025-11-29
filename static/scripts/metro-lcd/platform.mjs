import { Clock } from '../pid-utils.mjs'
import { FullLCDPIDBase } from './full-pid-base.mjs'
import { StoppingPattern } from './stopping-pattern.mjs'

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

}

if (typeof window !== 'undefined') window.MetroLCDPlatformPID = MetroLCDPlatformPID