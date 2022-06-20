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
    { name: "Cape Verde", code: "CV" },
    { name: "Cayman Islands", code: "KY" },
    { name: "Central African Republic", code: "CF" },
    { name: "Chad", code: "TD" },
    { name: "Chile", code: "CL" },
    { name: "China", code: "CN" },
    { name: "Christmas Island", code: "CX" },
    { name: "Cocos (Keeling) Islands", code: "CC" },
    { name: "Colombia", code: "CO" },
    { name: "Comoros", code: "KM" },
    { name: "Congo", code: "CG" },
    { name: "Congo, The Democratic Republic of the", code: "CD" },
    { name: "Cook Islands", code: "CK" },
    { name: "Costa Rica", code: "CR" },
    { name: 'Cote D"Ivoire', code: "CI" },
    { name: "Croatia", code: "HR" },
    { name: "Cuba", code: "CU" },
    { name: "Cyprus", code: "CY" },
    { name: "Czech Republic", code: "CZ" },
    { name: "Denmark", code: "DK" },
    { name: "Djibouti", code: "DJ" },
    { name: "Dominica", code: "DM" },
    { name: "Dominican Republic", code: "DO" },
    { name: "Ecuador", code: "EC" },
    { name: "Egypt", code: "EG" },
    { name: "El Salvador", code: "SV" },
    { name: "Equatorial Guinea", code: "GQ" },
    { name: "Eritrea", code: "ER" },
    { name: "Estonia", code: "EE" },
    { name: "Ethiopia", code: "ET" },
    { name: "Falkland Islands (Malvinas)", code: "FK" },
    { name: "Faroe Islands", code: "FO" },
    { name: "Fiji", code: "FJ" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "French Guiana", code: "GF" },
    { name: "French Polynesia", code: "PF" },
    { name: "French Southern Territories", code: "TF" },
    { name: "Gabon", code: "GA" },
    { name: "Gambia", code: "GM" },
    { name: "Georgia", code: "GE" },
    { name: "Germany", code: "DE" },
    { name: "Ghana", code: "GH" },
    { name: "Gibraltar", code: "GI" },
    { name: "Greece", code: "GR" },
    { name: "Greenland", code: "GL" },
    { name: "Grenada", code: "GD" },
    { name: "Guadeloupe", code: "GP" },
    { name: "Guam", code: "GU" },
    { name: "Guatemala", code: "GT" },
    { name: "Guernsey", code: "GG" },
    { name: "Guinea", code: "GN" },
    { name: "Guinea-Bissau", code: "GW" },
    { name: "Guyana", code: "GY" },
    { name: "Haiti", code: "HT" },
    { name: "Heard Island and Mcdonald Islands", code: "HM" },
    { name: "Holy See (Vatican City State)", code: "VA" },
    { name: "Honduras", code: "HN" },
    { name: "Hong Kong", code: "HK" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Iran, Islamic Republic Of", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Ireland", code: "IE" },
    { name: "Isle of Man", code: "IM" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Jamaica", code: "JM" },
    { name: "Japan", code: "JP" },
    { name: "Jersey", code: "JE" },
    { name: "Jordan", code: "JO" },
    { name: "Kazakhstan", code: "KZ" },
    { name: "Kenya", code: "KE" },
    { name: "Kiribati", code: "KI" },
    { name: 'Korea, Democratic People"S Republic of', code: "KP" },
    { name: "Korea, Republic of", code: "KR" },
    { name: "Kuwait", code: "KW" },
    { name: "Kyrgyzstan", code: "KG" },
    { name: 'Lao People"S Democratic Republic', code: "LA" },
    { name: "Latvia", code: "LV" },
    { name: "Lebanon", code: "LB" },
    { name: "Lesotho", code: "LS" },
    { name: "Liberia", code: "LR" },
    { name: "Libyan Arab Jamahiriya", code: "LY" },
    { name: "Liechtenstein", code: "LI" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Macao", code: "MO" },
    { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
    { name: "Madagascar", code: "MG" },
    { name: "Malawi", code: "MW" },
    { name: "Malaysia", code: "MY" },
    { name: "Maldives", code: "MV" },
    { name: "Mali", code: "ML" },
    { name: "Malta", code: "MT" },
    { name: "Marshall Islands", code: "MH" },
    { name: "Martinique", code: "MQ" },
    { name: "Mauritania", code: "MR" },
    { name: "Mauritius", code: "MU" },
    { name: "Mayotte", code: "YT" },
    { name: "Mexico", code: "MX" },
    { name: "Micronesia, Federated States of", code: "FM" },
    { name: "Moldova, Republic of", code: "MD" },
    { name: "Monaco", code: "MC" },
    { name: "Mongolia", code: "MN" },
    { name: "Montserrat", code: "MS" },
    { name: "Morocco", code: "MA" },
    { name: "Mozambique", code: "MZ" },
    { name: "Myanmar", code: "MM" },
    { name: "Namibia", code: "NA" },
    { name: "Nauru", code: "NR" },
    { name: "Nepal", code: "NP" },
    { name: "Netherlands", code: "NL" },
    { name: "Netherlands Antilles", code: "AN" },
    { name: "New Caledonia", code: "NC" },
    { name: "New Zealand", code: "NZ" },
    { name: "Nicaragua", code: "NI" },
    { name: "Niger", code: "NE" },
    { name: "Nigeria", code: "NG" },
    { name: "Niue", code: "NU" },
    { name: "Norfolk Island", code: "NF" },
    { name: "Northern Mariana Islands", code: "MP" },
    { name: "Norway", code: "NO" },
    { name: "Oman", code: "OM" },
    { name: "Pakistan", code: "PK" },
    { name: "Palau", code: "PW" },
    { name: "Palestinian Territory, Occupied", code: "PS" },
    { name: "Panama", code: "PA" },
    { name: "Papua New Guinea", code: "PG" },
    { name: "Paraguay", code: "PY" },
    { name: "Peru", code: "PE" },
    { name: "Philippines", code: "PH" },
    { name: "Pitcairn", code: "PN" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Puerto Rico", code: "PR" },
    { name: "Qatar", code: "QA" },
    { name: "Reunion", code: "RE" },
    { name: "Romania", code: "RO" },
    { name: "Russian Federation", code: "RU" },
    { name: "RWANDA", code: "RW" },
    { name: "Saint Helena", code: "SH" },
    { name: "Saint Kitts and Nevis", code: "KN" },
    { name: "Saint Lucia", code: "LC" },
    { name: "Saint Pierre and Miquelon", code: "PM" },
    { name: "Saint Vincent and the Grenadines", code: "VC" },
    { name: "Samoa", code: "WS" },
    { name: "San Marino", code: "SM" },
    { name: "Sao Tome and Principe", code: "ST" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Senegal", code: "SN" },
    { name: "Serbia and Montenegro", code: "CS" },
    { name: "Seychelles", code: "SC" },
    { name: "Sierra Leone", code: "SL" },
    { name: "Singapore", code: "SG" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Solomon Islands", code: "SB" },
    { name: "Somalia", code: "SO" },
    { name: "South Africa", code: "ZA" },
    { name: "South Georgia and the South Sandwich Islands", code: "GS" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Sudan", code: "SD" },
    { name: "Suriname", code: "SR" },
    { name: "Svalbard and Jan Mayen", code: "SJ" },
    { name: "Swaziland", code: "SZ" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Syrian Arab Republic", code: "SY" },
    { name: "Taiwan, Province of China", code: "TW" },
    { name: "Tajikistan", code: "TJ" },
    { name: "Tanzania, United Republic of", code: "TZ" },
    { name: "Thailand", code: "TH" },
    { name: "Timor-Leste", code: "TL" },
    { name: "Togo", code: "TG" },
    { name: "Tokelau", code: "TK" },
    { name: "Tonga", code: "TO" },
    { name: "Trinidad and Tobago", code: "TT" },
    { name: "Tunisia", code: "TN" },
    { name: "Turkey", code: "TR" },
    { name: "Turkmenistan", code: "TM" },
    { name: "Turks and Caicos Islands", code: "TC" },
    { name: "Tuvalu", code: "TV" },
    { name: "Uganda", code: "UG" },
    { name: "Ukraine", code: "UA" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States", code: "US" },
    { name: "United States Minor Outlying Islands", code: "UM" },
    { name: "Uruguay", code: "UY" },
    { name: "Uzbekistan", code: "UZ" },
    { name: "Vanuatu", code: "VU" },
    { name: "Venezuela", code: "VE" },
    { name: "Viet Nam", code: "VN" },
    { name: "Virgin Islands, British", code: "VG" },
    { name: "Virgin Islands, U.S.", code: "VI" },
    { name: "Wallis and Futuna", code: "WF" },
    { name: "Western Sahara", code: "EH" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" },
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