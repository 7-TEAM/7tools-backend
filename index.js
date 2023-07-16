const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const languagesRouter = require('./src/routes/languages.route')

app.use('/static', express.static('public'))
app.use('/api/languages', languagesRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})