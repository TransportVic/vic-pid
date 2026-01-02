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

export class BoldLineHeader extends BoldHeader {

  #line

  constructor(name, line) {
    super(name)
    this.#line = line
  }

  getClasses() {
    return super.getClasses() + ' multiline'
  }

  toHTML() {
    return `<div class="line-marker page-header ${this.#line}"></div>` + super.toHTML()
  }
}

export class MiniBoldLineHeader extends BoldLineHeader {

  getClasses() {
    return super.getClasses() + ' multiline mini'
  }
}

if (typeof window !== 'undefined') window.Header = Header
if (typeof window !== 'undefined') window.BoldHeader = BoldHeader
if (typeof window !== 'undefined') window.BoldLineHeader = BoldLineHeader
if (typeof window !== 'undefined') window.MiniBoldLineHeader = MiniBoldLineHeader