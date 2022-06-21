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
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { FileUploadDemo } from "./FileUploadDemo";
import { InputTextarea } from "primereact/inputtextarea";
import FormControl from "@mui/material/FormControl";
import axios from "axios";


export const FormikFormDemo = (props) => {
  const [countries, setCountries] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
  }, []); 
console.log('Selected',props.data)
const tender=props.data
const selected=props.selected
  const formik = useFormik({
    initialValues:tender,
    onSubmit: async(data) => {
      console.log("here checking",data.title)
      await axios.patch(`http://localhost:5001/tenders/${tender._id}`,data)
      .then(()=>{
        console.log('updated succefullly')
      })
      formik.resetForm();
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
        autoFocus
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
          <h5> Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
          Successful!
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center bg-345">Edit Supplier Info</h5>
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
                      id="title"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("title"),
                      })}
                    />
                    <label
                      htmlFor="title"
                      className={classNames({
                        "p-error": isFormFieldValid("title"),
                      })}
                    >
                      Tender Title *
                    </label>
                  </span>
                  {getFormErrorMessage("title")}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      maxLength={20}
                      id="number"
                      name="number"
                      value={formik.values.number}
                      onChange={formik.handleChange}
                      autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("number"),
                      })}
                    />
                    <label
                      htmlFor="number"
                      className={classNames({
                        "p-error": isFormFieldValid("number"),
                      })}
                    >
                      Tender Number*
                    </label>
                  </span>
                  {getFormErrorMessage("number")}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputTextarea
                    cols={3}
                    rows={5}
                      id="description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("description"),
                      })}
                    />
                    <label
                      htmlFor="description"
                      className={classNames({
                        "p-error": isFormFieldValid("description"),
                      })}
                    >
                      Tender Description*
                    </label>
                  </span  >
                  {getFormErrorMessage("lastName")}
                </div>
              </Grid>
              <Grid item xs={6}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select

                  sx={{ width: "20rem" }}
                  id="type"
                  label="Type"
                  className="mt-5 h-5rem"
                  onChange={formik.handleChange}
                  value={formik.values.type}
                  name="type"
                >
                  <MenuItem value="Direct">Goods</MenuItem>
                  <MenuItem value="Service">Service</MenuItem>
                  <MenuItem value="Construction Works">
                    Construction Works
                  </MenuItem>
                  <MenuItem value="Consultancy">Consultancy</MenuItem>
                </Select>
              </FormControl>
            </Grid>
              <Grid item xs={6}>
                <div className="field">
                  <span className="p-float-label">
                    <InputTextarea
                      id="termsAndConditions"
                      name="termsAndConditions"
                      value={formik.values.termsAndConditions}
                      onChange={formik.handleChange}
                      autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("termsAndConditions"),
                      })}
                    />
                    <label
                      htmlFor="termsAndConditions"
                      className={classNames({
                        "p-error": isFormFieldValid("termsAndConditions"),
                      })}
                    >
                      Terms and Conditions*
                    </label>
                  </span>
                  {getFormErrorMessage("termsAndConditions")}
                </div>
              </Grid>
              {/* <Grid item xs={6}>
              <span className="p-float-label">
                <Calendar
                  className="mt-5 h-5rem w-7"
                  name="bidOpenOn"
                  max="2020-02-02"
                  min="2020-01-02"
                  id="bidOpenOn"
                  minDate={new Date()}
                  value={formik.values.bidOpenOn}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  // mask="99/99/9999"
                  showIcon
                />
                <label htmlFor="bidOpenOn"> Opening Date</label>
              </span>
            </Grid> */}
             <Grid item xs={6}>
              <span className="p-float-label">
                <InputText
                  required
                  type='number'
                  min={1}
                  onChange={formik.handleChange}
                  name="bidFee"
                  className="mt-5 w-7 h-5rem"
                  id="bidFee"
                  color="success"
                  value={formik.values.bidFee}
                  label="Bid Fee"
                  sx={{ m: 1, width: "25ch" }}
                />{" "}
                <label htmlFor="bidFee" className="p-success">
                  Bid Fee*
                </label>
              </span>
            </Grid>
            <Grid item xs={6}>
              <span className="p-float-label">
                <Calendar
                  name="closingDate"
                  className="mt-5 h-5rem w-7"
                  // max="2020-02-02"
                  // min="2020-01-02"
                  minDate={new Date()}
                  id="closingDate"
                  value={formik.values.closingDate}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                  
                />
                <label htmlFor="closingDate"> Closing Date</label>
              </span>
            </Grid>
<Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <Button type="submit" label="Submit" className="mt-2" />
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
