import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import "./FormDemo.css";
import { Grid } from "@mui/material";
import { FileUploadDemo } from "./FileUploadDemo";
import axios from "axios";
import { connect } from "react-redux";
import { fetchPending } from "../../../actions/pendingAction";
import { IoAddCircleOutline } from "react-icons/io5";

 const FormikFormDemo = ({pendings, fetchPendings}) => {
  const count = [
    { name: "Addis Ababa,", code: "AF" },
    { name: "Gonder", code: "AX" },
    { name: "Dessie", code: "AL" },
    { name: "Harar  ", code: "DZ" },
    { name: "Addis Alem ", code: "AS" },
    { name: "Addis Zemen", code: "AD" },
    { name: "Adigrat", code: "AO" },
    { name: "Adwa", code: "AI" },
    { name: "Agaro", code: "AQ" },
    { name: "Akaki", code: "AG" },
    { name: "Alaba ", code: "AR" },
    { name: "Adama", code: "AM" },
    { name: "Aruba", code: "AW" },
    { name: "Alitena", code: "AU" },
    { name: "Amba Mariam", code: "AT" },
    { name: "Ambo", code: "AZ" },
    { name: "Ankober", code: "BS" },
    { name: "Arba Minch", code: "BH" },
    { name: "Arboye", code: "BD" },
    { name: "Asaita", code: "BB" },
    { name: "Asella", code: "BY" },
    { name: "Asosa", code: "BE" },
    { name: "Awasa", code: "BZ" },
    { name: "Awash", code: "BJ" },
    { name: "Axum", code: "BM" },
    { name: "Alamata", code: "BT" },
    { name: "Babille", code: "BO" },
    { name: "Baco", code: "BA" },
    { name: "Badme", code: "BW" },
    { name: "Bahir Dar", code: "BV" },
    { name: "Bati", code: "BR" },
    { name: "Bedele", code: "IO" },
    { name: "Beica", code: "BN" },
    { name: "Bichena", code: "BG" },
    { name: "Bonga", code: "BF" },
    { name: "Bishoftu", code: "BI" },
    { name: "Ciro", code: "KH" },
    { name: "Chencha", code: "CM" },
    { name: "Dabat", code: "CA" },
  ];
  const [countries, setCountries] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
const [selectedFile,setSelectedFile]=useState()
  useEffect(() => {
    setCountries(count);
  }, []);

  const formik = useFormik({
    initialValues: {
      organizationName:"",
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      city: "",
      subcity: "",
      wereda: "",
      kebele: "",
      businessType: "",
      tinNumber: "",
      username: "",
      name: "",
      email: "",
      password: "",
      ownershipType:"",
      accept: false,
    },
    validate: (data) => {
      let errors = {};
      
      if (!data.organizationName) {
        errors.organizationName = "Org Name is required.";
      }
      if (!data.middleName) {
        errors.middleName = "Middle Name is required.";
      }
      if (!data.lastName) {
        errors.lastName = "Last Name is required.";
      }

      if (!data.firstName) {
        errors.firstName = "First Name is required.";
      } 

      if (!data.subcity) {
        errors.subcity = "Subcity  is required.";
      }
      if (!data.wereda) {
        errors.wereda = "Wereda  is required.";
      }
      if (!data.kebele) {
        errors.kebele = "Kebele  is required.";
      }
      if (!data.businessType) {
        errors.businessType = "Business Type is required.";
      }

      if (!data.tinNumber) {
        errors.tinNumber = "Tin Number is required.";
      } else if (
        !/^(9\d{2})([ \-]?)([7]\d|8[0-8])([ \-]?)(\d{4})$/i.test(data.tinNumber)
      ) {
        errors.tinNumber =
          "Invalid Tin Number.  range is 900-70-0000 through 999-88-9999";
      }

      if (!data.phone) {
        errors.phone = "Phone is required.";
      } else if (!/^\+[1-9]\d{10,14}$/i.test(data.phone)) {
        errors.phone = "Invalid Phone number. E.g.+251919298457";
      }
      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      if (!data.password) {
        errors.password = "Password is required.";
      }
      
      if (!data.ownershipType) {
        errors.ownershipType = "Ownership Type is required.";
      }
      if (!data.username) {
        errors.username = "Password is required.";
      }

      if (!data.accept) {
        errors.accept = "You need to agree to the terms and conditions.";
      }

      return errors;
    },
    onSubmit: async(data) => {
      const dat = new FormData();
      dat.append("doc", selectedFile);
      console.log(data)
       axios.post(
        "http://localhost:5001/upload",
        dat
      ).then((res)=>{
        console.log('upload success')
        const file=res.data
        axios.post('http://localhost:5001/pending-supplier',{...data,Attacheddocument:file})
        .then((e)=>{
  
          setFormData(data);
          setShowMessage(true);
          fetchPendings()
          formik.resetForm();
        })
      })

    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        // autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Registration Request Successful Sent!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your account is in Pendinging registered state, We'll Let u Know when We Finish Document Review Process
           
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Register Supplier</h5>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <Grid
              sx={{ background: "white", padding: "0 12rem" }}
              container
              spacing={2}
            >
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="organizationName"
                      name="organizationName"
                      value={formik.values.organizationName}
                      onChange={formik.handleChange}
                      autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("organizationName"),
                      })}
                    />
                    <label
                      htmlFor="organizationName"
                      className={classNames({
                        "p-error": isFormFieldValid("organizationName"),
                      })}
                    >
                      Name of Organization *
                    </label>
                  </span>
                  {getFormErrorMessage("organizationName")}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      maxLength={20}
                      id="firstName"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      // autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("firstName"),
                      })}
                    />
                    <label
                      htmlFor="firstName"
                      className={classNames({
                        "p-error": isFormFieldValid("firstName"),
                      })}
                    >
                      First Name*
                    </label>
                  </span>
                  {getFormErrorMessage("firstName")}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      maxLength={20}
                      id="middleName"
                      name="middleName"
                      value={formik.values.middleName}
                      onChange={formik.handleChange}
                      // autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("middleName"),
                      })}
                    />
                    <label
                      htmlFor="middleName"
                      className={classNames({
                        "p-error": isFormFieldValid("middleName"),
                      })}
                    >
                      Middle Name*
                    </label>
                  </span>
                  {getFormErrorMessage("middleName")}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="lastName"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      // autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("lastName"),
                      })}
                    />
                    <label
                      htmlFor="lastName"
                      className={classNames({
                        "p-error": isFormFieldValid("lastName"),
                      })}
                    >
                      Last Name*
                    </label>
                  </span>
                  {getFormErrorMessage("lastName")}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      // autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("phone"),
                      })}
                    />
                    <label
                      htmlFor="phone"
                      className={classNames({
                        "p-error": isFormFieldValid("phone"),
                      })}
                    >
                      Phone*
                    </label>
                  </span>
                  {getFormErrorMessage("phone")}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <Dropdown
                      id="city"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      options={count}
                      optionLabel="name"
                    />
                    <label htmlFor="city">City</label>
                  </span>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="subcity"
                      name="subcity"
                      value={formik.values.subcity}
                      onChange={formik.handleChange}
                      // autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("subcity"),
                      })}
                    />
                    <label
                      htmlFor="subcity"
                      className={classNames({
                        "p-error": isFormFieldValid("subcity"),
                      })}
                    >
                      Sub City*
                    </label>
                  </span>
                  {getFormErrorMessage("subcity")}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="wereda"
                      name="wereda"
                      value={formik.values.wereda}
                      onChange={formik.handleChange}
                      // autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("wereda"),
                      })}
                    />
                    <label
                      htmlFor="wereda"
                      className={classNames({
                        "p-error": isFormFieldValid("wereda"),
                      })}
                    >
                      Wereda*
                    </label>
                  </span>
                  {getFormErrorMessage("wereda")}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="kebele"
                      name="kebele"
                      value={formik.values.kebele}
                      onChange={formik.handleChange}
                      // autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("kebele"),
                      })}
                    />
                    <label
                      htmlFor="wereda"
                      className={classNames({
                        "p-error": isFormFieldValid("kebele"),
                      })}
                    >
                      Kebele*
                    </label>
                  </span>
                  {getFormErrorMessage("kebele")}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="businessType"
                      name="businessType"
                      value={formik.values.businessType}
                      onChange={formik.handleChange}
                      // autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("businessType"),
                      })}
                    />
                    <label
                      htmlFor="businessType"
                      className={classNames({
                        "p-error": isFormFieldValid("businessType"),
                      })}
                    >
                      Business Type*
                    </label>
                  </span>
                  {getFormErrorMessage("businessType")}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="ownershipType"
                      name="ownershipType"
                      value={formik.values.ownershipType}
                      onChange={formik.handleChange}
                      // autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("ownershipType"),
                      })}
                    />
                    <label
                      htmlFor="ownershipType"
                      className={classNames({
                        "p-error": isFormFieldValid("ownershipType"),
                      })}
                    >
                      Ownership Type*
                    </label>
                  </span>
                  {getFormErrorMessage("ownershipType")}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="tinNumber"
                      name="tinNumber"
                      value={formik.values.tinNumber}
                      onChange={formik.handleChange}
                      // autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("tinNumber"),
                      })}
                    />
                    <label
                      htmlFor="tinNumber"
                      className={classNames({
                        "p-error": isFormFieldValid("tinNumber"),
                      })}
                    >
                      Tin Number*
                    </label>
                  </span>
                  {getFormErrorMessage("tinNumber")}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="username"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      // autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("username"),
                      })}
                    />
                    <label
                      htmlFor="username"
                      className={classNames({
                        "p-error": isFormFieldValid("username"),
                      })}
                    >
                      Username*
                    </label>
                  </span>
                  {/* {getFormErrorMessage("tinNumber")} */}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <InputText
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className={classNames({
                        "p-invalid": isFormFieldValid("email"),
                      })}
                    />
                    <label
                      htmlFor="email"
                      className={classNames({
                        "p-error": isFormFieldValid("email"),
                      })}
                    >
                      Email*
                    </label>
                  </span>
                  {getFormErrorMessage("email")}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <Password
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      toggleMask
                      className={classNames({
                        "p-invalid": isFormFieldValid("password"),
                      })}
                      header={passwordHeader}
                      footer={passwordFooter}
                    />
                    <label
                      htmlFor="password"
                      className={classNames({
                        "p-error": isFormFieldValid("password"),
                      })}
                    >
                      Password *
                    </label>
                  </span>
                  {getFormErrorMessage("password")}
                </div>
              </Grid>
                        <Grid item xs={6}>
                           {/* <input type='file'/> */}
                           <Grid item xs={6}>
              <div className="App ">
                <Button variant="contained" component="label" color="primary">
                  <IoAddCircleOutline /> Upload Your Legal Documents
                  <input
                    onInput={(e) => setSelectedFile(e.target.files[0])}
                    accept=".pdf"
                    type="file"
                    name="doc"
                    required
                    hidden
                  />
                </Button>
              </div>
            </Grid>
                        </Grid>

              <Grid item xs={6}>
                <div className="field-checkbox">
                  <Checkbox
                    inputId="accept"
                    name="accept"
                    checked={formik.values.accept}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("accept"),
                    })}
                  />
                  <label
                    htmlFor="accept"
                    className={classNames({
                      "p-error": isFormFieldValid("accept"),
                    })}
                  >
                    I agree to the terms and conditions *
                  </label>
                </div>
              </Grid>
              <Grid item xs={12}>
                {/* <FileUploadDemo /> */}
              </Grid>
              {/* <Grid item xs={6}>

              </Grid> */}

              <Grid item xs={6}>
                <Button type="submit" label="Done" className="mt-2" />
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="reset"
                  label="Clear"
                  className="mt-2 p-button-danger"
                  onClick={() => {
                    console.log("Logger");
                    formik.resetForm();
                  }}
                />
              </Grid>
             
              {/* <FileUploadDemo/> */}
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    pendings:state.pendings.pendings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPendings:()=>dispatch(fetchPending()),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(FormikFormDemo)