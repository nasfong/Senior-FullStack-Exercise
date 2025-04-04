import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import router from './routes/router';
import connectDB from './config/db';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Initialize DB connection first
connectDB().then(() => {
  // Setup server routes and other configurations after DB connection
  app.use(cors({ origin: "*" }));
  app.use(express.json()); // Built-in replacement for body-parser.json()
  app.use(express.urlencoded({ extended: true })); // Built-in replacement for body-parser.urlencoded()
  app.use(express.static('public'));

  app.use('/api', router);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error connecting to the database:', err);
});
