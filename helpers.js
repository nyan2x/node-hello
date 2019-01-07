'use strict'

const url   = require('url')

module.exports = {
    parseRequest: (req) => {
        const parsedUrl = url.parse(req.url, true)

        return {
            url : parsedUrl,
            path: parsedUrl.pathname.replace(/^\/+|\/+$/g, ''),
            query: parsedUrl.query,
            method: req.method.toUpperCase(),
            headers: req.headers
        }
    }
}
