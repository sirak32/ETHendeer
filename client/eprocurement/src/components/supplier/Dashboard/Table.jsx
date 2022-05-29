// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { FiDelete, FiEdit } from 'react-icons/fi';
// import { RiEditBoxFill } from 'react-icons/ri';
// import { FaAngrycreative, FaCircle, FaEdit, FaRegEdit, FaUserEdit } from 'react-icons/fa';
// import { MdDelete } from 'react-icons/md';
// import axios from 'axios'
// import Button from '@mui/material/Button'
// import { GiGreenPower, GiNextButton } from 'react-icons/gi';
// import { BsPlayFill } from 'react-icons/bs';
// import Modal from './Modal'

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// function createData(tenderId, tenderTitle, openingDate, closingDate, status) {
//   return { tenderId, tenderTitle, openingDate, closingDate, status };
// }

// export default function CustomizedTables(props) {
//   let date=props.data[0].bidOpenOn
//   const rows = [
//     createData(props.data[0].title, props.data[0].bidOpenOn, props.data[0].closingDate, props.data[0].bidOpenOn, 'Active'),
//     createData(props.data[1].title, props.data[1].bidOpenOn, props.data[1].closingDate, props.data[1].bidOpenOn,'Active'),
//     createData(props.data[2].title, props.data[2].bidOpenOn, props.data[2].closingDate, props.data[2].bidOpenOn, 'Active'),
//     createData(props.data[3].title, props.data[3].bidOpenOn,props.data[3].closingDate, props.data[3].bidOpenOn,'Active'),
//     createData(props.data[4].title, props.data[4].bidOpenOn, props.data[4].closingDate, props.data[4].bidOpenOn,'Active'),
//     createData(props.data[5].title, props.data[5].bidOpenOn, props.data[5].closingDate, props.data[5].bidOpenOn, 'Active'),
//     createData(props.data[6].title, props.data[6].bidOpenOn, props.data[6].closingDate, props.data[6].bidOpenOn,'Active'),
//     createData(props.data[7].title, props.data[7].bidOpenOn, props.data[7].closingDate, props.data[7].bidOpenOn, 'Active'),
//     createData(props.data[8].title, props.data[8].bidOpenOn,props.data[8].closingDate, props.data[8].bidOpenOn,'Active'),
//     createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].closingDate, props.data[9].bidOpenOn,'Active'),
//   ];

// const [data, setData]=React.useState(null)
// //  const c=React.useCallback(() => {
// // axios.get('http://localhost:5001/tenders')
// //   .then((response) => {
// //     // const username=response.data.user[0].username;
// //     // console.log(response.data.status)
// //     // setData()

// //   }

// //   ).catch((e)=>console.log(e));

// //   axios.get('http://localhost:5001/tenders')
// //   .then((response) => {
// //     // const data={"tenders":response.data}
// //     console.log('initial',data)
// //     console.log(response.data.status)
// //     // console.log(data)
// //     const temp=response.data.status
// //     setData(temp)
// //     console.log('data',data)

// //   }

// //   ).catch((e)=>console.log(e));

// //  }, []);
// //  React.useEffect(()=>{
// //   const tenderList= async()=>{
// //     const response=await axios.get('http://localhost:5001/tenders')
// //   setData(response.data.status)
// //     console.log('response',response.data.status,'data',data)
// //   }
// //  tenderList()
// //  },[])
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Tender Id</StyledTableCell>
//             <StyledTableCell align="right">Published Date</StyledTableCell>
//             <StyledTableCell align="right">Opening Date</StyledTableCell>
//             <StyledTableCell align="right">Closing Date</StyledTableCell>
//             <StyledTableCell align="right">Status</StyledTableCell>
//             <StyledTableCell align="right"></StyledTableCell>
//             <StyledTableCell align="right"></StyledTableCell>
//             <StyledTableCell align="right"></StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <StyledTableRow key={row.tenderId}>
//               <StyledTableCell component="th" scope="row">
//                 {row.tenderId}
//               </StyledTableCell>
//               <StyledTableCell align="right">{row.tenderTitle}</StyledTableCell>
//               <StyledTableCell align="right">{row.openingDate}</StyledTableCell>
//               <StyledTableCell align="right">{row.closingDate}</StyledTableCell>
//               <StyledTableCell align="right">{row.status} <FaCircle color='#0ac253'/> </StyledTableCell>
//               <StyledTableCell align="right">
//                <Button onClick={()=>{
//                 alert(row.tenderId)
//               }}  color='primary' endIcon={  <FaEdit />} variant='contained'>
//                 EDIT
//                  </Button>
//                 </StyledTableCell>
//                 <StyledTableCell align="right">
//                <Button onClick={()=>{alert('You wanna delete?')}} color='error' endIcon={ <MdDelete/>} variant='contained'>
//                 DELETE
//                  </Button>
//                 </StyledTableCell>
//                 <StyledTableCell align="right">
//                   {/* <a style={{textDecoration:'none'}} href='tender-detail'>
//                <Button color='info' endIcon={  <BsPlayFill />} variant='outlined' >
//                 See More

//                  </Button>
//                   </a> */}
//                   <Modal/>
//                 </StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FormikFormDemo } from "./EditTender";
import { Sidebar } from 'primereact/sidebar';

const Table = (props) => {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [edit,setEdit]=useState(false)
  const [visibleTop, setVisibleTop] = useState(false);
const [data,setData] =useState({})
  function createData(
    tenderNO,
    tenderId,
    tenderTitle,
    openingDate,
    closingDate,
    status
  ) {
    return {
      tenderNO,
      tenderId,
      tenderTitle: tenderTitle.split("T")[0],
      openingDate: openingDate.split("T")[0],
      closingDate: closingDate.split("T")[0],
      status,
    };
  }
  let dataa = props.data;
  console.log("my NEw KINGDOM", dataa);
  let i;

  const rows = [];
  for (i = 0; i < dataa.length; i++) {
    rows[i] = createData(
      i,
      dataa[i].title,
      dataa[i].bidOpenOn,
      dataa[i].closingDate,
      dataa[i].bidOpenOn,
      "Active"
    );
  }
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
    return (
      <>
        <Button
          icon="pi pi-caret-down
"
          className="p-button-rounded mr-2"
          onClick={() => {
            setVisibleTop(true)
            setData(rowData)
          }}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => {
            setEdit(true)
            editProduct(rowData)}}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => {
            setDeleteProductsDialog(true);
          }}
        />
      </>
    );
  };
  console.log("rows are", rows);
  const [deleteProductsDialog, setDeleteProductsDialog] = React.useState(false);
  return (
    <>
      <DataTable
        breakpoint="960px"
        editMode="cell"
        header="Tenders List"
        value={rows}
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[5, 10, 15, 25, 50]}
        dataKey={rows.tenderNO}
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
        <Column field="tenderId" sortable filter header="Tender Name"></Column>
        <Column field="tenderTitle" sortable  header="Published Date"></Column>
        <Column field="openingDate" sortable  header="Bid Opening Date"></Column>
        <Column field="closingDate" sortable  header="Closing Date"></Column>
        {/* <Column field='status' sortable header='status'></Column> */}
        <Column
          field="status"
          header="Status"
          sortable
          style={{ minWidth: "10rem" }}
          body={statusBodyTemplate}
          
        />
        {/* <Column  headerStyle={{ width: '4rem', textAlign: 'center' }}  style={{ minWidth: '10rem' }}bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={editButton} /> */}
        {/* <Column  headerStyle={{ width: '4rem', textAlign: 'center' }} style={{ minWidth: '10rem' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={deleteButton} /> */}
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
          setEdit(false);
        }}>
            <FormikFormDemo/>

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
      <Sidebar  visible={visibleTop} position="top" style={{width:"70%",height:"85%",left:"8%"}} onHide={() => setVisibleTop(false)}>
                    <h3>Top Sidebar</h3>
                    <h1>{data.tenderId}</h1>
                    <h1>Tender Description</h1>
                    <h1>Tender Number</h1>
                    <h1>Tender `Description`</h1>

                </Sidebar>
    </>
  );
};

export default Table;
