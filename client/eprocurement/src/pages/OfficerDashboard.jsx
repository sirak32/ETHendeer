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
const App = ({ tenders, fetchTenders,fetchSuppliers,suppliers }) => {
  const navigate=useNavigate()
  const [logged,setLogged]=useState(false)
 
  const tender = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  // const [tendeN,setTenderN]=useState(null)
  const menus = ["Dashboard", "Tender", "Suppliers", "Logout"];
  useEffect(() => {
    // dispatch({type:'SET_LOADING'})
    // dispatch({type:'SET_TENDER',
    //   payload:'data'})
        const tokens=localStorage.getItem('token')
        if(tokens==null)
        navigate('/')
        fetchTenders();
        fetchSuppliers()
        // console.log('this is my kingdom',tenders)
  }, []);
  const OptmTender = [];
  let i;
  for (i = 0; i < tenders.length; i++) {
    OptmTender[i] = { 
      title: tenders[i].title, 
      tenderNo: tenders[i].number,
      bidOpenOn:tenders[i].bidOpenOn,
      closingDate:tenders[i].closingDate };
  }
  // const [{}]=tenders.map((tender)=>)
  console.log("tender from redux", tenders,'supplier from redux',suppliers);
  const t = tenders.map((tender) => <h1>{tender.title}</h1>);
  return !tender ? (
    <Div>
      <SideBar menu={menus} />
      <Section>
        <NavBar />
        <div className="grid">
          <div className="row__one">
            <Wrapper>
              {/* <h1>{tender}</h1> */}
              <Dash title="Suppliers" number={suppliers.length} />
              <Dash title="Tenders" number={tenders.length} />
              <Dash title="Active" number={tenders.length} />
              <Dash title="Closed" number="45" />
            </Wrapper>
            {/* <Table /> */}
            <BasicTabs data={{OptmTender,suppliers}} />
            {/* <h1>{tenders[10].description}</h1> */}
            {/* <h1>Hey {tender}</h1> */}
            {/* <Modal/> */}
            {/* <MediaCard/>             */}
          </div>
          <div className="row__two"></div>
        </div>
      </Section>
    </Div>
  ) : (
    // <div>hi</div>
    //  <> <SideBar/>
    //   <NavBar/>
    //   <Table/>
    // </>
    <>
    <Div>
      <SideBar menu={menus} />
      <Section>
        <NavBar />
        <div className="grid">
          <div className="row__one">
            
            {/* <Table /> */}
    <ProgressBar/> 
            {/* {t} */}
            {/* <Modal/> */}
            {/* <MediaCard/>             */}
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
