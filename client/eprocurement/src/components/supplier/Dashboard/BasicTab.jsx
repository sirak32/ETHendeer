import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddTenderForm from './AddTenderForm'
import HorizontalLinearStepper from './Stepper';
import Table from './Table'
import SupplierTable from './SupplierTable'
import {FormikFormDemo} from './RegisterOfficer'
import { TabView, TabPanel } from 'primereact/tabview';
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  console.log('props value',props.data.suppliers)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (

    // <Box sx={{ width: '100%',backgroundColor:'white' ,background: "white",borderRadius:'0.7rem' }}>
    //   <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //     <Tabs  value={value} onChange={handleChange} aria-label="basic tabs example" centered>
    //       <Tab label="ALL TENDERS" {...a11yProps(1)} />
    //       <Tab label="ADD TENDERS" {...a11yProps(0)} />
    //       <Tab label="SUPPLIERS LIST" {...a11yProps(2)} />
    //     </Tabs>
    //   </Box>
    //   <TabPanel value={value} index={1}>
    //     <AddTenderForm/>
    //     <HorizontalLinearStepper/>
    //   </TabPanel>
    //   <TabPanel value={value} index={0}>
    //     <Table data={props.data.OptmTender}/>
    //   </TabPanel>
    //   <TabPanel value={value} index={2}>
    //   </TabPanel>
    //   <TabPanel value={value} index={2}>
    //     <SupplierTable data={props.data.suppliers}/>
    //     <FormikFormDemo/>
    //   </TabPanel>
    // </Box>

    <TabView   activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
    <TabPanel  header="ALL TENDERS">
        Content I
        <Table data={props.data.OptmTender}/>
    </TabPanel>
    <TabPanel header="ADD TENDERS">
        Content II
        <AddTenderForm/>
    </TabPanel>
    <TabPanel header="SUPPLIERS LIST">
        Content III
        <SupplierTable data={props.data.suppliers}/>
    </TabPanel>
</TabView>
  );
}
