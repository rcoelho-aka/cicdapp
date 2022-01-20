const express = require('express')
const app = express()
const version = process.env.VERSION || 'local'


const getMessage = () => {
  return `Hello World! \n Version: ${version}`
}

app.get('/', (req, res) => {
  const message = getMessage()
  res.send(message)
})

module.exports = app;
