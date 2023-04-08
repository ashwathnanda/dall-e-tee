import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Versioning the API
const API_VERSION = '/v1';
app.use(`${API_VERSION}/dalle`, dalleRoutes);

app.get('/', (_req, res) => {
  res.status(200).json({ message: "Welcome to the DALL-E API" })
});

// Handling 404 errors
app.use((_req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Handling errors
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});


// Starting the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`DALL-E API running on port ${PORT}, version ${API_VERSION}`);
});