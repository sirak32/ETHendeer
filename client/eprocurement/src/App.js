import styled from "styled-components";
import SideBar from "./components/supplier/Dashboard/SideBar.jsx";
import NavBar from "./components/supplier/Dashboard/NavBar";
import Tenderlist from "./components/supplier/Dashboard/TenderList.jsx";
// import Login from "./components/supplier/Dashboard/Login";
import AdminDashboard from "./pages/AdminDashBoard";
import OfficerDashboard from "./pages/OfficerDashboard";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SupplierDashboard from "./pages/SupplierDashboard";
import OfficersList from "./pages/OfficersList.jsx";
import AddOfficer from "./pages/AddOfficer.jsx";
import TenderDetail from "./pages/TenderDetail";
import Login from "./pages/Login";
import Apply from "./pages/ApplyingTender";
import Home from './landing/App'
import { AccordionDemo } from "./pages/Manual.jsx";
import SupplierTenders from './pages/SupplierTenders'
import OfficerProfile from './pages/OfficerProfile'
// import InputAdornments from "./components/supplier/Dashboard/AddTenderForm.jsx";
import SupplierProfile from './pages/SupplierProfile'
import AdminOfficers from './pages/AdminOfficers'
import AdminSuppliers from './pages/AdminSuppliers'
import OfficerSuppliers from './pages/OfficerSuppliers'
import SupplierSupport from './pages/SupplierSupport'
import AdminProfile from './pages/AdminProfile'

const App = () => {
  return (
    // <AdminDashboard />
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Login />}></Route> */}
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/officer-manual" element={<AccordionDemo />}></Route>

        <Route exact path="/apply" element={<Apply />}></Route>
        <Route exact path="/register" element={<Login />}></Route>

        {/* <Route exact path="/supplier-profile" element={<TenderDetail />}></Route> */}
        
        <Route exact path="/supplier-profile" element={<SupplierProfile />}></Route>
        <Route exact path="/admin-profile" element={<AdminProfile />}></Route>
        <Route exact path="/supplier-tenders" element={<SupplierTenders />}></Route>
        <Route exact path="/supplier-support" element={<SupplierSupport />}></Route>
        <Route exact path="/officer-profile" element={<OfficerProfile />}></Route>
        <Route exact path="/officer-supplier" element={<OfficerSuppliers />}></Route>

        <Route exact path="/admin-officer" element={<AdminOfficers />}></Route>
        <Route exact path="/admin-supplier" element={<AdminSuppliers />}></Route>

        <Route exact path="/add-officer" element={<AddOfficer />}></Route>
        <Route exact path="/officers-list" element={<OfficersList />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/officer" element={<OfficerDashboard />}></Route>
        <Route exact path="/admin" element={<AdminDashboard />}></Route>
        <Route exact path="/supplier" element={<SupplierDashboard />}></Route>
      </Routes>
    </Router>
  );
};
export default App;
