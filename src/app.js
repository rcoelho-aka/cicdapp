const express = require('express')
const app = express()
const version = process.env.VERSION || 'local'


const getMessage = () => {
  const message = `Hello World! \n Version: ${version}`
  const goodMessage = message.startsWith('Hello')

  if (goodMessage)
    return message

  //console.log(message)
}

app.get('/', (req, res) => {
  const message = getMessage()
  res.send(getMessage())
})

module.exports = app;
