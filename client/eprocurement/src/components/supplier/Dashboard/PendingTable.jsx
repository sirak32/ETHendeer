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

// function createData(email, phone, email, tinNO, status) {
//   return { email, phone, email, tinNO, status };
// }

// export default function CustomizedTables(props) {
//   let date=props.data[0].bidOpenOn
//   const rows = [
//     createData(props.data[0].title, props.data[0].bidOpenOn, props.data[0].tinNO, props.data[0].bidOpenOn, 'Active'),
//     createData(props.data[1].title, props.data[1].bidOpenOn, props.data[1].tinNO, props.data[1].bidOpenOn,'Active'),
//     createData(props.data[2].title, props.data[2].bidOpenOn, props.data[2].tinNO, props.data[2].bidOpenOn, 'Active'),
//     createData(props.data[3].title, props.data[3].bidOpenOn,props.data[3].tinNO, props.data[3].bidOpenOn,'Active'),
//     createData(props.data[4].title, props.data[4].bidOpenOn, props.data[4].tinNO, props.data[4].bidOpenOn,'Active'),
//     createData(props.data[5].title, props.data[5].bidOpenOn, props.data[5].tinNO, props.data[5].bidOpenOn, 'Active'),
//     createData(props.data[6].title, props.data[6].bidOpenOn, props.data[6].tinNO, props.data[6].bidOpenOn,'Active'),
//     createData(props.data[7].title, props.data[7].bidOpenOn, props.data[7].tinNO, props.data[7].bidOpenOn, 'Active'),
//     createData(props.data[8].title, props.data[8].bidOpenOn,props.data[8].tinNO, props.data[8].bidOpenOn,'Active'),
//     createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
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
//             <StyledTableRow key={row.email}>
//               <StyledTableCell component="th" scope="row">
//                 {row.email}
//               </StyledTableCell>
//               <StyledTableCell align="right">{row.phone}</StyledTableCell>
//               <StyledTableCell align="right">{row.email}</StyledTableCell>
//               <StyledTableCell align="right">{row.tinNO}</StyledTableCell>
//               <StyledTableCell align="right">{row.status} <FaCircle color='#0ac253'/> </StyledTableCell>
//               <StyledTableCell align="right">
//                <Button onClick={()=>{
//                 alert(row.email)
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
import {connect} from 'react-redux'
import { fetchTender } from "../../../actions/tenderAction";
import { FormikFormDemo } from "./EditSupplier";
import { Dialog } from "primereact/dialog";

const Table = (props,{}) => {
  const [edit,setEdit]=useState(false)
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  function createData(id,no, name, email, phone, tinNO) {
    return {id, no, name, email, phone, tinNO };
  }
  let supList = props.data;
  console.log("my NEw KINGDOM", supList);
  let i;

  const rows = [
    // createData(props.data[1].title, props.data[1].bidOpenOn, props.data[1].tinNO, props.data[1].bidOpenOn,'Active'),
    // createData(props.data[2].title, props.data[2].bidOpenOn, props.data[2].tinNO, props.data[2].bidOpenOn, 'Active'),
    // createData(props.data[3].title, props.data[3].bidOpenOn,props.data[3].tinNO, props.data[3].bidOpenOn,'Active'),
    // createData(props.data[4].title, props.data[4].bidOpenOn, props.data[4].tinNO, props.data[4].bidOpenOn,'Active'),
    // createData(props.data[5].title, props.data[5].bidOpenOn, props.data[5].tinNO, props.data[5].bidOpenOn, 'Active'),
    // createData(props.data[6].title, props.data[6].bidOpenOn, props.data[6].tinNO, props.data[6].bidOpenOn,'Active'),
    // createData(props.data[7].title, props.data[7].bidOpenOn, props.data[7].tinNO, props.data[7].bidOpenOn, 'Active'),
    // createData(props.data[8].title, props.data[8].bidOpenOn,props.data[8].tinNO, props.data[8].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
    // createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].tinNO, props.data[9].bidOpenOn,'Active'),
  ];
  const [suppli,setSuppli]=useState({})
  for (i = 0; i < supList.length; i++) {
    console.log(supList[i])
    rows[i] = createData(
      supList[i]._id,
      // supList[i].accountInfo._id,
      // supList[i].personalInfo._id,
      // supList[i].personalInfo.address._id,


      i,
      `${supList[i].personalInfo.firstName} ${supList[i].personalInfo.middleNam} ${supList[i].personalInfo.lastName}`,
      supList[i].personalInfo.email,
      `${supList[i].personalInfo.phoneNumber.countryCode}${supList[i].personalInfo.phoneNumber.regionalCode}${supList[i].personalInfo.phoneNumber.number}`,
      supList[i].tinNumber
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
          onClick={() => confirmDeleteProduct(rowData)}
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
          className="p-button-rounded  p-button-success"
          onClick={() => confirmDeleteProduct(rowData)}
          />
      </>
    );
  };
  console.log("rows are", rows);
  const suppData=[]
  let j
  console.log("supList",supList)
  for(j=0;j<supList.length;j++)
 suppData[j]= {
    firstName: supList[j].personalInfo.firstName,
      middleName:supList[j].personalInfo.middleName,
      lastName: supList[j].personalInfo.lastName,
      phone: supList[j].personalInfo.firstName,
      city: supList[j].personalInfo.firstName,
      subcity: supList[j].personalInfo.firstName,
      wereda: supList[j].personalInfo.firstName,
      kebele: supList[j].personalInfo.firstName,
      businessType: supList[j].personalInfo.firstName,
      tinNumber: supList[ j].tinNumber,
      username: supList[j].personalInfo.firstName,
      
  }
  return (
    <>
    <DataTable
      breakpoint="960px"
      editMode="cell"
      header="Pending Supplier Registration List"
      value={rows}
      responsiveLayout="scroll"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      rowsPerPageOptions={[5, 10, 15, 25, 50]}
      dataKey={rows.name}
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
      <Column field="name" filter sortable header="Supplier Name" ></Column>
      <Column field="phone" sortable header="Phone Number"></Column>
      <Column field="email" sortable header="Email"></Column>
      <Column field="tinNO" sortable header="Tin"></Column>
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
        <FormikFormDemo selected={suppli} />
      </Dialog>
      </>
  );
};
const mapStateToProps = (state) => {
  return {
    tenders: state.tenders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTenders: () => dispatch(fetchTender()),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Table);
