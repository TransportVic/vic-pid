import { FullLCDPIDBase } from './full-pid-base.mjs'
import { PrePlatPortraitStoppingPattern } from './stopping-pattern.mjs'

export class PrePlatformPortraitPID extends FullLCDPIDBase {

  BASE_SVC_COUNT = 4

  getPIDClasses() {
    return ['pre-plat', 'portrait']
  }

  createStoppingPattern(stops) {
    return new PrePlatPortraitStoppingPattern(stops)
  }

  getSubsequentServiceCount() {
    if (this.getCurrentPattern() && this.getCurrentPattern().getSize() > 18) return 1
    return this.BASE_SVC_COUNT
  }

  showNextServiceMessage(text) {
    if (this.getSubsequentServiceCount() !== this.BASE_SVC_COUNT) return
    super.showNextServiceMessage(text)
  }

  showDisruption(origin, text) {
    if (this.getSubsequentServiceCount() !== this.BASE_SVC_COUNT) return
    super.showDisruption(origin, text)
  }
}

window.PrePlatformPortraitPID = PrePlatformPortraitPID