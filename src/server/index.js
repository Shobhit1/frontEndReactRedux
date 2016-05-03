import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import session from 'express-session'
import SessionStore from 'session-file-store'
import bodyParser from 'body-parser'
import config from '../../webpack.config.js'
import ApiRouter from './ApiRouter'
import path from 'path'
import yargs from 'yargs'
import fs from 'fs'
import http from 'http'
import https from 'https'
import compression from 'compression'

const args = yargs.default('env', 'development').argv
const app = express()
const compiler = webpack(config(args.env || 'development'))

app.use(session({
  name: 'SessionID',
  secret: process.env.sessionSecret,
  saveUninitialized: true,
  resave: true,
  store: new SessionStore(session)()
}))
app.use(express.static('build'))
app.use(express.static('public'))
app.use(webpackMiddleware(compiler, { stats: { colors: true } }))
app.use(webpackHotMiddleware(compiler, { stats: { colors: true } }))
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression({ threshold: 0 }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Key, Content-Encoding')
  next()
})


app.post('/login', ApiRouter.login)

// redirect all http requests to https
// app.all('*', (req, res, next) => {
//   if (req.secure) {
//     console.log(req)
//     return next()
//   }
//   res.redirect(`https://'${req.hostname}:${process.env.HTTPS_PORT}${req.url}`)
// })

app.get('*', (request, response) => {
  response.sendFile(path.resolve('public', 'index.html'))
})

const credentials = {
  key: fs.readFileSync('./sslcert/server.key'),
  cert: fs.readFileSync('./sslcert/server.crt')
}
app.set('port', process.env.HTTPS_PORT)

const httpServer = http.createServer(app)
httpServer.listen(process.env.HTTP_PORT, () => console.log(`Listening on port ${process.env.HTTP_PORT}`))

const httpsServer = https.createServer(credentials, app)
httpsServer.listen(process.env.HTTPS_PORT, () => console.log(`Listening on port ${process.env.HTTPS_PORT} for SECURED`))
