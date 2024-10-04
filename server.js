import express from 'express';
import fetch from 'node-fetch';
import path from 'path'; // To resolve paths
import { fileURLToPath } from 'url'; // Needed for __dirname in ESModules

const app = express();
const PORT = 3000;

// __dirname workaround for ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obsługa plików statycznych z folderu 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Trasa główna serwująca plik HTMLn
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Trasa API do pobierania danych
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
