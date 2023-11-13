import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InvoiceForm from './InvoiceForm';
import InvoiceTable from './InvoiceTable';
import NavMenu from './NavMenu';
import moment from 'moment/moment';

const InvoiceApp = () => {

  // Get the current date in 'YYYY-MM-DD' format
  const currentDate = moment().format('YYYY-MM-DD');

  // Default invoice template
  const defaultInvoice = {
    date: currentDate,
    issuer: '',
    client: '',
    type: 'Factura Ordinaria',
    currency: 'USD',
    description: '',
    amount: 0,
    tax: 0.13,
    state: false,
    approved: false,
  }

  // State variables for invoices, the currently selected invoice, and editing mode
  const [invoices, setInvoices] = useState([]);
  const [actualInvoice, setActualInvoice] = useState(defaultInvoice);
  const [isEditing, setIsEditing] = useState(false);

  // API URL for invoice operations
  const API_URL = 'http://localhost:3000/api/invoice';

  // Fetch invoices on component mount
  useEffect(() => {
      fetchInvoices();
  }, []);

  // Function to fetch invoices from the API
  const fetchInvoices = async () => {
      try {
          const response = await axios.get(API_URL);
          setInvoices(response.data);
      } catch (error) {
          console.error('Error fetching invoices', error);
      }
  };

  // Function to handle adding or editing an invoice
  const handleAddEditInvoice = async (invoice) => {
      try {
          if (isEditing) {
              await axios.put(`${API_URL}/${invoice.id_invoice}`, invoice);
          } else {
              await axios.post(API_URL, invoice);
          }
          fetchInvoices();
          setActualInvoice(defaultInvoice);
          setIsEditing(false);
      } catch (error) {
        console.error('Error adding or updating invoice: ', error);    
      }
  };

  // Function to handle editing an invoice
  const handleEditInvoice = (invoice) => {
    setActualInvoice(invoice);
    setIsEditing(true)
  }

  // Function to handle deleting an invoice
  const handleDeleteInvoice = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchInvoices();
    } catch (error) {
      console.error('Error deleting invoice', error);
    }
  };

  // Function to handle canceling the current operation
  const handleCancel = () => {
    setActualInvoice (defaultInvoice)
    setIsEditing(false);
  };

  return (
    <>
      {/* Navigation menu */}
      <NavMenu/>
      {/* Invoice form component */}
      <InvoiceForm onAddEdit={handleAddEditInvoice} actualInvoice={actualInvoice} isEditing={isEditing} onCancel={handleCancel}/>
      {/* Invoice table component */}
      <InvoiceTable invoices={invoices} handleEditInvoice={handleEditInvoice} handleDeleteInvoice={handleDeleteInvoice}/>
    </>
  )
}

export default InvoiceApp