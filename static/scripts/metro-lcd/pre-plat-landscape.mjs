import { MetroLCDPlatformPID } from './platform.mjs'

export class PrePlatformLandscapePID extends MetroLCDPlatformPID {

  getPIDClasses() {
    return ['pre-plat', 'landscape']
  }
}

window.PrePlatformLandscapePID = PrePlatformLandscapePID