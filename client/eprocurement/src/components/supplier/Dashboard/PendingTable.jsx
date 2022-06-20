
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import {connect} from 'react-redux'
import { fetchTender } from "../../../actions/tenderAction";
import { FormikFormDemo } from "./EditSupplier";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { fetchPending } from "../../../actions/pendingAction";

const Table = ({pendings,fetchPendings}) => {
  const [edit,setEdit]=useState(false)
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  function createData(id,no, name, email, phone, tinNO) {
    return {id, no, name, email, phone, tinNO };
  }
  let i;
useEffect(()=>{
fetchPendings()
},[])
  const rows = [];
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
        onClick={(()=>{
          setEdit(true)
        })}
      />
    );
  };
  const detailButton = (rowData) => {
    return (
      <Button
        icon="pi-chevron-circle-down"
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

  const editProduct = () => {};
  const confirmDeleteProduct = () => {};
  const actionBodyTemplate = (rowData) => {
    console.log("row datas",rowData)
    return (
      <>
        <Button
          icon="pi pi-caret-down
"
          className="p-button-rounded p-button-info mr-2"
          onClick={() =>{
             confirmDeleteProduct(rowData)
             fetchPendings()
            }}
          />
        <Button
          icon="pi pi-check "
          className="p-button-rounded  p-button-success mr-2"
          onClick={() => {

            axios.get(`http://localhost:5001/get-pending-supplier/${rowData._id}`)
            .then((res)=>{
              const data=res.data
              axios.post(`http://localhost:5001/accept-pending-supplier`,data)
              .then((re)=>{
                fetchPendings()
                // alert(re.data)
              })
            })
            console.log(rowData.id)
            confirmDeleteProduct(rowData)
          }}
          />

<Button
          icon="pi pi-times
"
          className="p-button-rounded p-button-warning mr-2"
          onClick={() => {
            // console.log(rowData._id)
            axios.delete(`http://localhost:5001/reject-pending-supplier/${rowData._id}`)
            .then(()=>{
              fetchPendings()
            })
            confirmDeleteProduct(rowData)
          }}
          />
      </>
    );
  };
  console.log("rows are", rows);
  const suppData=[]
  let j
const downloadlink=(t)=>{
  return <Button icon="pi pi-download" className="p-button-rounded p-button-success" aria-label="Search"  label="See Document"
  onClick={()=>{
    window.open(`http://localhost:5001/image/${t.Attacheddocument}`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=1000,height=400");
  }}
  />
}
  return (
    <>
    <DataTable
      breakpoint="960px"
      editMode="cell"
      header="Pending Supplier Registration List"
      value={pendings}
      responsiveLayout="cell"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      rowsPerPageOptions={[5, 10, 15, 25, 50]}
      dataKey={pendings._id}
      paginator
      rowHover
      selection={selectedCustomers}
      onSelectionChange={(e) => setSelectedCustomers(e.value)}
      emptyMessage={<center><h4> No Pending Suppliers</h4></center>}
      className="datatable-responsive text-3xl"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Suppliers"
      rows={10}
    >
      <Column field="organizationName" filter sortable header="Supplier Trade Name" ></Column>
      <Column field="personalInfo.firstName" filter sortable header="Representative Name" ></Column>
      <Column field="personalInfo.phoneNumber" sortable header="Phone Number"></Column>
      <Column field="accountInfo.email" sortable header="Email"></Column>
      <Column body={downloadlink} field="Attacheddocument" sortable header="Attached Document"></Column>
      <Column field="tinNumber" sortable header="Tin"></Column>
      <Column
        body={actionBodyTemplate}
        exportable={false}
        style={{ minWidth: "8rem" }}
      ></Column>
    </DataTable>

      <Dialog visible={edit} dismissableMask style={{ width: '80rem' }} draggable={false}  onHide={(()=>{setEdit(false)})}>
      </Dialog>
      </>
  );
};
const mapStateToProps = (state) => {
  return {
    pendings:state.pendings.pendings

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchTenders: () => dispatch(fetchTender()),
    fetchPendings:()=>dispatch(fetchPending())

  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Table);
