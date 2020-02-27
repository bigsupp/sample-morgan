const express = require('express');
const app = express();

const path = require('path')
const morgan = require('morgan')

const fs = require('fs')
const moment = require('moment')

const logFilename = path.join(__dirname, './logs/access.log')
morgan.token('dateLocal', (req, res) => moment().format('YYYY-MM-DDTHH:mm:ss.SSS'))
const accessLogStream = fs.createWriteStream(logFilename, {
  flags: 'a+'
})
const loggerFormat = `:remote-addr - :remote-user [:dateLocal] :method :url :status :res[content-length] - :response-time ms`
app.use(morgan(loggerFormat, {
  stream: accessLogStream
  // skip: (req, res) => {
  //   if(req.originalUrl.indexOf('/library')===0) return true
  //   if(req.originalUrl.indexOf('/public')===0) return true
  //   return res.statusCode < 400
  // }
}))
// app.use(morgan('dev'))
// app.use(morgan(loggerFormat))

app.use('/', (req, res) => {
  res.send('Helloworld')
})

app.listen(8080, () => {
  console.log(`Listening on 8080`)
})