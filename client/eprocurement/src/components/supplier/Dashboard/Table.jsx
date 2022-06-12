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


const Table = ({tenderss,fetchTenders}) => {
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
    const op=rowData.bidOpenOn
    const now=new Date().toISOString()
console.log("now ",now," op ",op,op<now)
    if(op>now)
    return <Button label={`Active`} className="p-button-success" />;
    else
    return <Button label={`Closed`} className="p-button-warning" />;


    
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
            setData(rowData)
            setVisibleTop(true)
          }}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => {

            setEditData(rowData)
            console.log('setting the data',editData)
            setEdit(true)
            editProduct(rowData)}}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={async() => {
            // alert(rowData._id)
            await axios.delete(`http://localhost:5001/tenders/${rowData._id}`)
            .then((e)=>{
              fetchTenders()
              if(restart)
              setRestart(false)
              else
              setRestart(true)

            })

            // setDeleteProductsDialog(true);
          }}
        />
      </>
    );
  };
  const [deleteProductsDialog, setDeleteProductsDialog] = React.useState(false);
  return tenderss!==null?(
    <>
      <DataTable
        breakpoint="960px"
        editMode="cell"
        header="Tenders List"
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
        className="datatable-responsive"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tenders"
        rows={10}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3em" }}
        ></Column>
        {console.log("tenders are",tenders)}
        <Column field="title" style={{width:"300px"}} sortable filter header="Tender Name"></Column>
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
      <Sidebar className=" text-500 border-cyan-500 surface-overlay border-3 border-round-md font-bold m-2 flex align-items-center justify-content-center" visible={visibleTop} position="top" style={{width:"70%",height:"85%",left:"8%"}} onHide={() => setVisibleTop(false)}>
                     <center><h1 className="text-white">{data.title}</h1> <h2><pre> የጨረታ ቁጥር {data.number}<br/>{data.type}</pre></h2> <hr></hr></center>
                       
                    <h1>{data.description}</h1>
                    <h1>{data.title}</h1> 
                    <h1>ጨርታዉ የተከፈተበት _ <i className="text-300 text-white">{new Date(data.publishedDate).toDateString()}</i></h1>
                    <h1>ጨረታዉ የሚዘጋው <i className="text-white">{new Date(data.closingDate).toDateString()}</i></h1>
                    <h1>ሰነድ የሚከፈተው <i className="text-white">{new Date(data.bidOpenOn).toDateString()}</i></h1>
                    <hr></hr>
                    <h1><i className="">የጨረታ መስፈርቶች</i>  <p className="text-white"> {data.termsAndConditions}</p></h1> 
                    {data.applicants==[] && <h2>
          You have unread messages.
        </h2>}
                </Sidebar>
    </>
  ):<ProgressBar/>;
};

const mapStateToProps = (state) => {
  return {
    tenderss: state.tenders.tenders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTenders: () => dispatch(fetchTender()),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Table);
