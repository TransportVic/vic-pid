import fs from 'fs/promises'
import pug from 'pug'
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
    staticContent: '/static'
  })

  await fs.writeFile(path.join(outputDir, file.file).replace('.pug', '.html'), compiled) 
}

let staticDir = path.join(__dirname, '..', 'static')
await fs.cp(staticDir, path.join(renderedDir, 'static'), { recursive: true })