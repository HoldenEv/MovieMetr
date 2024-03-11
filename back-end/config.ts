import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.TOKEN_SECRET;

if (!jwtSecret) {
  throw new Error("JWT secret is missing in environment variables.");
}

export default {
  jwtSecret,
  jwtSession: { session: false },
};
