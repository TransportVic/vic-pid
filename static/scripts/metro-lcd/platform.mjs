import { Clock } from '../pid-utils.mjs'
import { FullLCDPIDBase } from './full-pid-base.mjs'

export class MetroLCDPlatformPID extends FullLCDPIDBase {

  #clock

  constructor() {
    super()
    this.#clock = new Clock($('.clock'), 'h:mm:ss a')
  }

  getPIDClasses() {
    return ['platform', 'landscape']
  }

  getPIDConfig() {
    return {
      MAX_COLUMNS: 4,
      CONNECTION_LOSS: 2,
      MIN_COLUMN_SIZE: 6,
      MAX_COLUMN_SIZE: 9,
      PERFECT_SPLIT: true,
    
      ALWAYS_SPLIT: false
    }
  }

  getSubsequentServiceCount() { return 2 }
}

window.MetroLCDPlatformPID = MetroLCDPlatformPID