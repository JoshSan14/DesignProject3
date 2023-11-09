const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const moment = require('moment');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db_data = {
    user: 'postgres',
    host: 'localhost',
    database: 'app_facturas',
    password: '1408',
    port: '5432'
}

const pool = new Pool({
    user: db_data.user,
    host: db_data.host,
    database: db_data.database,
    password: db_data.password,
    port: db_data.port,
  });

app.get('/', (req, res) => {
res.send('Welcome to the Invoice Management APP API');
});

// Obtener todas las facturas
app.get('/api/invoice', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM document.invoice`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Obtener una factura por ID
app.get('/api/invoice/:id', async (req, res) => {
  try {
    const { id_invoice } = req.params;
    const result = await pool.query(`SELECT * FROM document.invoice WHERE id_invoice = $1` [id_invoice]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Crear una nueva factura
app.post('/api/invoice', async (req, res) => {
  try {
    let { date, issuer, client, type, currency, description, amount, tax, state, aproved } = req.body;
    // Formatear la fecha a 'DD/MMM/YYYY' usando moment.js
    const formattedDate = publicado ? moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY') : null;
    console.log({ date, issuer, client, type, currency, description, amount, tax, state, aproved });
    const result = await pool.query('INSERT INTO libro (titulo, autor, descripcion, publicado) VALUES ($1, $2, $3, $4) RETURNING *', [titulo, autor, descripcion, formattedDate]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting libro:', error);
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un libro
app.put('/api/invoice/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, descripcion, publicado } = req.body;
    await pool.query('UPDATE libro SET titulo = $1, autor = $2, descripcion = $3, publicado = $4 WHERE id = $5', [titulo, autor, descripcion, publicado, id]);
    res.json({ message: 'Libro actualizado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Eliminar un libro
app.delete('/api/invoice/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM libro WHERE id = $1', [id]);
    res.json({ message: 'Libro eliminado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

