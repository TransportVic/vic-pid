import express from 'express'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use('/static', express.static(path.join(__dirname, 'static'), {
  maxAge: 1000
}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/:pid-type', (req, res) => {
  res.render(req.params['pid-type'])
})

app.listen(8014)