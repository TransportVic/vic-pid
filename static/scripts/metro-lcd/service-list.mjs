export class CompactServiceList {

  #HTML_DATA = (() => {
    const outerHTML=  $('.service-list.template').outerHTML
    const rowOuterHTML = $('.service-list.template .service-row.template').outerHTML
    return {
      outerHTML: outerHTML.replace(rowOuterHTML, '{2}').replaceAll('template', ''),
      rowOuterHTML
    }
  })()

  #name
  #lineClass
  #serviceCount

  #html

  constructor(name, lineClass, serviceCount) {
    this.#name = name
    this.#lineClass = lineClass
    this.#serviceCount = serviceCount

    this.#html = this.#HTML_DATA.outerHTML
      .replace('{0}', lineClass)
      .replace('{1}', name)
      .replace('{2}', Array(serviceCount).fill(this.#HTML_DATA.rowOuterHTML).join(''))
  }

  toHTML() {
    return this.#html
  }

}

window.CompactServiceList = CompactServiceList