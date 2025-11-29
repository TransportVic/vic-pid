import { FullLCDPIDBase } from './full-pid-base.mjs'
import { StoppingPattern } from './stopping-pattern.mjs'

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

export class PrePlatPortraitStoppingPattern extends StoppingPattern {

  static getColumnSize(stops) {
    return Math.max(this.getMinColumnSize(stops.length), Math.ceil(stops.length / 2))
  }

  static getMinColumnSize(count) {
    if (count === 15) return 15
    if (count === 16) return 13
    return 14
  }

}

if (typeof window !== 'undefined') window.PrePlatformPortraitPID = PrePlatformPortraitPID