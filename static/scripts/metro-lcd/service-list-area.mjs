export class ServiceListArea {

  #components
  #mount

  constructor(components) { this.#components = components }

  escapeName(name) {
    return name.toLowerCase().replace(/[^\w]+/g, '-')
  }

  getComponentIDs() {
    return this.#components.map(component => ({ component, id: this.escapeName(component.getName()) }))
  }

  toInnerHTML() {
    return this.getComponentIDs().map(({ id }) => `<div id="${id}"></div>`).join('')
  }

  toHTML() {
    return `<div class="sections">${this.toInnerHTML()}</div>`
  }

  mount(query) {
    this.#mount = $(query)
    this.#mount.innerHTML += this.toHTML()
    this.getComponentIDs().forEach(({ component, id }) => component.mount(`#${id}`))
  }

}

export class HalfServiceListArea extends ServiceListArea {

  #side

  constructor(components, side) {
    super(components)
    this.#side = side
  }

  getName() {
    return this.#side
  }

  toHTML() {
    return this.toInnerHTML()
  }

}

if (typeof window !== 'undefined') {
  window.ServiceListArea = ServiceListArea
  window.HalfServiceListArea = HalfServiceListArea
}