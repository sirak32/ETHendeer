import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SupplierTable from "./SupplierTable";
import OfficersTable from "./OfficersTable";
import PendingTable from "./PendingTable";
import RegisterOfficer from '../RegisterOfficer'

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const [vis, setVis] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
    className="text-3xl"
      sx={{
        width: "100%",
        backgroundColor: "white",
        background: "white",
        borderRadius: "0.7rem",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          className="text-3xl"
        >
          <Tab className="text-2xl" label="OFFICERS LIST" {...a11yProps(0)} />
          <Tab className="text-2xl" label="SUPPLIER LIST" {...a11yProps(1)} />
          <Tab className="text-2xl" label="PENDING SUPPLIER REGISTRATION" {...a11yProps(2)} />
          <Tab className="text-2xl" label="ADD OFFICER" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OfficersTable data={props.data.officers} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SupplierTable data={props.data.suppliers} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PendingTable data={props.data.pendings} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <RegisterOfficer />
      </TabPanel>
    </Box>
  );
}
