const express = require('express')
const app = express()
const version = process.env.VERSION || 'local'


const getMessage = () => {
  const message = `Hello World! \n Version: ${version}`
  
  if (message.startsWith('Hello')) return message

  console.log(message)
}

app.get('/', (req, res) => {
  const message = getMessage()
  res.send(message)
})

module.exports = app;
