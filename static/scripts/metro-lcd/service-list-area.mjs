export class ServiceListArea {

  #components
  #mount
  #borderStyle

  constructor(components, borderStyle) {
    this.#components = components
    this.#borderStyle = borderStyle
  }

  escapeName(name) {
    return name.toLowerCase().replace(/[^\w]+/g, '-')
  }

  getComponentClass() { return 'section-inner' }

  getComponentIDs() {
    return this.#components.map(component => ({ component, id: this.escapeName(component.getName()) }))
  }

  toInnerHTML() {
    return this.getComponentIDs().map(({ id }) => `<div class="${this.getComponentClass()}" id="${id}"></div>`).join('')
  }

  toHTML() {
    return `<div class="sections ${this.#borderStyle || ''}">${this.toInnerHTML()}</div>`
  }

  mount(query) {
    this.#mount = $(query)
    this.#mount.innerHTML += this.toHTML()
    this.getComponentIDs().forEach(({ component, id }) => component.mount(`#${id}`))
  }

  addComponent(component) {
    this.#components.push(component)
  }

}

export class HalfServiceListArea extends ServiceListArea {

  #side
  #borderStyle

  constructor(components, side, borderStyle) {
    super(components)
    this.#side = side
    this.#borderStyle = borderStyle
  }

  getName() {
    return this.#side
  }

  getComponentClass() { return '' }

  toHTML() {
    return this.toInnerHTML()
  }

}

if (typeof window !== 'undefined') {
  window.ServiceListArea = ServiceListArea
  window.HalfServiceListArea = HalfServiceListArea
}