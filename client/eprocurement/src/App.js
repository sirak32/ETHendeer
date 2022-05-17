import styled from "styled-components";
import SideBar from "./components/supplier/Dashboard/SideBar.jsx";
import NavBar from "./components/supplier/Dashboard/NavBar";
import Tenderlist from "./components/supplier/Dashboard/TenderList.jsx";
import Login from "./components/supplier/Dashboard/Login";
import AdminDashboard from './pages/AdminDashBoard';
import OfficerDashboard from "./pages/OfficerDashboard";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SupplierDashboard from "./pages/SupplierDashboard";

const App = () => {
  return (
    // <AdminDashboard />
    <Router>

    <Routes>
                 <Route exact path='/' element={<AdminDashboard/>}></Route>
                 <Route exact path='/login' element={<Login/>}></Route>
                 <Route exact path='/officer' element={<OfficerDashboard/>}></Route>
                 <Route exact path='/admin' element={<AdminDashboard/>}></Route>
                 <Route exact path='/supplier' element={<SupplierDashboard/>}></Route>
    </Routes>
    </Router>
  );
};
export default App;
