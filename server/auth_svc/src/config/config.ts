import dotenv from "dotenv";

// destructure dot env file.
dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const TEST = process.env.NODE_ENV === "test";

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 12345;

export const SERVER = {
  SERVER_HOSTNAME,
  SERVER_PORT,
};

export const SECRET_KEY = process.env.JWT_SECRET_KEY || "12313456165"; 
