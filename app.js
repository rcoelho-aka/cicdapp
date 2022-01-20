const express = require('express')
const app = express()
const version = process.env.VERSION || 'local'

app.get('/', (req, res) => {
  res.send(`Hello World! \n Version: ${version}`)
})

module.exports = app;