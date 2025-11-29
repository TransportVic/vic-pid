export function calculateLineNumber(stationsCount, hasConnections, options) {
  let MAX_COLUMNS = options.MAX_COLUMNS
  let CONNECTION_LOSS = options.CONNECTION_LOSS
  let MIN_COLUMN_SIZE = options.MIN_COLUMN_SIZE
  let MAX_COLUMN_SIZE = options.MAX_COLUMN_SIZE

  // total stations with extras due to spillover from space lost due to connection message - 2 per row * last 3 rows = 6
  let totalStations = stationsCount - 1 + (hasConnections ? (MAX_COLUMNS - 1) * CONNECTION_LOSS : 0)

  if (options.PERFECT_SPLIT) {
    let perfectSplit = stationsCount / 2
    if (!hasConnections && (perfectSplit % 1 === 0) && MIN_COLUMN_SIZE < perfectSplit && perfectSplit < MAX_COLUMN_SIZE) return perfectSplit
  }

  if (options.ALWAYS_SPLIT && stationsCount > options.ALWAYS_SPLIT_THRESHOLD) {
    return Math.ceil(stationsCount / 2)
  }

  for (let columnSize = MIN_COLUMN_SIZE; columnSize <= MAX_COLUMN_SIZE; columnSize++) {
    if (MAX_COLUMNS * columnSize >= totalStations) {
      return Math.floor((columnSize + MAX_COLUMN_SIZE) / 2)
    }
  }

  return MAX_COLUMN_SIZE // will probably spill but its fine - theres a reason some spots don't have a list PIDS
}

export function splitStops(stops, hasConnections, options) {
  let size = calculateLineNumber(stops.length, hasConnections, options)

  let parts = []

  let start = 0
  for (let i = 0; true; i++) {
    let end = start + size
    if (hasConnections) {
      end -= i * options.CONNECTION_LOSS
    }

    let part = stops.slice(start, end)
    if (part.length === 0) return { columns: parts, size }
    parts.push(part)
    start = end
  }
}

export function getTextSize(lines, length) {
  if (lines > 4 || length > 120) return 'msg-size-1'
  if (lines > 4 || length > 70) return 'msg-size-2'
  if (lines > 2 || length > 40) return 'msg-size-3'
  if (lines > 2 || length > 20) return 'msg-size-4'

  return 'msg-size-5'
}

export class Clock {

  static TIMEZONE = 'Australia/Melbourne'

  #element
  #format

  constructor(element, format) {
    this.#element = element
    this.#format = format
    this.setup()
  }

  setup() {
    this.updateTime()
    let msToNextSecond = 1000 - (+new Date() % 1000)
    setTimeout(() => {
      this.updateTime()
      setInterval(() => this.updateTime(), 1000)
    }, msToNextSecond)
  }

  updateTime() {
    this.#element.textContent = dayjs().tz(this.constructor.TIMEZONE).format(this.#format)
  }
}

if (typeof window !== 'undefined') window.Clock = Clock