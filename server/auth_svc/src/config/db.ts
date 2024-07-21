import mongoose from "mongoose";

const connect_db = async () => {
  try {
    // try to connect to db
    await mongoose.connect("mongodb://localhost:27017/database");
    logging.info("DATABASE Connected Successfully.");
  } catch (err) {
    logging.error("MONGO ERROR: " + err);
  }
};

export default connect_db;
