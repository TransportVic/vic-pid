import fs from 'fs/promises'
import pug, { render } from 'pug'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function walkDir(dir) {
  async function walk(dir) {
    let results = []
    let list = await fs.readdir(dir)

    for (let file of list) {
      let filePath = path.resolve(dir, file)
      let stat = await fs.stat(filePath)
      if (stat.isDirectory()) {
        results.push(...await walk(filePath))
      } else {
        results.push({ dir, file, path: filePath })
      }
    }

    return results
  }

  return (await walk(dir)).map(file => {
    file.dir = file.dir.replace(dir, '').slice(1)
    return file
  })
}

let pugFiles = (await walkDir(path.join(__dirname, '..', 'views'))).filter(file => file.file.endsWith('.pug'))
let dirsSeen = ['']
let renderedDir = path.join(__dirname, '..', 'rendered')

try { await fs.mkdir(renderedDir) } catch (e) {}

for (let file of pugFiles) {
  let outputDir = path.join(renderedDir, file.dir)
  if (!dirsSeen.includes(file.dir)) {
    dirsSeen.push(file.dir)
    try { await fs.mkdir(outputDir) } catch (e) {}
  }

  let compiled = pug.compileFile(file.path)({
    staticContent: '/static',
    testing: true
  })

  await fs.writeFile(path.join(outputDir, file.file).replace('.pug', '.html'), compiled) 
}

let pids = pugFiles.filter(file => file.dir !== 'core').map(file => {
  let name = path.join(file.dir, file.file).slice(0, -4)
  return {
    name,
    href: name + '.html'
  }
})

let fullPIDBaseIndex = pids.findIndex(pid => pid.name === 'metro-lcd/full-pid-base')
let fullPIDBase = pids[fullPIDBaseIndex]
pids.splice(fullPIDBaseIndex, 1)

pids.push({
  name: 'metro-lcd/platform',
  href: fullPIDBase.href + '#platform'
}, {
  name: 'metro-lcd/pre-plat-landscape',
  href: fullPIDBase.href + '#pre-plat-landscape'
}, {
  name: 'metro-lcd/pre-plat-portrait',
  href: fullPIDBase.href + '#pre-plat-portrait'
})

pids.sort((a, b) => a.name.localeCompare(b.name))

await fs.writeFile(path.join(renderedDir, 'index.html'), pug.compileFile(path.join(__dirname, 'index.pug'))({
  staticContent: '/static',
  pids
})) 

let staticDir = path.join(__dirname, '..', 'static')
await fs.cp(staticDir, path.join(renderedDir, 'static'), { recursive: true })