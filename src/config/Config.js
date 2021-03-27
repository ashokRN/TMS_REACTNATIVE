let CONFIG = {} //Make this global to use all over the application

// CONFIG.API_URL = process.env.API_URL || 'http://192.168.0.106:5000/api'

CONFIG.API_URL = process.env.API_URL || 'https://pacific-chamber-65294.herokuapp.com/api'


module.exports = CONFIG;