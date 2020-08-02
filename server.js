const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const app = express()
const port = process.env.VUE_APP_PORT || 80

app.use(serveStatic(path.join(__dirname, 'dist')))
app.listen(port)
