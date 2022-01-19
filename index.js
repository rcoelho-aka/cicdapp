const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const version = process.env.VERSION || 'local'

app.get('/', (req, res) => {
  res.send(`Hello Rui! \n Version: ${version}`)
})

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})
