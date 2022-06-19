
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
  // let supList = props.data;
  // console.log("myPendings", supList);
  let i;
useEffect(()=>{
fetchPendings()
},[])
  const rows = [];
  // const [suppli,setSuppli]=useState({})
  // for (i = 0; i < supList.length; i++) {
  //   console.log(supList[i])
  //   rows[i] = createData(
  //     supList[i]._id,
  //     // supList[i].accountInfo._id,
  //     // supList[i].personalInfo._id,
  //     // supList[i].personalInfo.address._id,


  //     i,
  //     `${supList[i].personalInfo.firstName} ${supList[i].personalInfo.middleNam} ${supList[i].personalInfo.lastName}`,
  //     supList[i].personalInfo.email,
  //     `${supList[i].personalInfo.phoneNumber.countryCode}${supList[i].personalInfo.phoneNumber.regionalCode}${supList[i].personalInfo.phoneNumber.number}`,
  //     supList[i].tinNumber
  //   );
  // }
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
    //
    //
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
  const statusBodyTemplate = (rowData) => {
    return <Button label={`${rowData.status}`} className="p-button-success" />;
    // return <span  className={`status-active`}>{rowData.status}</span>;
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
        {/* <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => {setEdit(true)
          setSuppli(rowData)
          }}
          /> */}
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
  // console.log("supList",supList)
  // for(j=0;j<supList.length;j++)
//  suppData[j]= {
//     firstName: supList[j].personalInfo.firstName,
//       middleName:supList[j].personalInfo.middleName,
//       lastName: supList[j].personalInfo.lastName,
//       phone: supList[j].personalInfo.firstName,
//       city: supList[j].personalInfo.firstName,
//       subcity: supList[j].personalInfo.firstName,
//       wereda: supList[j].personalInfo.firstName,
//       kebele: supList[j].personalInfo.firstName,
//       businessType: supList[j].personalInfo.firstName,
//       tinNumber: supList[ j].tinNumber,
//       username: supList[j].personalInfo.firstName,
      
//   }
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
      className="datatable-responsive"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Suppliers"
      rows={10}
    >
      <Column selectionMode="multiple" headerStyle={{ width: "3em" }}></Column>
      <Column field="organizationName" filter sortable header="Supplier Trade Name" ></Column>
      <Column field="personalInfo.firstName" filter sortable header="Representative Name" ></Column>

      <Column field="personalInfo.phoneNumber.number" sortable header="Phone Number"></Column>
      <Column field="accountInfo.email" sortable header="Email"></Column>
      <Column field="tinNumber" sortable header="Tin"></Column>
      {/* <Column field='status' sortable header='status'></Column> */}
      {/* <Column field="status" header="Status" sortable style={{ minWidth: '10rem' }} body={statusBodyTemplate} filter  /> */}
      {/* <Column  headerStyle={{ width: '4rem', textAlign: 'center' }}  style={{ minWidth: '10rem' }}bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={editButton} /> */}
      {/* <Column  headerStyle={{ width: '4rem', textAlign: 'center' }} style={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={deleteButton} /> */}
      <Column
        body={actionBodyTemplate}
        exportable={false}
        style={{ minWidth: "8rem" }}
      ></Column>
    </DataTable>

      <Dialog visible={edit} dismissableMask style={{ width: '80rem' }} draggable={false}  onHide={(()=>{setEdit(false)})}>
        {/* <FormikFormDemo selected={suppli} /> */}
      </Dialog>
      </>
  );
};
const mapStateToProps = (state) => {
  return {
    // tenders: state.tenders,
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
