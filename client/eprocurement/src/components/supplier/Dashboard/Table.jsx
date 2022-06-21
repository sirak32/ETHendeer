import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FormikFormDemo } from "./EditTender";
import { Sidebar } from 'primereact/sidebar';
import axios from "axios";
import { connect } from "react-redux";
import { fetchTender } from "../../../actions/tenderAction";
import { ProgressBar } from "primereact/progressbar";
import { fetchApplied } from "../../../actions/appliedAction";
import { fetchSuppliers } from "../../../actions/supplierAction";
import {saveAs} from 'file-saver'
import { useRef } from "react";
const Table = ({tenderss,applieds,suppliers,fetchApplieds,fetchTenders,fetchSuppliers}) => {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [edit,setEdit]=useState(false)
  const [editData, setEditData]=useState({})
  const [visibleTop, setVisibleTop] = useState(false);
  const [restart,setRestart]=useState(false)
const [data,setData] =useState({})
const [cloz,setCloz]=useState(true)
const[deleteId,setDeleteId]=useState(0)
const dt = useRef(null);
const exporting = () => {
  dt.exportCSV();
}

  useEffect(()=>{
    fetchTenders()
    fetchApplieds()
  },[])
  console.log(applieds,'applieds')
  let tenders = tenderss.filter((t)=>{
    return t.creator===localStorage.getItem('whoId')
  }); 
  const statusBodyTemplate = (rowData) => {
    const op=rowData.closingDate
    const now=new Date().toISOString()
console.log("now ",now," op ",op,op<now)
    if(op>now)
    return <div className="bg-green-500 flex align-items-center justify-content-center m-5 h-2rem text-white font-medium "  > Active</div>;
    else
    {
      setCloz(true)
      return <div className="bg-yellow-600 flex align-items-center justify-content-center m-5 h-2rem text-white font-medium"> Closed</div>;
}
  };
  const editProduct = () => {};
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-caret-down
"
          className="p-button-rounded mr-2"
          onClick={() => {
            setData(rowData)
            setVisibleTop(true)
          }}
        />
        {cloz&&<Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => {

            setEditData(rowData)
            console.log('setting the data',editData)
            setEdit(true)
            editProduct(rowData)}}
        /> }
        
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={async() => {
            setDeleteId(rowData._id)
            setDeleteProductsDialog(true)
          }}
        />
      </>
    );
  };
  const header = <div style={{textAlign:'left'}}><Button type="button" icon="pi pi-external-link" iconPos="left" label="Export CSV" onClick={exporting}></Button></div>;

  const [deleteProductsDialog, setDeleteProductsDialog] = React.useState(false);
  return tenderss!==null?(
    <>
      <DataTable 
        breakpoint="960px"
        editMode="cell"
        header={header}
        value={tenders}
        responsiveLayout="stack"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[5, 10, 15, 25, 50]}
        dataKey={tenders._id}
        paginator
        rowHover
        selection={selectedCustomers}
        onSelectionChange={(e) => setSelectedCustomers(e.value)}
        emptyMessage="Data Not Found"
        className="datatable-responsive text-2xl"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tenders"
        rows={10}
        ref={dt}
      >
        <Column style={{ width: '20%' }} field="title"  sortable filter header="Tender Name"></Column>
        <Column field="publishedDate" sortable  header="Published Date"></Column>
        <Column field="closingDate" sortable  header="Closing Date"></Column>
        <Column field="bidOpenOn" sortable  header="Bid Opening Date"></Column>
        <Column
          field={"title"}
          header="Status"
          sortable
          style={{ minWidth: "10rem" }}
          body={statusBodyTemplate}
          
        />
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
          fetchTenders()
          setEdit(false);
        }}>
            <FormikFormDemo data={editData} />

        </Dialog>
      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "450px" }}
        header="Confirm Delete"
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
              className="p-button-text text-yellow-50 bg-pink-500 "
              onClick={(async() => {
                await axios.delete(`http://localhost:5001/tenders/${deleteId}`)
            .then((e)=>{
              fetchTenders()
              if(restart)
              setRestart(false)
              else
              setRestart(true)

            })
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
          {<span>Are you sure you want to delete the selected Tender?</span>}
        </div>
      </Dialog>
      <Sidebar className="  border-cyan-500 border-3 border-round-md m-2 flex align-items-center justify-content-center" visible={visibleTop} position="top" style={{width:"70%",height:"85%",left:"8%"}} onHide={() => setVisibleTop(false)}>
                    <div className="border-round-xl border-double h-18rem text-white " style={{backgroundColor:'#8940d6'}}>
                     <center><h1 className="text-white">{data.title}</h1> <h2><pre> የጨረታ ቁጥር {data.number}<br/>{data.type}</pre></h2> <hr></hr></center>
                    </div>
                    <h1>{data.description}</h1>
                    <h1>{data.title}</h1> 
                    <h1>ጨርታዉ የተከፈተበት _ <i className="">{new Date(data.publishedDate).toDateString()}</i></h1>
                    <h1>ጨረታዉ የሚዘጋው <i className="">{new Date(data.closingDate).toDateString()}</i></h1>
                    <h1>ሰነድ የሚከፈተው <i className="">{new Date(data.bidOpenOn).toDateString()}</i></h1>
                    <hr></hr>
                    <h1><i className="">የጨረታ መስፈርቶች</i>  <p className=""> {data.termsAndConditions}</p></h1> 
                    {data.applicants!==null && <h2> <hr></hr>

        </h2>}
      <center> <h1>Suppliers Who Applied For This Tender</h1></center><hr/>
        {applieds.map((ap)=>{   
          if(new Date().toISOString()<new Date().toISOString(data.bidOpenOn))
         { 
          console.log("app",ap)
          var sup=[]
          if(ap.applier!==null)
          {
             sup=suppliers.filter((su)=>{
            return (su._id===ap.applier)
          })}
          console.log("BELCASH",sup)
          if(ap.tender._id===data._id)
         {
           return sup.length>0?(
            <> 
            <center>
              <p className="text-indigo-300 border-1 surface-border p-5 border-round-xs">
           <h3 className="text-2xl bg-yellow-50">{
            sup[0].personalInfo.firstName} {sup[0].personalInfo.lastName
            } 
            </h3> 

               <Button
                icon="pi pi-download"
                 className="ml-4 p-button-rounded p-button-success" 
                 aria-label="User"
                 label="Business Bid"
                 onClick={(()=>{
                  window.open(`http://localhost:5001/image/${ap.businessDoc}`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=400,width=1350,height=800");
                    saveAs(`http://localhost:5001/image/${ap.businessDoc}`,`BusinesDOc ${sup[0].personalInfo.firstName} ${sup[0].personalInfo.lastName}.pdf`)
                 })}
                 />
                 <Button
                icon="pi pi-download"
                 className="ml-4 p-button-rounded p-button-info" 
                 aria-label="User"
                 label="Tecnical Bid"
                 onClick={(()=>{
                  window.open(`http://localhost:5001/image/${ap.technicalDoc}`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=400,width=1350,height=800");
                    saveAs(`http://localhost:5001/image/${ap.technicalDoc}`,`BusinesDOc ${sup[0].personalInfo.firstName} ${sup[0].personalInfo.lastName}`)
                 })}
                 />

 </p>
            </center>
            
            </>
           ):''
          
          }}
        })}
                </Sidebar>
    </>
  ):<ProgressBar/>;
};

const mapStateToProps = (state) => {
  return {
    tenderss: state.tenders.tenders,
    applieds: state.applied.applied,
    suppliers:state.suppliers.suppliers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTenders: () => dispatch(fetchTender()),
    fetchApplieds: () => dispatch(fetchApplied()),
    fetchSuppliers:()=>dispatch(fetchSuppliers()),

  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Table);
