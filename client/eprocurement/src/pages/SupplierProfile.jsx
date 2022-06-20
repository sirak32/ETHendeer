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
import Side from '../components/supplier/Dashboard/SupSide'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import Cont from '@mui/material/Container'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
const App = ({ tenders, fetchTenders,fetchSuppliers,suppliers }) => {
  const navigate=useNavigate()
  const [logged,setLogged]=useState(false)
 
  const tender = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const menus=['Dashboard','Tenders','Profile','Help & Support']
  let myInfo
  let uname
  useEffect(() => {

        const tokens=localStorage.getItem('token')
        const role=localStorage.getItem('role')
        if(role!=='supplier')
        navigate('/')
        fetchTenders();
        fetchSuppliers()
        myInfo=suppliers.filter((supplier)=>{

          return supplier._id=localStorage.getItem('whoId')
        }
       )
      //  uname=myInfo[1].accountInfo.username
      //  localStorage.setItem('un',uname) 
       console.log("myInfo",myInfo) 
      }, []);
const formik = useFormik({
  initialValues: {
      username: '',
      password: '',
      password2:''
  },
  validate: (data) => {
      let errors = {}; 

      if (!data.username) {
          errors.emausernameil = 'username is required.';
      }   

      if (!data.password) {
          errors.password = 'Password is required.';
      }
      if (!data.password2) {
        errors.password2 = 'Confirm Password ';
    }
      
      return errors;
  },
  onSubmit: (data) => {
      formik.resetForm();
  }
});
const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
};
  return suppliers ? (
    <Div>
      {/* <SideBar menu={menus} /> */}
      <Side active={2} menu={menus}/>
      <Section>
        <NavBar />
        <div className="grid">
          <div className="row__one">
            {/* <Wrapper>
              <Dash title="Suppliers" number={suppliers.length} />
              <Dash title="Tenders" number={tenders.length} />
              <Dash title="Active" number={tenders.length-closedNo} /> 
              <Dash title="Closed" number={closedNo} />
            </Wrapper>            */}
            {/* <BasicTabs data={{OptmTender,suppliers,tenders}} /> */}
            {/* <div className="flex align-items-center justify-content-center top-50 font-bold text-white border-round m-2" >
             
             <div>

             
              <div className="field w-7 m-6">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="username" name="username" value={formik.values.username} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('username') })} />
                                <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>Username</label>
                            </span>
                            {getFormErrorMessage('username')}
                        </div>
                        <div className="field m-6 min-w-full"> 
                            <span className="p-float-label min-w-full">
                                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })}   />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="field m-6">
                            <span className="p-float-label">
                                <Password id="password2" name="password2" value={formik.values.password2} onChange={formik.handleChange} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password2') })}   />
                                <label htmlFor="password2" className={classNames({ 'p-error': isFormFieldValid('password2') })}>Confirm Password</label>
                            </span>
                            {getFormErrorMessage('password2')}
                        </div></div>
            </div> */}
            <Cont maxWidth={'xs'}>
            <h1>Officer Profile Setting</h1>
            {/* <form> */}
            <Form onSubmit={(e)=>{
              e.preventDefault()
              alert('password has changed')
            }}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Username
        </Form.Label>
        <Col sm="10">
          <Form.Control size="lg" required    />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="oldPassword">
        <Form.Label column sm="2">
          Old Password
        </Form.Label>
        <Col sm="10">
          <Form.Control size="lg" required type="password" placeholder="old Password" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" required controlId="newPassword">
        <Form.Label column sm="2">
          New Password
        </Form.Label>
        <Col sm="10">
          <Form.Control size="lg"  type="password" placeholder="new Password" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" required controlId="confirmPassword">
        <Form.Label column sm="2">
          Confirm Password
        </Form.Label>
        <Col sm="10">
          <Form.Control size="lg" required type="password" placeholder="confirm Password" />
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

            {/* </form> */}
            </Cont>
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
