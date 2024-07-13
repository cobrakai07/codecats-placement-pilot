import mongoose from 'mongoose'


const connect_db = async () => {
    // try to connect to db
    await mongoose.connect("mongodb://localhost:27017/database")
    await mongoose.connection.on('error', err => {
      logging.error(`MONGODB ERROR: ${err}`)
    });
}


export default connect_db;
