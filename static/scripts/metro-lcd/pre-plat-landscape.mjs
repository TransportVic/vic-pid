import { MetroLCDPlatformPID } from './platform.mjs'

export class PrePlatformLandscapePID extends MetroLCDPlatformPID {

  getPIDClasses() {
    return ['pre-plat', 'landscape']
  }

  createStoppingPattern(stops) {
    return new PlatformStoppingPattern(stops)
  }

}

window.PrePlatformLandscapePID = PrePlatformLandscapePID