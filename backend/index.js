import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
import { config } from 'dotenv';
config(); // Load environment variables from .env file


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', chatRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});