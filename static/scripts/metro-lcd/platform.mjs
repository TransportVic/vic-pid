import { Clock } from '../pid-utils.mjs'
import { FullLCDPIDBase } from './full-pid-base.mjs'
import { PlatformStoppingPattern } from './stopping-pattern.mjs'

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

window.MetroLCDPlatformPID = MetroLCDPlatformPID