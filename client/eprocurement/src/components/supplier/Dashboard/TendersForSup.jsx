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
import { InputText } from "primereact/inputtext";
import { fetchApplied } from "../../../actions/appliedAction";
const Table = ({tenderss,applieds,fetchTenders,fetchApplieds}) => {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [edit,setEdit]=useState(false)
  const [editData, setEditData]=useState({})
  const [visibleTop, setVisibleTop] = useState(false);
  const [restart,setRestart]=useState(false)
const [data,setData] =useState({})
  useEffect(()=>{
    fetchTenders()
  },[])
  let tenders = tenderss.filter((t)=>{
    return t.creator===localStorage.getItem('whoId')
  });
//   let appliedss = applieds[32].tender 
  let appT=[]
  console.log(applieds)
  applieds.map((ap)=>{ 
      // console.log(ap)
      // if(ap.applier._id===localStorage.getItem('whoId'))
      // appT.push(ap.tender)
    })
    console.log('This is Mr',appT) 



  const statusBodyTemplate = (rowData) => {
    const op=rowData.bidOpenOn
    const now=new Date().toISOString()
console.log("now ",now," op ",op,op<now)
    if(op>now)
    return <div className="bg-green-500 flex align-items-center justify-content-center m-5 h-2rem text-white font-medium "  > Active</div>;
    else
    return <div className="bg-yellow-600 flex align-items-center justify-content-center m-5 h-2rem text-white font-medium"> Closed</div>;
  };
  const editProduct = () => {};
  const confirmDeleteProduct = () => {};
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-caret-down"
          className="p-button-rounded mr-2"
          onClick={() => {
            setData(rowData)
            setVisibleTop(true)
          }}
        />
      </>
    );
  };
  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
}
  const [deleteProductsDialog, setDeleteProductsDialog] = React.useState(false);
  return tenderss!==null?(
    <>
      <DataTable
        breakpoint="960px"
        // editMode=''
        // header="Applied Tenders List"
        header={<center><h2 className="text-teal-400">Applied Tenders List</h2></center>}
        value={appT}
        responsiveLayout="stack"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[5, 10, 15, 25, 50]}
        dataKey={appT._id}
        paginator
        rowHover
        selection={selectedCustomers}
        onSelectionChange={(e) => setSelectedCustomers(e.value)}
        emptyMessage={<center><h4>No Applied Tender Found</h4></center>}
        className="datatable-responsive"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tenders"
        rows={10}
      >
        {/* <Column
        
          selectionMode="multiple"
          headerStyle={{ width: "3em" }}
        ></Column> */}
        {console.log("tenders are",tenders)}
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
      <Sidebar className=" text-500 border-cyan-500 border-3 border-round-md m-2 flex align-items-center justify-content-center" visible={visibleTop} position="top" style={{width:"70%",height:"85%",left:"8%"}} onHide={() => setVisibleTop(false)}>
                    <div className="border-round-3xl border-double h-18rem text-white " style={{backgroundColor:'#8940d6'}}>
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
          {/* {data.applicants} */}
        </h2>}
                </Sidebar>
    </>
  ):<ProgressBar/>;
};

const mapStateToProps = (state) => {
  return {
    tenderss: state.tenders.tenders,
    applieds: state.applied.applied,


  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTenders: () => dispatch(fetchTender()),
    fetchApplieds: () => dispatch(fetchApplied()),

  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Table);
