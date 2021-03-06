import styled from "styled-components";
import SideBar from "../components/supplier/Dashboard/SideBar.jsx";
import NavBar from "../components/supplier/Dashboard/NavBar";
import Tenderlist from "../components/supplier/Dashboard/TenderList.jsx";
import Table from "../components/supplier/Dashboard/Table";
import BasicTabs from "../components/supplier/Dashboard/BasicTab.jsx";
import MediaCard from "../components/supplier/Dashboard/TenderPost.jsx";
import Modal from "../components/supplier/Dashboard/Modal";
import { useSelector, useDispatch, connect } from "react-redux";
import { useEffect,useState } from "react";
import Dash from "../components/supplier/Dashboard/Dash";
import { fetchTender } from "../actions/tenderAction";
import ProgressBar from '../components/supplier/Dashboard/ProgressBar'
import { useNavigate } from 'react-router-dom'
import { fetchSuppliers } from "../actions/supplierAction.js";
import Side from '../components/supplier/Dashboard/SideOff'
import Cont from '@mui/material/Container'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const App = ({ tenders, fetchTenders,fetchSuppliers,suppliers }) => {
  const navigate=useNavigate()
  const [logged,setLogged]=useState(false)
  const usern=localStorage.getItem('user')
  const [data,setData]=useState({
    tenderId:'',
    password:''
  })
   const menus = ["Dashboard", "Tender", "Suppliers", "Tender Manual"];
  useEffect(() => {
        const role=localStorage.getItem('role')
        if(role!=='officer')
        navigate('/')
        fetchTenders();
        fetchSuppliers()
  }, []);
  const OptmTender = [];
  let i;
  for (i = 0; i < tenders.length; i++) {
    OptmTender[i] = { 
      title: tenders[i].title, 
      tenderNo: tenders[i].number,
      bidOpenOn:tenders[i].bidOpenOn,
      closingDate:tenders[i].closingDate 
    };
  }
  console.log("tender from belcash", tenders,'supplier from redux',suppliers);
  const t = tenders.map((tender) => <h1>{tender.title}</h1>);
  let closedNo=0
  return tenders ? (
    <Div>
      <Side active={2} menu={menus}/>
      <Section>
        <div className="grid">
          <div className="row__one"> 
            <Wrapper>
            <Cont maxWidth={'xs'} className='' style={{marginTop:'20rem'}}>
            <Form onSubmit={(e)=>{
              e.preventDefault()
             console.log(data)
             axios.patch(`http://localhost:5001/attend-officer`,{tenderId:data.tenderId,user:localStorage.getItem('user'),password:data.password})
             .then((res)=>{
                fetchTenders()
                navigate('/officer')
                console.log(res.data)
             })
            }}>
                <Form.Group as={Row} className="mb-3" controlId="tenderId">
        <Form.Label column sm="2">
          Tender Id
        </Form.Label>
        <Col sm="10">
          <Form.Control
        //   defaultValue={usern}
          onChange={(e)=>{
            setData({...data,tenderId:e.target.value})
          }} size="lg" required    />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="password">
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
              setData({...data,password:e.target.value})
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
            </Cont>
            </Wrapper>           
          </div>
          <div className="row__two"></div>
        </div>
      </Section>
    </Div>
  ) : (
    <>
    <Div>
      <SideBar menu={menus} />
      <Section>
        <NavBar />
        <div className="grid">
          <div className="row__one">
            <ProgressBar/> 
          </div>
          <div className="row__two"></div>
        </div>
      </Section>
    </Div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tenders: state.tenders.tenders,
    suppliers:state.suppliers.suppliers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTenders: () => dispatch(fetchTender()),
    fetchSuppliers:()=>dispatch(fetchSuppliers())
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
const Wrapper = styled.div`
  display: flex;
  padding: 2rem 0;
  gap: 3rem;
  border-radius: 2rem;
  justify-content: space-evenly;
`;
export default connect(mapStateToProps, mapDispatchToProps)(App);
