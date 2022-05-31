import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FormikFormDemo } from "./EditTender";
import { Sidebar } from 'primereact/sidebar';

const Table = (props) => {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [edit,setEdit]=useState(false)
  const [visibleTop, setVisibleTop] = useState(false);
const [data,setData] =useState({})
  function createData(
    tenderNO,
    tenderId,
    tenderTitle,
    openingDate,
    closingDate,
    status
  ) {
    return {
      tenderNO,
      firstName:tenderId,
      tenderTitle,
      openingDate,
      closingDate,
      status, };
  }
  let dataa = props.data;
  console.log("my NEw KINGDOM", dataa);
  let i;

  const rows = [];
  for (i = 0; i < dataa.length; i++) {
    rows[i] = createData(
      i,
      dataa[i].officerId,
      dataa[i].personalInfo.firstName,
      `${dataa[i].personalInfo.phoneNumber.countryCode}${dataa[i].personalInfo.phoneNumber.regionalCode}${dataa[i].personalInfo.phoneNumber.number}`,
      dataa[i].personalInfo.email,
      "4"
    );
  }
  console.log("Succesffull", rows);
  const deleteButton = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        aria-label="Cancel"
      />
    );
  };
  const editButton = (rowData) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded"
        aria-label="Cancel"
      />
    );
  };
  const statusItemTemplate = (option) => {
    return (
      <span className={`customer-badge status-negotiation`}>{option}</span>
    );
  };
  const statusBodyTemplate = (rowData) => {
    return <Button label={`${rowData.status}`} className="p-button-success" />;
    // return <span  className={`status-active`}>{rowData.status}</span>;
  };
  const editProduct = () => {};
  const confirmDeleteProduct = () => {};
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-caret-down
"
          className="p-button-rounded mr-2"
          onClick={() => {
            setVisibleTop(true)
            setData(rowData)
          }}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => {
            setEdit(true)
            editProduct(rowData)}}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => {
            setDeleteProductsDialog(true);
          }}
        />
      </>
    );
  };
  console.log("rows are", rows);
  const [deleteProductsDialog, setDeleteProductsDialog] = React.useState(false);
  return (
    <>
      <DataTable
        breakpoint="960px"
        editMode="cell"
        header="Tenders List"
        value={rows}
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[5, 10, 15, 25, 50]}
        dataKey={rows.tenderNO}
        paginator
        rowHover
        selection={selectedCustomers}
        onSelectionChange={(e) => setSelectedCustomers(e.value)}
        emptyMessage="Data Not Found"
        className="datatable-responsive"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tenders"
        rows={10}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3em" }}
        ></Column>
        <Column field="firstName" sortable filter header="Officer Id"></Column>
        <Column field="tenderTitle" sortable  header="Officer Name"></Column>
        <Column field="openingDate" sortable  header="Phone Number"></Column>
        <Column field="closingDate" sortable  header="Email"></Column>
        {/* <Column field='status' sortable header='status'></Column> */}
        <Column
          field="status"
          header="Participations"
          sortable
          style={{ minWidth: "10rem" }}
          body={statusBodyTemplate}
          
        />
        {/* <Column  headerStyle={{ width: '4rem', textAlign: 'center' }}  style={{ minWidth: '10rem' }}bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={editButton} /> */}
        {/* <Column  headerStyle={{ width: '4rem', textAlign: 'center' }} style={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={deleteButton} /> */}
        <Column
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: "8rem" }}
        ></Column>
      </DataTable>
      <Dialog
        visible={edit}
        style={{ width: "90rem" }}
        header="Confirm"
        modal
        dismissableMask
        onHide={() => {
          setEdit(false);
        }}>
            <FormikFormDemo/>

        </Dialog>
      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={
          <>
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => {
                setDeleteProductsDialog(false);
              }}
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-text"
              onClick={(() => {
                setDeleteProductsDialog(false);
              })}
            />
          </>
        }
        onHide={() => {
          setDeleteProductsDialog(false);
        }}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {<span>Are you sure you want to delete the selected products?</span>}
        </div>
      </Dialog>
      <Sidebar  visible={visibleTop} position="top" style={{width:"70%",height:"85%",left:"8%"}} onHide={() => setVisibleTop(false)}>
                    <h3>Top Sidebar</h3>
                    <h1>{data.tenderId}</h1>
                    <h1>Tender Description</h1>
                    <h1>Tender Number</h1>
                    <h1>Tender `Description`</h1>

                </Sidebar>
    </>
  );
};

export default Table;
