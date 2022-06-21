
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import {connect} from 'react-redux'
import { fetchSuppliers } from "../../../actions/supplierAction";
import { useRef } from "react";

const Table = ({suppliers,fetchSuppliers}) => {
  const [edit,setEdit]=useState(false)
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [suppli,setSuppli]=useState({})
  const dt = useRef(null);
  const exporting = () => {
    dt.current.exportCSV();
  }
  const header = <div style={{textAlign:'left'}}><Button type="button" icon="pi pi-external-link" iconPos="left" label="Export CSV" onClick={exporting}></Button></div>;

  const actionBodyTemplate = (rowData) => {

    return (
      <>
        <Button
          label="active"
          className="p-button-rounded mr-2 bg-green-500 w-9"
          onClick={() => {
          }
          }
          />
      </>
    );
  };
  return (
    <>
    <DataTable
      breakpoint="960px"
      editMode="cell"
      header={<center>{header} Supplier List</center>}
      value={suppliers}
      responsiveLayout="scroll"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      rowsPerPageOptions={[5, 10, 15, 25, 50]}
      dataKey={suppliers._id}
      paginator
      rowHover
      selection={selectedCustomers}
      onSelectionChange={(e) => setSelectedCustomers(e.value)}
      emptyMessage={<h4> Suppliers Not Found</h4>}
      className="datatable-responsive text-2xl"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Suppliers"
      rows={10}
      ref={dt}
    >
      <Column field="organizationName" filter sortable header="Organization Name" ></Column>
      <Column field="personalInfo.firstName" filter sortable header="Supplier Name" ></Column>
      <Column field="personalInfo.lastName" filter sortable header="Last Name" ></Column>
      <Column field="personalInfo.phoneNumber" sortable header="Phone Number"></Column>
      <Column field="personalInfo.email" sortable header="Email"></Column>
      <Column field="tinNumber" sortable header="Tin"></Column>
      <Column
        body={actionBodyTemplate}
        exportable={false}
        style={{ minWidth: "8rem" }}
      ></Column>
    </DataTable>
      </>
  );
};
const mapStateToProps = (state) => {
  return {
    suppliers:state.suppliers.suppliers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSuppliers:()=>dispatch(fetchSuppliers()),    
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Table);
