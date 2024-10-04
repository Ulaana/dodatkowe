import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const operator = await fetch('https://eipa.udt.gov.pl/reader/export-data/operator/85ac1231b31b7533ce1e332123706921').then(res => res.json());
    const bazy = await fetch('https://eipa.udt.gov.pl/reader/export-data/pool/85ac1231b31b7533ce1e332123706921').then(res => res.json());
    const stacje = await fetch('https://eipa.udt.gov.pl/reader/export-data/station/85ac1231b31b7533ce1e332123706921').then(res => res.json());
    const punkty = await fetch('https://eipa.udt.gov.pl/reader/export-data/point/85ac1231b31b7533ce1e332123706921').then(res => res.json());
    const slownik = await fetch('https://eipa.udt.gov.pl/reader/export-data/dictionary/85ac1231b31b7533ce1e332123706921').then(res => res.json());

    res.status(200).json({ operator, bazy, stacje, punkty, slownik });
  } catch (error) {
    res.status(500).send('Błąd pobierania danych.');
  }
}
