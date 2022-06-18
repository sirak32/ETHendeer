
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import {connect} from 'react-redux'
import { fetchTender } from "../../../actions/tenderAction";
import { FormikFormDemo } from "./EditSupplier";
import { Dialog } from "primereact/dialog";
import { fetchSuppliers } from "../../../actions/supplierAction";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";

const Table = ({suppliers,fetchSuppliers}) => {
  const [edit,setEdit]=useState(false)
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  // const [suppli,setSuppli]=useState({})
  const [data,setData] =useState({})

  const confirmDeleteProduct = () => {};
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-caret-down
          "
          className="p-button-rounded mr-2"
          onClick={() => {
            console.log("row datas",rowData)
            setData(rowData)
            setEdit(true)
            // console.log('Supli',suppli)

          
          }}
          />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => {
            console.log('consola',rowData._id)
            axios.get(`http://localhost:5001/supli/${rowData._id}`)
            .then((res)=>{
             fetchSuppliers()
            })

            confirmDeleteProduct(rowData)
          }}
          />
      </>
    );
  };
  return suppliers.length>0? (
    <>
    <DataTable
      breakpoint="960px"
      editMode="cell"
      header="Pending Supplier Registration List"
      value={suppliers}
      responsiveLayout="scroll"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      rowsPerPageOptions={[5, 10, 15, 25, 50]}
      dataKey={suppliers._id}
      paginator
      rowHover
      selection={selectedCustomers}
      onSelectionChange={(e) => setSelectedCustomers(e.value)}
      emptyMessage="Data Not Found"
      className="datatable-responsive"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Suppliers"
      rows={10}
    >
      <Column selectionMode="multiple" headerStyle={{ width: "3em" }}></Column>
      <Column field="personalInfo.firstName" filter sortable header="Supplier Name" ></Column>
      <Column field="personalInfo.phoneNumber.number" sortable header="Phone Number"></Column>
      <Column field="personalInfo.email" sortable header="Email"></Column>
      <Column field="tinNumber" sortable header="Tin"></Column>
      <Column
        body={actionBodyTemplate()}
        exportable={false}
        style={{ minWidth: "8rem" }}
      ></Column>
    </DataTable>

      <Dialog visible={edit} dismissableMask style={{ width: '80rem' }} draggable={false}  onHide={(()=>{setEdit(false)})}>
        {/* <FormikFormDemo selected={suppli} /> */}
        <h1>Hello</h1>
        {/* {console.log('suppli',suppli)} */}
      {/* <h1>  {suppli.personalInfo.firstName}</h1> */}
      </Dialog>
      </>
  ):<ProgressSpinner/>;
};
const mapStateToProps = (state) => {
  return {
    suppliers:state.suppliers.suppliers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSuppliers:()=>dispatch(fetchSuppliers()),    
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Table);
