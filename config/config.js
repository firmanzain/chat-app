const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const connection = async () => {
    try {
        let connString = 'mongodb://'
        if (process.env.DB_USERNAME != "" && process.env.DB_PASSWROD != "") {
            connString += process.env.DB_USERNAME + ':' + process.env.DB_PASSWROD + '@'
        }
        connString += process.env.DB_HOST
        if (process.env.DB_PORT != "") {
            connString += ':' + process.env.DB_PORT
        }
        connString += '/' + process.env.DB_DATABASE

        const conn = await mongoose.connect(connString)
        console.info(`Connected to database on Worker process: ${process.pid}`)
    } catch (error) {
        console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
        process.exit(1)
    }
}

module.exports = {
    connection
}