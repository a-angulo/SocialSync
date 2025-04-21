import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import db from './config/connection.js';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

async function init() {
  try {
    await db();
    app.listen(PORT, () => {
      console.log(`🚀 API server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to database:', err);
  }
}

init();