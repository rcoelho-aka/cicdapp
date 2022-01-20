const express = require('express');
const app = express();
const version = process.env.VERSION || 'local';


const getMessage = () => {
  const message = `Hello World! \n Version: ${version}`;
  return message.startsWith('Hello') ? message : console.log(message);
};

app.get('/', (req, res) => {
  res.send(getMessage());
});

module.exports = app;
