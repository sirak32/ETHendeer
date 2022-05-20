import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FiDelete, FiEdit } from 'react-icons/fi';
import { RiEditBoxFill } from 'react-icons/ri';
import { FaAngrycreative, FaCircle, FaEdit, FaRegEdit, FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios'
import Button from '@mui/material/Button'
import { GiGreenPower, GiNextButton } from 'react-icons/gi';
import { BsPlayFill } from 'react-icons/bs';
import Modal from './Modal'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(tenderId, tenderTitle, openingDate, closingDate, status) {
  return { tenderId, tenderTitle, openingDate, closingDate, status };
}


export default function CustomizedTables(props) {
  let date=props.data[0].bidOpenOn
  const rows = [
    createData(props.data[0].title, props.data[0].bidOpenOn, props.data[0].closingDate, props.data[0].bidOpenOn, 'Active'), 
    createData(props.data[1].title, props.data[1].bidOpenOn, props.data[1].closingDate, props.data[1].bidOpenOn,'Active'),
    createData(props.data[2].title, props.data[2].bidOpenOn, props.data[2].closingDate, props.data[2].bidOpenOn, 'Active'),
    createData(props.data[3].title, props.data[3].bidOpenOn,props.data[3].closingDate, props.data[3].bidOpenOn,'Active'), 
    createData(props.data[4].title, props.data[4].bidOpenOn, props.data[4].closingDate, props.data[4].bidOpenOn,'Active'),
    createData(props.data[5].title, props.data[5].bidOpenOn, props.data[5].closingDate, props.data[5].bidOpenOn, 'Active'), 
    createData(props.data[6].title, props.data[6].bidOpenOn, props.data[6].closingDate, props.data[6].bidOpenOn,'Active'),
    createData(props.data[7].title, props.data[7].bidOpenOn, props.data[7].closingDate, props.data[7].bidOpenOn, 'Active'),
    createData(props.data[8].title, props.data[8].bidOpenOn,props.data[8].closingDate, props.data[8].bidOpenOn,'Active'), 
    createData(props.data[9].title, props.data[9].bidOpenOn, props.data[9].closingDate, props.data[9].bidOpenOn,'Active'),
  ];
  
const [data, setData]=React.useState(null)
//  const c=React.useCallback(() => {
// axios.get('http://localhost:5001/tenders')
//   .then((response) => {
//     // const username=response.data.user[0].username;
//     // console.log(response.data.status)
//     // setData()
  
//   }
  
//   ).catch((e)=>console.log(e));
  
//   axios.get('http://localhost:5001/tenders')
//   .then((response) => {
//     // const data={"tenders":response.data}
//     console.log('initial',data)
//     console.log(response.data.status)
//     // console.log(data)
//     const temp=response.data.status
//     setData(temp)
//     console.log('data',data)

//   }
  
//   ).catch((e)=>console.log(e));
  
//  }, []);
//  React.useEffect(()=>{
//   const tenderList= async()=>{
//     const response=await axios.get('http://localhost:5001/tenders')
//   setData(response.data.status)
//     console.log('response',response.data.status,'data',data)
//   } 
//  tenderList()
//  },[])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tender Id</StyledTableCell>
            <StyledTableCell align="right">Published Date</StyledTableCell>
            <StyledTableCell align="right">Opening Date</StyledTableCell>
            <StyledTableCell align="right">Closing Date</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.tenderId}>
              <StyledTableCell component="th" scope="row">
                {row.tenderId}
              </StyledTableCell>
              <StyledTableCell align="right">{row.tenderTitle}</StyledTableCell>
              <StyledTableCell align="right">{row.openingDate}</StyledTableCell>
              <StyledTableCell align="right">{row.closingDate}</StyledTableCell>
              <StyledTableCell align="right">{row.status} <FaCircle color='#0ac253'/> </StyledTableCell>
              <StyledTableCell align="right">
               <Button color='primary' endIcon={  <FaEdit />} variant='contained'>
                EDIT
                 </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
               <Button onClick={()=>{alert('You wanna delete?')}} color='error' endIcon={ <MdDelete/>} variant='contained'>
                DELETE
                 </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {/* <a style={{textDecoration:'none'}} href='tender-detail'>
               <Button color='info' endIcon={  <BsPlayFill />} variant='outlined' >
                See More
                    
                 </Button>
                  </a> */}
                  <Modal/>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
