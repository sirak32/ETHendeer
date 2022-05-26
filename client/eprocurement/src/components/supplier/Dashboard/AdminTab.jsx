import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddTenderForm from './AddTenderForm'
import HorizontalLinearStepper from './Stepper';
import Table from './Table'
import AddOfficer from './AddOfficer'
import RegisterSupplier from './RegisterSupplier'
import OfficersList from './OfficersList';
import { FormikFormDemo } from "./RegisterOfficer";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const [vis,setVis]=React.useState(true)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ width: '100%',backgroundColor:'white' ,background: "white",borderRadius:'0.7rem' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs  value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="OFFICERS LIST" {...a11yProps(0)} />
          <Tab label="SUPPLIER LIST" {...a11yProps(1)} />
          <Tab label="REGISTER SUPPLIER" {...a11yProps(2)} />
          <Tab label="ADD OFFICER" {...a11yProps(3)} />
          <Tab label="PENDING REGISTRATION" {...a11yProps(4)} />
          <Tab label="FEEDBACK LIST" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OfficersList/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OfficersList/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <RegisterSupplier/> */}
        <Dialog visible={vis} className='p-fluid' style={{ width: '80rem' }}  header="REGISTER SUPPLIER" onHide={(()=>{setVis(false)})}>

        <FormikFormDemo/>
        </Dialog>
        <Button onClick={(()=>{setVis(true)})}>ADD SUPPLIER</Button>
        <HorizontalLinearStepper/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        {/* <AddOfficer/> */}
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={5}>
        <OfficersList/>
      </TabPanel>
    </Box>
  );
}
