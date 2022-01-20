const express = require('express')
const app = express()
const version = process.env.VERSION || 'local'


const getMessage = () => {
  const message = `Hello World! \n Version: ${version}`
  const goodMessage = message.startsWith('Hello')
  console.log(message)
  return message
}

app.get('/', (req, res) => {
  res.send(getMessage())
})

module.exports = app;
