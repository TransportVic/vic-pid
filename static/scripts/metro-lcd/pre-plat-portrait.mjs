import { MetroLCDPlatformPID } from './platform.mjs'

export class PrePlatformPortraitPID extends MetroLCDPlatformPID {

  constructor() {
    super()
  }

  getPIDConfig() {
    return {
      MAX_COLUMNS: 2,
      CONNECTION_LOSS: 2,
      MIN_COLUMN_SIZE: 5,
      MAX_COLUMN_SIZE: 22
    }
  }

  getSubsequentServiceCount() { return 4 }
}

window.PrePlatformPortraitPID = PrePlatformPortraitPID