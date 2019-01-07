'use strict'

const environents = {
    local: require('./local'),
    prod: require('./prod')
}

const env = typeof(process.env.NODE_ENV) == 'string' ?
    process.env.NODE_ENV : 'local'

module.exports = typeof(environents[env]) == 'object' ?
    environents[env] : environents.local

