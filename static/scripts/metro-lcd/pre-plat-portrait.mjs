import { FullLCDPIDBase } from './full-pid-base.mjs'

export class PrePlatformPortraitPID extends FullLCDPIDBase {

  #BASE_SVC_COUNT = 4

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

  getSubsequentServiceCount() {
    if (this.getCurrentPattern().getSize() > 18) return 1
    return this.#BASE_SVC_COUNT
  }

  showNextServiceMessage(text) {
    if (this.getSubsequentServiceCount() !== this.#BASE_SVC_COUNT) return
    super.showNextServiceMessage(text)
  }

  showDisruption(origin, text) {
    if (this.getSubsequentServiceCount() !== this.#BASE_SVC_COUNT) return
    super.showDisruption(origin, text)
  }
}

window.PrePlatformPortraitPID = PrePlatformPortraitPID