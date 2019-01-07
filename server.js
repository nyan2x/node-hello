'use strict'

const https = require('https')
const http  = require('http')
const fs    = require('fs')
const route = require('./routes')

const StringDecoder  = require('string_decoder').StringDecoder
const {parseRequest} = require('./helpers')

const serverCallback = (req, res) => {
    const data = parseRequest(req)
    const handler = typeof(route[data.path]) == 'function' ?
        route[data.path] : route.notFound

    const decoder = new StringDecoder('utf-8')
    let buffer = ''

    req.on('data', data => {
        buffer += decoder.write(data)
    })

    req.on('end', () => {
        buffer += decoder.end()

        handler(data, (statusCode, payload) => {
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200
            payload = typeof(payload) == 'object' ? payload : {}

            res.setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode)
            res.end(JSON.stringify(payload))
        })
    })
}

const httpsConfig = {
    key: fs.readFileSync('./certifications/key.pem'),
    cert: fs.readFileSync('./certifications/cert.pem')
}

module.exports = {
    httpServer: http.createServer(serverCallback),
    httpsServer: https.createServer(httpsConfig, serverCallback)
}
