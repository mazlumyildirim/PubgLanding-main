import express from 'express';
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const adapter = new JSONFile(path.join(__dirname, 'db.json'));
const db = new Low(adapter);
await db.read();

db.data ||= { likes: 0, holidayLikes: 0 };

app.get('/holiday-likes', async (req, res) => {
  res.status(200).send(`${db.data.holidayLikes}`);
});

app.get('/likes', async (req, res) => {
  res.status(200).send(`${db.data.likes}`);
});

app.post('/holiday-likes', async (req, res) => {
  db.data.holidayLikes += 1;

  await db.write();
  
  res.status(200).send(`${db.data.holidayLikes}`);
});

app.post('/likes', async (req, res) => {
  db.data.likes += 1;

  await db.write();

  res.status(200).send(`${db.data.likes}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
