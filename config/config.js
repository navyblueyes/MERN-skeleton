const config = {
    env: process.env.NODE_ENV || 'development',
    // eng allows you to differentiate between development / profuction mode
    port: process.env.PORT || 3000,
    // assigns listening port
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    // secret key
    mongoUri: process.env.MONGODB_URI ||
        process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/mernproject'
    // uri for MongoInstance
}

export default config