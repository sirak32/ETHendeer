import styled from "styled-components";
import SideBar from "../components/supplier/Dashboard/SideBar.jsx";
import NavBar from "../components/supplier/Dashboard/NavBar";
import Dash from '../components/supplier/Dashboard/Dash'
import AdminTab from '../components/supplier/Dashboard/AdminTab'
import { fetchSuppliers } from "../actions/supplierAction.js";
import { fetchOfficer } from "../actions/officerAction.js";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
 import { useNavigate } from "react-router";
import { fetchPending } from "../actions/pendingAction.js";
import Side from '../components/supplier/Dashboard/AdmSide'
import axios from "axios";
import { fetchLoginStat } from "../actions/loginStatAction.js";
import { ProgressSpinner } from 'primereact/progressspinner';
import Chartt from 'react-apexcharts'
const App = ({suppliers,fetchSuppliers,officers,fetchOfficers,pendings,fetchPendings,stats,fetchLoginStats}) => {
  const menus=['Dashboard','Officers','Suppliers',]
  const navigate=useNavigate()
  let statis
  useEffect(async()=>{
    const role=localStorage.getItem('role')
        if(role!=='admin')
        navigate('/')
        fetchLoginStats()
        fetchPendings()
        fetchSuppliers()
        fetchOfficers()
  },[])

  return Object.keys(stats).length !== 0 ? (
    <Div>
      <Side active={0} menu={menus} />

      <Section>
        <NavBar />
        <div className="grid">
          <div className="row__one">
          <center>
             <Chartt options={{chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]
        }}} series={
          [
            {
          name: 'Login',
          data: [
            stats.login.Jan,
            stats.login.Feb,
            stats.login.Mar,
            // stats.login.Apr,
            40,
            // stats.login.May,
            60,
            stats.login.Jun,
            stats.login.Jul,
            stats.login.Aug,
            stats.login.Sep,
            stats.login.Oct,
            stats.login.Nov,
            stats.login.Dec, 
          ]
        },
        {
          name: 'Registered Suppliers',
          data: [
            stats.register.Jan,
            stats.register.Feb,
            stats.register.Mar,
            stats.register.Apr,
            // 40,
            stats.register.May,
            // 60,
            stats.register.Jun,
            stats.register.Jul,
            stats.register.Aug,
            stats.register.Sep,
            stats.register.Oct,
            stats.register.Nov,
            stats.register.Dec, 
          ]
        },
        {
          name: 'Bid Participation',
          data: [
            stats.apply.Jan,
            stats.apply.Feb,
            stats.apply.Mar,
            // stats.apply.Apr,
            80,
            // stats.apply.May,
            10,
            stats.apply.Jun,
            stats.apply.Jul,
            stats.apply.Aug,
            stats.apply.Sep,
            stats.apply.Oct,
            stats.apply.Nov,
            stats.apply.Dec, 
          ]
        }
      ]
        } type='area' width={'100%'} height={320} />
        </center>
            <Wrapper className="mt-6">
              <Dash
                title="Suppliers"
                color={"bg-cyan-500"}
                number={suppliers.length}
              />
              <Dash
                title="Officers"
                color={"bg-indigo-400"}
                number={officers.length}
              />
              <Dash
                title="Pending "
                color={"bg-orange-500"}
                number={pendings.length}
              />
            </Wrapper>
            <AdminTab data={{ suppliers, officers, pendings }} />
          </div>
          <div className="row__two"></div>
        </div>
      </Section>
    </Div>
  ) : (
    <>
      <center>
        <ProgressSpinner />
      </center>
    </>
  );
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
