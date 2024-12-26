import { FullLCDPIDBase } from './full-pid-base.mjs'

export class PrePlatformPortraitPID extends FullLCDPIDBase {

  getPIDClasses() {
    return ['pre-plat', 'portrait']
  }

  getPIDConfig() {
    return {
      MAX_COLUMNS: 2,
      CONNECTION_LOSS: 2,
      MIN_COLUMN_SIZE: 5,
      MAX_COLUMN_SIZE: 18,
      PERFECT_SPLIT: false,
    
      ALWAYS_SPLIT: true,
      ALWAYS_SPLIT_THRESHOLD: 20
    }
  }

  getSubsequentServiceCount() { return 4 }
}

window.PrePlatformPortraitPID = PrePlatformPortraitPID