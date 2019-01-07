'use strict'

module.exports = {
    hello : (data, callback) => {
        callback(200, { message: 'Welcome!' })
    },
    notFound: (data, callback) => {
        callback(404)
    }
}
