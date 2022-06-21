import styled from "styled-components";
import SideBar from "../components/supplier/Dashboard/SideBar.jsx";
import NavBar from "../components/supplier/Dashboard/NavBar";
import Tenderlist from "../components/supplier/Dashboard/TenderList.jsx";
import Table from "../components/supplier/Dashboard/Table";
import BasicTabs from "../components/supplier/Dashboard/BasicTab.jsx";
import MediaCard from "../components/supplier/Dashboard/TenderPost.jsx";
import Dash from '../components/supplier/Dashboard/Dash'
import AddOfficer from '../components/supplier/Dashboard/AddOfficer'
import OfficersList from "../components/supplier/Dashboard/OfficersList";
import RegisterSupplier from '../components/supplier/Dashboard/RegisterSupplier'
import AdminTab from '../components/supplier/Dashboard/AdminTab'
import { FilePicker } from 'evergreen-ui'
import { fetchSuppliers } from "../actions/supplierAction.js";
import { fetchOfficer } from "../actions/officerAction.js";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
 import { useNavigate } from "react-router";
import { fetchPending } from "../actions/pendingAction.js";
import Side from '../components/supplier/Dashboard/AdmSide'
import axios from "axios";
import { fetchLoginStat } from "../actions/loginStatAction.js";
import { ProgressBar } from "primereact/progressbar";
import Grid from '@mui/material/Grid'
import { ProgressSpinner } from 'primereact/progressspinner';
import Cont from '@mui/material/Container'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const App = ({suppliers,fetchSuppliers,officers,fetchOfficers,pendings,fetchPendings,stats,fetchLoginStats}) => {
  const menus=['Dashboard','Officers','Suppliers',]
  const [data,setData]=useState({
    username:'tilik',
    oldPassword:'',
    newPassword:'',
    confirmPassword:''
  })
  const navigate=useNavigate()
  let logMonthly={
    Sep:0,
    Oct:0,
    Nov:0,
    Dec:0,  
    Jan:0,  
    Feb:0,
    Mar:0,
    Apr:0, 
    May:0, 
    Jun:0,
    Jul:0,
    Aug:0,  
  }
  const [month,setMonth]=useState(logMonthly)
  const [tog,setTog]=useState(false)
  let statis
  const [basicData,setBasicData] = useState({
  });
  useEffect(async()=>{
    const role=localStorage.getItem('role')

        if(role!=='admin')
        navigate('/')
        fetchLoginStats()
        fetchPendings()
    fetchSuppliers()
if(Object.keys(stats).length!==0)
      { statis={
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
        datasets: [ 
          {
              label: 'Number Of Login',
              backgroundColor: '#42A5F5', 
              data: [stats.login.Jan, stats.login.Feb, stats.login.Mar, stats.login.Apr, stats.login.May, stats.login.Jun, stats.login.Jul, stats.login.Aug,stats.login.Sep, stats.login.Oct, stats.login.Nov, stats.login.Dec]
          },
          
      ]
      }}
      else{
        statis={
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
          datasets: [ 
            {
                label: 'Number Of Login',
                backgroundColor: '#42A5F5', 
                data: [0,0,0,0,0,0,0,0,0,0,0,0]
            },
            
        ]
        }
      }

    fetchOfficers()
    // fetchLoginStats()


  },[])
  let basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: .8,
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
};

  return (Object.keys(stats).length!==0)? ( 
    <Div>
      <Side active={3}  menu={menus} />

      <Section>
        <div className="grid"> 
          <div className="row__one">
          <Cont maxWidth={'xs'} className='mt-7'>
            <Form onSubmit={(e)=>{
              e.preventDefault()
              if(data.confirmPassword.localeCompare(data.newPassword)===0){
                axios.patch(`http://localhost:5001/change-account/tilik`,{newPassword:data.newPassword,oldPassword:data.oldPassword,username:data.username})
                .then((res)=>{
                  navigate('/admin')
                })
                .catch((e)=>{
                  alert('Incorrect Password',e)
                })
              }
              else
              {
                alert("Password don't Match")
              }
            }}>
      <Form.Group as={Row} className="mb-3" controlId="username">
        <Form.Label column sm="2">
          Username
        </Form.Label>
        <Col sm="10">
          <Form.Control
        //   defaultValue={usern}
          onChange={(e)=>{
            setData({...data,username:e.target.value})
          }} size="lg" required    />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="oldPassword">
        <Form.Label column sm="2">
          Old Password
        </Form.Label>
        <Col sm="10">
          <Form.Control 
          min={8}
          size="lg"
           required
            type="password"
            onChange={(e)=>{
              setData({...data,oldPassword:e.target.value})
            }}
             placeholder="old Password" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" required controlId="newPassword">
        <Form.Label column sm="2">
          New Password
        </Form.Label>
        <Col sm="10">
          <Form.Control 
          min={8}
          onChange={(e)=>{
            setData({...data,newPassword:e.target.value})
          }}
          size="lg"  
          type="password" 
          placeholder="new Password" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" required controlId="confirmPassword" >
        <Form.Label column sm="2" >
          Confirm Password
        </Form.Label>
        <Col sm="10">
          <Form.Control
          min={8}
          onChange={((e)=>{
            // console.log(e.target.value)
            setData({...data,confirmPassword:e.target.value})
          })}
           size="lg"
            required
             type="password" placeholder="confirm Password" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="">
        <Form.Label column sm="2">
          
        </Form.Label>
        <Col sm="10">
        <Button type='submit' variant="success">Done</Button>{' '}
        <Button type='reset' variant="warning">Reset</Button>{' '}

        </Col>
      </Form.Group>

    </Form>
            </Cont>          </div>
          <div className="row__two"></div>
        </div>
      </Section>
    </Div>

  ):<> <center> <ProgressSpinner/></center> </>;
};


const mapStateToProps = (state) => {
  return {
    suppliers:state.suppliers.suppliers,
    officers:state.officers.officers,
    pendings:state.pendings.pendings,
    stats:state.stat.stat

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSuppliers:()=>dispatch(fetchSuppliers()),
    fetchOfficers:()=>dispatch(fetchOfficer()),
    fetchPendings:()=>dispatch(fetchPending()),
    fetchLoginStats:()=>dispatch(fetchLoginStat())
  };
};

const Div = styled.div`
  position: relative;
`;
const Container = styled.div`
  display: flex;
  height: 97vh;
  background: linear-gradient(to bottom right, white 0% #e6e4ff 70%);
  border-radus: 2rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
  }
`;
const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      /* grid-template-columns: repeat(2, 1fr); */
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
const Wrapper=styled.div`
display:flex;
padding:2rem 0;
gap:3rem;
border-radius:2rem;
// justify-content:space-around;
`;


export default connect(mapStateToProps,mapDispatchToProps)(App);
