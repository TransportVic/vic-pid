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

if (typeof window !== 'undefined') window.ServiceListArea = ServiceListArea