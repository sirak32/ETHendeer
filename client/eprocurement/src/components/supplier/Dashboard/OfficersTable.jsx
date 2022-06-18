import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FormikFormDemo } from "./EditTender";
import { Sidebar } from 'primereact/sidebar';
import { connect } from "react-redux";
import { fetchOfficer } from "../../../actions/officerAction";
import axios from "axios";

const Table = ({officers,fetchOfficers}) => {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [edit,setEdit]=useState(false)
  const [visibleTop, setVisibleTop] = useState(false);
const [data,setData] =useState({})
useEffect(()=>{
fetchOfficers()
console.log('consola',officers)
},[])



  // const editProduct = () => {};
  // const confirmDeleteProduct = () => {};
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-caret-down"
          className="p-button-rounded mr-2"
          onClick={() => {
            console.log('Supplier List',rowData)
            setData(rowData)
            setVisibleTop(true)
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => {
            console.log('consola',rowData._id)
              axios.get(`http://localhost:5001/fromme/${rowData._id}`)
              .then((res)=>{
                fetchOfficers()
                setDeleteProductsDialog(true);
              })
          }}
        />
      </>
    );
  };
  const [deleteProductsDialog, setDeleteProductsDialog] = React.useState(false);
  return (
    <>
      <DataTable
        breakpoint="960px"
        editMode="cell"
        header="Tenders List"
        value={officers}
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[5, 10, 15, 25, 50]}
        dataKey={officers._id}
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
        <Column field="officerId" sortable filter header="Officer Id"></Column>
        <Column field="personalInfo.firstName" sortable  header="Officer Name"></Column>
        <Column field="personalInfo.phoneNumber" sortable  header="Phone Number"></Column>
        <Column field="personalInfo.email" sortable  header="Email"></Column>
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
        draggable={false}
        onHide={() => {
          setEdit(false);
        }}>
            {/* <FormikFormDemo/> */}

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
      <Dialog  visible={visibleTop}  style={{width:"70%",height:"85%",left:"8%"}} onHide={() => setVisibleTop(false)}>
                    <h3>Top Sidebar Supplier</h3>
                    <h1>{data._id}</h1>
                    {/* <h1>{data.personalInfo.firstName}</h1> */}
                    <h1>Tender Number</h1>
                    <h1>Tender `Description`</h1>

                </Dialog> 
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    officers:state.officers.officers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOfficers:()=>dispatch(fetchOfficer()),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Table);
