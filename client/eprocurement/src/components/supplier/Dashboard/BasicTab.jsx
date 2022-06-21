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


export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
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
</TabView>
  );
}
