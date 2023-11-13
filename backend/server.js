const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const moment = require('moment');
const helmet = require('helmet');

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Database configuration
const db_data = {
  db_user: 'postgres',
  db_host: 'localhost',
  db_name: 'app_facturas',
  db_password: '1234',
  db_port: '5432',
};

const pool = new Pool({
  user: db_data.db_user,
  host: db_data.db_host,
  database: db_data.db_name,
  password: db_data.db_password,
  port: db_data.db_port,
})

// Welcome message
app.get('/', (req, res) => {res.send('Welcome to the Invoice Management APP API')});

// Retrieve all invoices
app.get('/api/invoice', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM document.invoice`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve a specific invoice by ID
app.get('/api/invoice/:id', async (req, res) => {
  try {
    const { id } = req.params; // Use `id` instead of `id_invoice`
    const result = await pool.query(`SELECT * FROM document.invoice WHERE id_invoice = $1`, [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new invoice
app.post('/api/invoice', async (req, res) => {
  try {
    let { date, issuer, client, type, currency, description, amount, tax, state, approved } = req.body;
    // Format the date to 'DD/MM/YYYY' if provided
    const formattedDate = date ? moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY') : null;
    // Insert the new invoice into the database
    const result = await pool.query('INSERT INTO document.invoice (date, issuer, client, type, currency, description, amount, tax, state, approved) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [formattedDate, issuer, client, type, currency, description, amount, tax, state, approved]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting invoice:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update an existing invoice by ID
app.put('/api/invoice/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { date, issuer, client, type, currency, description, amount, tax, state, approved } = req.body;
    // Update the existing invoice in the database
    await pool.query(`
      UPDATE document.invoice
      SET date = $1, issuer = $2, client = $3, type = $4, currency = $5, description = $6, amount = $7, tax = $8, 
        state = $9, approved = $10
      WHERE id_invoice = $11`, [date, issuer, client, type, currency, description, amount, tax, state, approved, id]);
    res.json({ message: 'Invoice updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an invoice by ID
app.delete('/api/invoice/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Delete the invoice from the database
    await pool.query('DELETE FROM document.invoice WHERE id_invoice = $1', [id]);
    res.json({ message: 'Invoice deleted succesfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

