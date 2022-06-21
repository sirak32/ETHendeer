import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { connect } from "react-redux";
import { fetchOfficer } from "../../../actions/officerAction";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRef } from "react";

const Table = ({officers,fetchOfficers}) => {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [edit,setEdit]=useState(false)
  const [visibleTop, setVisibleTop] = useState(false);
  const [deleteOff,setDeleteOff]=useState(false)
  const [deleteId,setDeleteId]=useState(0)
const [data,setData] =useState({})
const [accId,setAccId]=useState(0)
const [off,setOffi]=useState({
  _id:'',
firstName:'',
middleName:'',
lastName:'',
email:'',
phoneNumber:'',
username:'',
password:'',
email:'',
role:'',
user:'',
officerId:'',
})
useEffect(()=>{
fetchOfficers()
if(officers.length>0){
  {
    setOffi({
      _id:officers[0]._id,
      firstName:officers[0]._id,
      middleName:officers[0]._id,
      lastName:officers[0]._id,
      email:officers[0]._id,
      phoneNumber:officers[0]._id,
      username:officers[0]._id,
      password:officers[0]._id,
      email:officers[0]._id,
      role:officers[0]._id,
      user:officers[0]._id,
      officerId:officers[0]._id, 
    })
  }
}
},[])
let selected={}
if(officers.length>0)
console.log('OFFICERS',off) 
  const actionBodyTemplate = (rowData) => {
    return officers.length>0?(
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
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => {
            setDeleteId(rowData._id)
            setDeleteOff(true)
          }}
        />
      </>
    ):<ProgressSpinner/> ;
  };
  const dt = useRef(null);

  const exporting = () => {
    dt.current.exportCSV();
  }
  const header = <div style={{textAlign:'left'}}><Button type="button" icon="pi pi-external-link" iconPos="left" label="Export CSV" onClick={exporting}></Button></div>;

  return officers.length>0? (
    <>
      <DataTable
        breakpoint="960px"
        editMode="cell"
        header={<center> {header}Tenders List</center>}
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
        className="datatable-responsive text-3xl"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tenders"
        rows={10}
        ref={dt}
      >

        <Column field="officerId" sortable filter header="Officer Id"></Column>
        <Column field="personalInfo.firstName" sortable  header="Officer Name"></Column>
        <Column field="personalInfo.lastName" sortable  header="Lastname"></Column>
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

        </Dialog>
      <Dialog  visible={visibleTop} dismissableMask style={{width:"70%",height:"85%",left:"8%"}} onHide={() => setVisibleTop(false)}>
                    <center> <h3>Supplier</h3></center>
                    <h1>{data._id}</h1>
                    <h1>{data.officerId}</h1>
                    <h1>{Object.keys(selected).length>0?selected._id:'No Data'}</h1>
                    {console.log('selected',selected)}
                    <h1>Tender `Description`</h1>
                </Dialog> 
                <Dialog
        visible={deleteOff}
        style={{ width: "450px" }}
        header="Confirm Delete"
        modal
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
                console.log("INside Button Function")
                axios.get(`http://localhost:5001/fromme/${deleteId}`)
              .then((res)=>{
                setDeleteOff(false);
                fetchOfficers()
              })
                setDeleteOff(false);
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
          {<span>Are you sure you want to delete the selected Officer?</span>}
        </div>
       </Dialog>
    </>
  ):<ProgressSpinner/> ;
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
