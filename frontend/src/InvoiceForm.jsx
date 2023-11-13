import { useState, useEffect } from 'react';
import { Button, Row, Col, Form, FormGroup, FormLabel, FormSelect, FormCheck } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import moment from 'moment';

const InvoiceForm = props => {
  // State to manage the form data
  const [invoiceForm, setInvoiceForm] = useState(props.actualInvoice);

  // Effect to format the date when the actualInvoice prop changes
  useEffect(() => {
    setInvoiceForm(() => ({
      ...props.actualInvoice,
      date: moment(props.actualInvoice.date).format('YYYY-MM-DD'),
    }));
  }, [props.actualInvoice])

  // Handle input change for different form fields
  const handleInputChange = (fieldName) => (e) => {
    const { value, type, checked } = e.target;
    setInvoiceForm((prevInvoiceForm) => {
      return {
        ...prevInvoiceForm,
        [fieldName]: type === 'checkbox' ? checked : value,
      };
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddEdit(invoiceForm);
  };

  // Styles for labels, inputs, and buttons
  const labelStyle = {
    color: "#171717",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 20,
  }

  const inputStyle = {
    border: `2px solid #b6b8b6`,
    borderRadius: 20,
    color: "#171717",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 16,
  }

  // Function to dynamically generate button styles
  const buttonStyle = (bg, bc) => ({
    color: "#FFFFFF",
    backgroundColor: bg,
    border: `3px solid ${bc}`,
    borderRadius: 20,
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 20,
  })

  return (

    <Form onSubmit={handleSubmit} className="mb-3 mx-3">

      {/* Form rows for Emisor, Cliente, and Fecha */}
      <Row className="mb-3">
        <FormGroup as={Col}>
          <FormLabel style={labelStyle}>Emisor</FormLabel>
          <FormControl style={inputStyle} type="text" value={invoiceForm.issuer} onChange={handleInputChange('issuer')}></FormControl>
        </FormGroup>
        <FormGroup as={Col}>
          <FormLabel style={labelStyle}>Cliente</FormLabel>
          <FormControl style={inputStyle} type="text" value={invoiceForm.client} onChange={handleInputChange('client')}></FormControl>
        </FormGroup>
        <FormGroup as={Col}>
          <FormLabel style={labelStyle}>Fecha</FormLabel>
          <FormControl style={inputStyle} type="date" value={invoiceForm.date} onChange={handleInputChange('date')}></FormControl>
        </FormGroup>
      </Row>

      {/* Form rows for Tipo and Moneda */}
      <Row className="mb-3">
        <FormGroup as={Col}>
          <FormLabel style={labelStyle}>Tipo</FormLabel>
          <FormSelect style={inputStyle} value={invoiceForm.type} onChange={(handleInputChange('type'))}>
            <option>Factura Ordinaria</option>
            <option>Factura Rectificativa</option>
            <option>Factura Recapitulativa</option>
          </FormSelect>
        </FormGroup>
        <FormGroup as={Col}>
          <FormLabel style={labelStyle}>Moneda</FormLabel>
          <FormSelect style={inputStyle} value={invoiceForm.currency} onChange={handleInputChange('currency')}>
            <option>USD</option>
            <option>CRC</option>
          </FormSelect>
        </FormGroup>
      </Row>

      {/* Form row for Descripción */}
      <FormGroup className="mb-3">
        <FormLabel style={labelStyle}>Descripción</FormLabel>
        <FormControl style={inputStyle} as="textarea" rows={3} value={invoiceForm.description} onChange={handleInputChange('description')} />
      </FormGroup>
      
      {/* Form rows for Monto, Impuesto, and Total */}
      <Row className="mb-3">
        <FormGroup as={Col}>
          <FormLabel style={labelStyle}>Monto</FormLabel>
          <FormControl style={inputStyle} type="number" value={invoiceForm.amount} onChange={handleInputChange('amount')}></FormControl>
        </FormGroup>
        <FormGroup as={Col}>
          <FormLabel style={labelStyle}>Impuesto</FormLabel>
          <FormControl style={inputStyle} type="number" value={invoiceForm.tax} onChange={handleInputChange('tax')}></FormControl>
        </FormGroup>
        <FormGroup as={Col}>
          <FormLabel style={labelStyle}>Total</FormLabel>
          <FormControl style={inputStyle} type="number" value={+invoiceForm.amount + (+invoiceForm.amount * +invoiceForm.tax)} onChange={handleInputChange('tax')}></FormControl>
        </FormGroup>
      </Row>

      {/* Form rows for Pagada and Aprobada */}
      <Row className="mb-3">
        <FormGroup as={Col}>
          <FormCheck type="switch" label="Pagada" style={labelStyle} checked={invoiceForm.state} onChange={handleInputChange('state')} />
        </FormGroup>
        <FormGroup as={Col}>
          <FormCheck type="switch" label="Aprobada" style={labelStyle} checked={invoiceForm.approved} onChange={handleInputChange('approved')} />
        </FormGroup>
      </Row>

      {/* Submit and Cancel buttons */}
      <Button style={buttonStyle("#229e03", "#3e7800")} className="px-5" type="submit">{props.isEditing ? 'Actualizar' : 'Agregar'}</Button>
      {props.isEditing && <Button style={buttonStyle("#f70202", "#990202")} className="mx-2 px-5" onClick={props.onCancel}>Cancelar</Button>}

    </Form>

  )
}

export default InvoiceForm