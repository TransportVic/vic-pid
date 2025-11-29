export class Header {
  
  #text
  #mount

  constructor(text) { this.#text = text }

  getClasses() { return '' }

  toHTML() {
    return `<div class="header ${this.getClasses()}">
      <span>${this.#text}</span>
    </div>`
  }

  mount(query) {
    this.#mount = $(query)
    this.#mount.innerHTML += this.toHTML()
  }

}

export class BoldHeader extends Header {

  getClasses() { return 'bold' }

}

if (typeof window !== 'undefined') window.Header = Header
if (typeof window !== 'undefined') window.BoldHeader = BoldHeader