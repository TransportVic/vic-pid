import { Clock } from '../pid-utils.mjs'

export default class MountableClock {

  #format
  #mount
  #clock

  constructor(format) { this.#format = format }

  getName() { return 'clock-container' }

  mount(query) {
    this.#mount = $(query)
    this.#mount.innerHTML += `<div class='clock'></div>`

    this.#clock = new Clock($('.clock'), this.#format)
  }

}

if (typeof window !== 'undefined') window.MountableClock = MountableClock