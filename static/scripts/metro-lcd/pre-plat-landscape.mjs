import { MetroLCDPlatformPID, PlatformStoppingPattern } from './platform.mjs'

export class PrePlatformLandscapePID extends MetroLCDPlatformPID {

  getPIDClasses() {
    return ['pre-plat', 'landscape']
  }

  // TODO: Fix to use its own class as we know it has issues at SHM at FSS
  createStoppingPattern(service) {
    return new PlatformStoppingPattern(service.stops)
  }

}

if (typeof window !== 'undefined') window.PrePlatformLandscapePID = PrePlatformLandscapePID