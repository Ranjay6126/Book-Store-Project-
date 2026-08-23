
import "dotenv/config";

export const PORT = Number(process.env.PORT || 3000);

export const mongoDBURL = process.env.MONGODB_URL;

if (!mongoDBURL) {
  throw new Error("MONGODB_URL is required. Add it to Backend/.env before starting the API.");
}
