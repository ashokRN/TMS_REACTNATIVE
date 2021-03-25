let CONFIG = {} //Make this global to use all over the application

CONFIG.API_URL = process.env.API_URL || 'http://api2.projectsoft.in'

module.exports = CONFIG;