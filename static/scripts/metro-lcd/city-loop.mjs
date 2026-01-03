export default class CityLoop {

  #station
  #sizing
  #mount

  #svgMount
  #svgWidth
  #svgHeight

  constructor(station, sizing) {
    this.#station = station
    this.#sizing = sizing
  }

  getName() { return 'city-loop' }

  async getLoopDiagram() {
    const data = await fetch('../../static/img/city-loop.svg')
    return await data.text()
  }

  async mount(query) {
    this.#mount = $(query)
    
    const container = document.createElement('div')
    container.className = 'city-loop'
    container.innerHTML = await this.getLoopDiagram()
    this.#svgMount = container.children[0]
    this.#svgWidth = parseFloat(this.#svgMount.getAttribute('width'))
    this.#svgHeight = parseFloat(this.#svgMount.getAttribute('height'))

    this.#mount.appendChild(container)

    this.setStationHighlight()
    this.hideStationArrows()

    window.addEventListener('resize', this.onResize.bind(this))
    this.onResize()
  }

  setStationHighlight() {
    const nodes = Array.from(this.#svgMount.querySelectorAll('g, text'))
    const labelNodes = nodes.filter(node => node.id.includes('-label'))

    const activeLabels = labelNodes.filter(node => node.id.includes('-active'))
    activeLabels.forEach(label => label.style.display = 'none')

    const currentStation = labelNodes.filter(node => node.id.includes(this.#station))
    const stationActiveLabel = currentStation.find(node => node.id.includes('-active'))
    const stationBase = currentStation.find(node => !node.id.includes('-active'))

    stationActiveLabel.style.display = ''
    stationBase.style.display = 'none'
  }

  hideStationArrows() {
    const nodes = Array.from(this.#svgMount.querySelectorAll('g'))
    const arrowNodes = nodes.filter(node => node.id.match(/^\w{3}-\w{3}-\w$/))

    arrowNodes.forEach(label => label.style.display = 'none')

    this.stationArrows = arrowNodes.filter(label => label.id.startsWith(this.#station))
  }

  getContainerSize() {
    if (this.#sizing === 'width') return parseInt(getComputedStyle(this.#mount).width.slice(0, -2))
    return parseInt(getComputedStyle(this.#mount).height.slice(0, -2))
  }

  getBaseSize() {
    if (this.#sizing === 'width') return this.#svgWidth
    return this.#svgHeight
  }

  onResize() {
    const containerSize = this.getContainerSize()
    const targetSize = containerSize * 0.8
    const scaleFactor = targetSize / this.getBaseSize()

    this.#svgMount.style.transform = `scale(${scaleFactor})`
  }

}

if (typeof window !== 'undefined') window.CityLoop = CityLoop