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
import { Chart } from 'primereact/chart';
import axios from "axios";
import { fetchLoginStat } from "../actions/loginStatAction.js";
import { ProgressBar } from "primereact/progressbar";
import Grid from '@mui/material/Grid'
import { ProgressSpinner } from 'primereact/progressspinner';
 
const App = ({suppliers,fetchSuppliers,officers,fetchOfficers,pendings,fetchPendings,stats,fetchLoginStats}) => {
  const menus=['Dashboard','Officers','Suppliers',]
  // console.log("from admin panel officers",suppliers,officers)
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

// console.log('Tester Test',stats)
// if (Object.keys(stats).length===0)
// console.log('FROM INSA')
  // console.log('pendings are ',pendings)
  return (Object.keys(stats).length!==0)? ( 
    <Div>
      {/* <SideBar  menu={menus} /> */}
      <Side active={0}  menu={menus} />

      <Section>
        <NavBar />
        <div className="grid"> 
          <div className="row__one">
            <Grid>
              <Grid item xs={6}>
<div className="card">
               <center> <h5 className="text-teal-500 text-lg">Login Statistics </h5></center>
                <Chart type="line" data={{
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
        datasets: [ 
          {
              label: 'Login',
              backgroundColor: '#42A5F5', 
              data: [stats.login.Jan, stats.login.Feb, stats.login.Mar, stats.login.Apr, stats.login.May, stats.login.Jun, stats.login.Jul, stats.login.Aug,stats.login.Sep, stats.login.Oct, stats.login.Nov, stats.login.Dec]
          },
          
      ]
      }} options={basicOptions}  
      style={{ position: 'relative', width: '60%' }} 
      />
            </div>
              </Grid>
              <Grid item xs={6}>
                <div className="card">
                <center> <h5 className="text-teal-500 text-lg">Registration Statistics </h5></center>
                <Chart type="bar" data={{
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
        datasets: [ 
          {
              label: 'Registration',
              backgroundColor: '#85F', 
              data: [stats.register.Jan, stats.register.Feb, stats.register.Mar, stats.register.Apr, stats.register.May, stats.register.Jun, stats.register.Jul, stats.register.Aug,stats.register.Sep, stats.register.Oct, stats.register.Nov, stats.register.Dec]
          },
          
      ]
      }} options={basicOptions} 
       style={{ position: 'relative', width: '60%' }} 
       />
            </div>
                </Grid>
            </Grid>
          <Wrapper>
            <Dash title="Suppliers" color={'bg-cyan-500'} number={suppliers.length}/>
            <Dash title="Officers" color={'bg-indigo-400'} number={officers.length}/>
            <Dash title="Pending " color={'bg-orange-500'} number={pendings.length}/>
            </Wrapper>
            <AdminTab data={{suppliers,officers,pendings}}/>
          </div>
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
justify-content:space-around;
`;


export default connect(mapStateToProps,mapDispatchToProps)(App);
