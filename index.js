'use strict'

const {httpPort, httpsPort} = require('./config')

const {httpServer, httpsServer} = require('./server')

httpServer.listen(httpPort, () => {
    console.log(`http server is listening to ${httpPort}`)
})

httpsServer.listen(httpsPort, () => {
    console.log(`https server is listening ${httpsPort}`)
})
