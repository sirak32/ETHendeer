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
import { FaEdit, FaRegEdit, FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios'
import Button from '@mui/material/Button'


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


export default function CustomizedTables() {
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0), 
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3), 
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
const [data, setData]=React.useState(null)
 const c=React.useCallback(() => {
axios.get('http://localhost:5001/tenders')
  .then((response) => {
    // const username=response.data.user[0].username;
    // console.log(response.data.status)
    // setData()
  
  }
  
  ).catch((e)=>console.log(e));
  
  axios.get('http://localhost:5001/tenders')
  .then((response) => {
    // const data={"tenders":response.data}
    console.log(response.data.status)
    console.log(data)
    const temp=response.data.status
    setData(temp)
    console.log(data)

  }
  
  ).catch((e)=>console.log(e));
  
 }, []);
 React.useEffect(()=>{
   c()
 },[data])
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
              <StyledTableCell align="right">{row.status}</StyledTableCell>
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

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
