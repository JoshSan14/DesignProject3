import React from "react";
import { Table, Button } from "react-bootstrap"

const InvoiceTable = props => {

  // Function to convert boolean values to "Sí" or "No"
  function boolToYesNo(value) {
    return value ? "Sí" : "No";
  }

  // Styles for table header, body, and buttons
  const headerStyle = {
    color: "#171717",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 20,
  }

  const bodyStyle = {
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
    fontWeight: 400,
  })

  return (
    <>
      {/* Invoice table */}
      <Table style={{border: "#b6b8b6"}} responsive striped bordered hover size="sm" className="mx-3">
        {/* Table header */}
        <thead>
          <tr style={headerStyle}>
            <th>ID</th>
            <th>Fecha</th>
            <th>Issuer</th>
            <th>Cliente</th>
            <th>Tipo</th>
            <th>Moneda</th>
            <th>Descripcion</th>
            <th>Monto</th>
            <th>Impuesto</th>
            <th>Estado</th>
            <th>Aprobada</th>
            <th>Opciones</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody style={bodyStyle}>
          {/* Map through the invoices to populate rows */}
          {props.invoices.map((invoice) => (
            <tr key={String(invoice.id_invoice)}>
              <td>{String(invoice.id_invoice)}</td>
              <td>{new Date(invoice.date).toLocaleDateString()}</td>
              <td>{String(invoice.issuer)}</td>
              <td>{String(invoice.client)}</td>
              <td>{String(invoice.type)}</td>
              <td>{String(invoice.currency)}</td>
              <td>{String(invoice.description)}</td>
              <td>{String(invoice.amount)}</td>
              <td>{String(+invoice.tax * 100 + "%")}</td>
              <td>{boolToYesNo(invoice.state)}</td>
              <td>{boolToYesNo(invoice.approved)}</td>
              {/* Options column with Edit and Delete buttons */}
              <td>
                <div className="d-flex">
                  <Button style={buttonStyle("#229e03", "#3e7800")} variant="primary" size="sm" className="me-2" onClick={() => props.handleEditInvoice(invoice)}>
                    Editar
                  </Button>
                  <Button style={buttonStyle("#f70202", "#990202")} variant="danger" size="sm" onClick={() => props.handleDeleteInvoice(invoice.id_invoice)}>
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </Table>
    </>
  )
};

export default InvoiceTable;
