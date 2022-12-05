const mysql = require('promise-mysql');

require('dotenv').config()

const connectToDatabase = async () => {

    return await mysql.createPool({
        
        user: 'root', // e.g. 'my-db-user'
        password: 'adminroot', // e.g. 'my-db-password'
        database: 'Assignment_2', // e.g. 'my-database'
        host: '127.0.0.1', // e.g. '127.0.0.1'
        port: '3306', // e.g. '3306'
        //Specify additional properties here.
        connectionLimit: 5,
        connectTimeout: 10000, // 10 seconds
        acquireTimeout: 10000, // 10 seconds
        waitForConnections: true, // Default: true
        queueLimit: 0, // Default: 0
    });
};

module.exports.setup = connectToDatabase;
