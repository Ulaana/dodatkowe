import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url'; 

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/data', async (req, res) => {
  try {
    const operator = await fetch('https://eipa.udt.gov.pl/reader/export-data/operator/85ac1231b31b7533ce1e332123706921').then(res => res.json());
    const bazy = await fetch('https://eipa.udt.gov.pl/reader/export-data/pool/85ac1231b31b7533ce1e332123706921').then(res => res.json());
    const stacje = await fetch('https://eipa.udt.gov.pl/reader/export-data/station/85ac1231b31b7533ce1e332123706921').then(res => res.json());
    const punkty = await fetch('https://eipa.udt.gov.pl/reader/export-data/point/85ac1231b31b7533ce1e332123706921').then(res => res.json());
    const slownik = await fetch('https://eipa.udt.gov.pl/reader/export-data/dictionary/85ac1231b31b7533ce1e332123706921').then(res => res.json());

    res.json({ operator, bazy, stacje, punkty, slownik });
  } catch (error) {
    res.status(500).send('Błąd pobierania danych.');
  }
});

app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
