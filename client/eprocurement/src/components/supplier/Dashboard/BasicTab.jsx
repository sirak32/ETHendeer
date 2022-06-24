import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddTenderForm from './AddTenderForm'
import HorizontalLinearStepper from './Stepper';
import Table from './Table'
import SuppliersTable from './SuppliersTable'
import {FormikFormDemo} from './RegisterOfficer'
import { TabView, TabPanel } from 'primereact/tabview';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const navigate=useNavigate()
  const [data,setData]=React.useState({
    email:'',
    tenderId:''
  })

  return (

    <TabView   activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
    <TabPanel  header="ALL TENDERS">
        <Table data={props.data.tenders}/>
    </TabPanel>
    <TabPanel header="ADD TENDERS">
        <AddTenderForm/>
    </TabPanel>
    <TabPanel header="SUPPLIERS LIST">
        <SuppliersTable data={props.data.suppliers}/>
    </TabPanel>
    <TabPanel header="NOTIFY WINNER">
        {/* <SuppliersTable data={props.data.suppliers}/> */}
        <Form id='f1' onSubmit={(e)=>{
              e.preventDefault()
              if(data.tenderId.trim().length===24){

                 axios.post(`http://localhost:5001/api/email`,{email:data.email,subject:"Notifying Tender Winner",message:`You Win A Tender You Applied In Referenced By ${data.tenderId}. Please Come In Person and Proceed!`})
                  .then(()=>{
                    alert('email sent to all suppliers')
                    document.getElementById("f1").reset();
                  }).catch((e)=>{
                    alert(e)
  
                  })
              }
              else{
                alert('Tender Reference Id Must be of length 24')
              }
            }
            
            }>
                   <Form.Group as={Row} className="mb-3 mt-8" controlId="tenderId">
        <Form.Label column sm="2">
         Tender Reference Id
        </Form.Label>
        <Col sm="3">
          <Form.Control
        //   defaultValue={usern}
            type='text'
            placeholder='Tender Reference Id'
          onChange={(e)=>{
            setData({...data,tenderId:e.target.value})
          }} size="lg" required 
           />
        </Col>
      </Form.Group>
                <Form.Group as={Row} className="mb-3 mt-8" controlId="email">
        <Form.Label column sm="2">
         Winner Email
        </Form.Label>
        <Col sm="3">
          <Form.Control
        //   defaultValue={usern}
        type='email'
            placeholder='Winner Email Address'
          onChange={(e)=>{
            setData({...data,email:e.target.value})
          }} size="lg" required    />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="">
        <Form.Label column sm="2">
          
        </Form.Label>
        <Col sm="10">
        <Button className="" type='submit' variant="success">Notify</Button>{' '}
        </Col>
      </Form.Group>

    </Form>

    </TabPanel>
</TabView>
  );
}
