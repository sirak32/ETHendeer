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
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const Table = ({tenderss,applieds,fetchTenders,fetchApplieds}) => {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [edit,setEdit]=useState(false)
  const [editData, setEditData]=useState({})
  const [visibleTop, setVisibleTop] = useState(false);
  const [restart,setRestart]=useState(false)
const [data,setData] =useState({})
const [v,setV]=useState(false)
const [password,setPassword]=useState(null)

  useEffect(()=>{
    fetchTenders()
  },[])
  let tenders = tenderss.filter((t)=>{
    return t.creator===localStorage.getItem('whoId')
  });
  let appT=[]
  applieds.map((ap)=>{ 
      if(ap.applier===localStorage.getItem('whoId'))
      appT.push(ap.tender)
    })

  const statusBodyTemplate = (rowData) => {
    const op=rowData.closingDate
    const now=new Date().toISOString()
    if(op>now)
    return <div className="bg-green-500 flex align-items-center justify-content-center m-5 h-2rem text-white font-medium "  > Active</div>;
    else
    return <div className="bg-yellow-600 flex align-items-center justify-content-center m-5 h-2rem text-white font-medium"> Closed</div>;
  };

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
        <Button
          label="Attend Opening"
          icon="pi pi-caret-right"
          className="p-button-rounded p-button-secondary mr-2"
          onClick={() => {
            setData(rowData)
            setV(true)
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
        header={<center><h3 className="text-teal-400">Applied Tenders List</h3></center>}
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
        className="datatable-responsive text-3xl"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tenders"
        rows={10}
      >
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
      <Dialog
        visible={v}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        onHide={() => {
          setV(false); 
        }}
      > 
   <Form onSubmit={(e)=>{
              e.preventDefault()
              console.log(data._id)
              // if(data.confirmPassword.localeCompare(data.newPassword)===0){
              //   axios.patch(`http://localhost:5001/change-account/${usern}`,{newPassword:data.newPassword,oldPassword:data.oldPassword,username:data.username})
              //   .then((res)=>{  
              //     // navigate('/officer')
              //   })
              //   .catch((e)=>{
              //     alert('Incorrect Password',e)
              //   })
              // }
              // else
              // {
              //   alert("Password don't Match")
              // }
              // axios.patch(`http://localhost:5001/attend-officer`,{password,tenderId,user:localStorage.getItem('user')})


              axios.patch(`http://localhost:5001/attend-supplier/`,{password:password,tenderId:data._id,user:localStorage.getItem('user')})
              .then((res)=>{
                console.log(res.data)
                setV(false)
              })
              .catch((erroe)=>{
                alert('Error')
                setV(false)
              })
          
            }}>

      <Form.Group as={Row} className="mb-3" controlId="oldPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control 
          min={8}
          size="lg"
           required
            type="password"
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
             placeholder="Password" />
        </Col>
      </Form.Group>


      <Form.Group as={Row} className="mb-3" controlId="">
        <Form.Label column sm="2">
          
        </Form.Label>
        <Col sm="10">
        <Button className="w-7" type='submit' variant="success">Done</Button>{' '}
        </Col>
      </Form.Group>

    </Form>
      </Dialog>
      <Sidebar className="  border-cyan-500 border-3 border-round-md m-2 flex align-items-center justify-content-center" visible={visibleTop} position="top" style={{width:"70%",height:"85%",left:"8%"}} onHide={() => setVisibleTop(false)}>
                    <div className="border-round-3xl border-double h-18rem text-white " style={{backgroundColor:'#8940d6'}}>
                     <center><h1 className="text-white">{data.title}</h1> <h2><pre> ???????????? ????????? {data.number}<br/>{data.type}</pre></h2></center>
                    </div>
                    <h1>{data.description}</h1>
                    <h1>{data.title}</h1> 
                    <h1>???????????? ????????????????????? _ <i className="">{new Date(data.publishedDate).toDateString()}</i></h1>
                    <h1>???????????? ??????????????? <i className="">{new Date(data.closingDate).toDateString()}</i></h1>
                    <h1>????????? ?????????????????? <i className="">{new Date(data.bidOpenOn).toDateString()}</i></h1>
                    <h1><i className="">???????????? ?????????????????? =&gt;</i>   {data.termsAndConditions}</h1> 
                    {data.applicants!==null && <h2> 
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
