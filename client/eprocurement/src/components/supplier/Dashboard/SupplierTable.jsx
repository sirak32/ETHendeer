
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
  const [deleteOff,setDeleteOff]=useState(false)
  const [deleteId,setDeleteId]=useState(0)
  // const [suppli,setSuppli]=useState({})
  const [accId,setAccId]=useState(0)
  const [data,setData] =useState({})

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-refresh"
          label="Reset Password"
          className="p-button-rounded mr-2"
          onClick={() => {
            console.log("row datas",rowData)
            setAccId(rowData.accountInfo._id)
            axios.patch(`http://localhost:5001/reset-password/${accId}`)
            .then((res)=>{
              alert('Password Reseted')
            }).catch((e)=>{
              alert(e)

            })
            // setData(rowData)
            // setEdit(true)
            // console.log('Supli',suppliers)          
          }}
          />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => {
            console.log('suppliers',suppliers)
            console.log('consola',rowData._id)
            setDeleteId(rowData._id)
            setDeleteOff(true)
          }}
          />
      </>
    );
  };
  useEffect(()=>{
    fetchSuppliers()
  },[])
  return suppliers.length>0? (
    
    <>
    {}
    <DataTable
      breakpoint="960px"
      editMode="cell"
      header="Pending Supplier Registration List"
      value={suppliers}
      responsiveLayout="cell"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      rowsPerPageOptions={[5, 10, 15, 25, 50]}
      dataKey={suppliers._id}
      paginator
      rowHover
      selection={selectedCustomers}
      onSelectionChange={(e) => setSelectedCustomers(e.value)}
      emptyMessage="Suppliers Not Found"
      className="datatable-responsive text-3xl"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Suppliers"
      rows={10}
    >
      <Column field="personalInfo.firstName" filter sortable header="Supplier Name" ></Column>
      <Column field="personalInfo.phoneNumber" sortable header="Phone Number"></Column>
      <Column field="personalInfo.email" sortable header="Email"></Column>
      <Column field="tinNumber" sortable header="Tin"></Column>
      <Column
        body={actionBodyTemplate}
        exportable={false}
        style={{ minWidth: "8rem" }}
      ></Column>
    </DataTable>

      <Dialog visible={edit} dismissableMask style={{ width: '80rem' }} draggable={false}  onHide={(()=>{setEdit(false)})}>
        <h1>{accId}</h1>

      </Dialog>
      <Dialog
        visible={deleteOff}
        style={{ width: "450px" }}
        header="Confirm Delete"
        modal
        dismissableMask
        footer={
          <>
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text"
              onClick={(async() => {

                setDeleteOff(false);
              }
              )}
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-text text-yellow-50 bg-pink-500 "
              
              onClick={( () => {
                // console.log("INside Button Function")
                axios.get(`http://localhost:5001/supli/${deleteId}`)
                .then((res)=>{
                 fetchSuppliers()
                 setDeleteOff(false);
                })
              })}
              />
          </>
        }
        onHide={() => {
          setDeleteOff(false);
        }}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {<span>Are you sure you want to delete the selected Supplier?</span>}
        </div>
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
