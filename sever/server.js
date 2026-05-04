import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../public/images')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const dbPath = path.join(__dirname, 'db.json');

const getDb = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const saveDb = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

app.get('/inventory', (req, res) => {
  const db = getDb();
  res.json(db.inventory);
});

app.get('/inventory/:id', (req, res) => {
  const db = getDb();
  const item = db.inventory.find(i => i.id === req.params.id);
  item ? res.json(item) : res.status(404).send('Not found');
});

app.post('/inventory', upload.single('inventory_image'), (req, res) => {
  const db = getDb();
  const newItem = {
    id: Date.now().toString(),
    inventory_name: req.body.inventory_name,
    description: req.body.description,
    inventory_image: req.file ? `/images/${req.file.filename}` : ''
  };
  db.inventory.push(newItem);
  saveDb(db);
  res.status(201).json(newItem);
});

app.put('/inventory/:id', (req, res) => {
  const db = getDb();
  const index = db.inventory.findIndex(i => i.id === req.params.id);
  if (index !== -1) {
    db.inventory[index] = { ...db.inventory[index], ...req.body };
    saveDb(db);
    res.json(db.inventory[index]);
  } else {
    res.status(404).send('Not found');
  }
});

app.put('/inventory/:id/photo', upload.single('inventory_image'), (req, res) => {
  const db = getDb();
  const index = db.inventory.findIndex(i => i.id === req.params.id);
  if (index !== -1 && req.file) {
    db.inventory[index].inventory_image = `/images/${req.file.filename}`;
    saveDb(db);
    res.json(db.inventory[index]);
  } else {
    res.status(404).send('Not found');
  }
});

app.delete('/inventory/:id', (req, res) => {
  const db = getDb();
  const filtered = db.inventory.filter(i => i.id !== req.params.id);
  saveDb({ inventory: filtered });
  res.status(204).send();
});

app.listen(5000, () => console.log('🚀 Сервер працює на http://localhost:5000'));