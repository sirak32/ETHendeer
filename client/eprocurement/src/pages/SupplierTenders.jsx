import styled from "styled-components";
import { ScrollTop } from 'primereact/scrolltop';
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Side from '../components/supplier/Dashboard/SupSide'
import { connect } from "react-redux";
import TenderTable from '../components/supplier/Dashboard/TendersForSup'
import { fetchApplied } from "../actions/appliedAction.js";

const App = ({applieds,fetchApplieds}) => {

  const navigate=useNavigate()

  useEffect(()=>{
    const role=localStorage.getItem('role')
    if(role!=='supplier')
    navigate('/')
    fetchApplieds()
  },[])
  const menus=['Dashboard','Tenders','Profile','Help & Support']

  return (
    <Div>
      <Side active={1} menu={menus} />
      <Section>
        <div className="grid">
          <div className="row__one">
            <TenderTable/>
            <ScrollTop/>
          </div>
          <div className="row__two"></div>
        </div>
      </Section>
    </Div>
  );
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


const mapStateToProps = (state) => {
    return {
      applieds: state.applied.applied,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      fetchApplieds: () => dispatch(fetchApplied()),
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(App);
