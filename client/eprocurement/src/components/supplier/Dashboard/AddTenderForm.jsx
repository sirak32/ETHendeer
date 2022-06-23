import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import BasicSelect from "./BasicSelect";
import {  Container, Stack, TextareaAutosize } from "@mui/material";
import { Grid } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import axios from "axios";
import { IoAddCircleOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import { fetchTender } from "../../../actions/tenderAction";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Fieldset } from 'primereact/fieldset';

const InputAdornments = ({ tenders, fetchTenders }) => {
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Tender Added Successfully', detail:'Tender Added Successfully Descriptions Here', life: 10000});
}
let creator;
  useEffect(() => {
    // fetchTenders()
     creator=localStorage.getItem('whoId')
  }, []);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      number: "",
      type: "",
      bidFee:null,
      creator: creator,
      closingDate: "null",
      bidOpenOn: "null",

    },
    onSubmit: async (data) => {
      // e.preventDefault();
      const dat = new FormData();
      const publishedDate=new Date().toUTCString()
      dat.append("doc", selectedFile);
      const bidOpenOn= new Date(data.bidOpenOn).toUTCString()
      const closingDate=new Date(data.closingDate).toUTCString()

      await axios.post(
        "http://localhost:5001/upload",
        dat
      ).then(async(res)=>{
        console.log('upload success')
        const file=res.data
        const c=localStorage.getItem('whoId')
          await axios.post("http://localhost:5001/tenders/", {...data,creator:c,bidOpenOn,closingDate,publishedDate,document:file})
          .then(async() => {
            showSuccess()
            await axios.get(`http://localhost:5001/get-emails`)
            .then((res)=>{
              const emails=res.data;
              emails.map(async(em)=>{
                await axios.post(`http://localhost:5001/api/email`,{email:em,subject:"New Tender Available",message:`${data.title}. Please Visit Your Dashboard!`})
                .then(()=>{
                  // alert('email sent to all suppliers')
                }).catch((e)=>{
                  alert(e)

                })
              })
            }).catch(e=>{
              alert(e)
            })
            formik.resetForm()
          });
        console.log(res.data)
      }).then(()=>fetchTenders());
      
      setFormValue(data);
      console.log("sent tenders", data);
    },
  });
  const [selectedFile, setSelectedFile] = React.useState(null);

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [formValues, setFormValue] = React.useState(formDatas);
  return (
 <Fieldset legend="Post New Tender" toggleable >
    <form onSubmit={formik.handleSubmit}>

      <Container>
        <Div className="card">
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <span className="p-float-label ">
                <InputText
                required
                  className="p-float-label p-input-icon-right mt-5 w-7 h-5rem"
                  onChange={formik.handleChange}
                  name="title"
                  id="title"
                  color="success"
                  label="Tender Title"
                  value={formik.values.title}
                  sx={{ m: 1, width: "25ch" }}
                />{" "}
                <label htmlFor="title" className="p-succes">
                  Title*
                </label>
              </span>
            </Grid>
            <Grid item xs={6}>
              <span className="p-float-label">
                <InputText
                required
                  onChange={formik.handleChange}
                  className="mt-5 w-7 h-5rem"
                  name="number"
                  id="number"
                  value={formik.values.number}
                  color="success"
                  label="Tender Number"
                  // sx={{ m: 1, width: "25ch" }}
                />
                <label htmlFor="number" className="p-success">
                  Tender Number*
                </label>
              </span>
            </Grid>
            <Grid item xs={6}>
              <span className="p-float-label">
                <InputText
                required
                  onChange={formik.handleChange}
                  name="description"
                  className="mt-5 w-7 h-5rem"
                  id="description"
                  color="success"
                  value={formik.values.description}
                  label="Tender Description"
                  sx={{ m: 1, width: "25ch" }}
                />{" "}
                <label htmlFor="description" className="p-success">
                  Tender Description*
                </label>
              </span>
            </Grid>
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
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                required
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
              <span className="p-float-label">
                <InputTextarea
                required
                  className="mt-9 pt-5 w-7 h-5rem"
                  rows={5}
                  autoResize
                  onChange={formik.handleChange}
                  name="termsAndConditions"
                  value={formik.values.termsAndConditions}
                  autoFocus
                  id="termsAndConditions"
                />{" "}
                <label htmlFor="termsAndConditions">Terms And Conditions</label>
              </span>
            </Grid>
            <Grid item xs={6}>
              <span className="p-float-label">
                <Calendar
                required
                  className="mt-5 h-5rem w-7"
                  name="bidOpenOn"
                  max="2020-02-02"
                  min="2020-01-02"
                  id="bidOpenOn"
                  showTime={true}
							   	showSeconds={true}
                  minDate={new Date()}
                  value={formik.values.bidOpenOn}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  showIcon
                />
                <label htmlFor="bidOpenOn"> Opening Date</label>
              </span>
            </Grid>
            <Grid item xs={6}>
              <span className="p-float-label">
                <Calendar
                required
                  name="closingDate"
                  className="mt-5 h-5rem w-7"
                  // max="2020-02-02"
                  // min="2020-01-02"
                  showTime={true}
						  		showSeconds={true}
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
            <Grid item xs={6}>
              <div className="App mt-5 w-7 h-5rem">
                <Button variant="contained" component="label" color="primary">
                  <IoAddCircleOutline /> Upload Bid Document
                  <input
                    onInput={(e) => setSelectedFile(e.target.files[0])}
                    accept=".pdf"
                    type="file"
                    name="doc"
                    required
                    // hidden
                  />
                </Button>
              </div>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Stack
                sx={{ marginTop: "3rem" }}
                // alignItems="left"
                spacing={8}
                direction="row"
              >
                <Button
                  // size="large"
                  // variant="contained"
                  // color="primary"
                  className="p-button-success"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  // size="large"
                  className="p-button-warning"
                  type="reset"
                >
                  Clear
                </Button>
                <Button size="large" variant="contained" color="error">
                  Exit
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Div>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            margin: "2rem 0",
            padding: "2rem",
            background: "white",
            borderRadius: "1rem",
          }}
        ></Box>

        <Toast ref={toast} position="bottom-center" />
      </Container>
    </form>
      </Fieldset>
  );
};
const handleForm = (e) => {
  e.preventDefault();
  console.log(e.target[5].value);
};

const Div =styled.div`

min-width:450px;
margin-top: 2rem;
margin-bottom: 1.5rem;  

`;
const id = localStorage.getItem("whoId");
console.log("the id is ", id);
const formDatas = {
  title: null,
  description: null,
  number: null,
  type: null,
  creator: id,
  publishedDate: null,
  closingDate: null,
  bidOpenOn: null,
  termsAndConditions: null,
};
const mapStateToProps = (state) => {
  return {
    tenders: state.tenders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTenders: () => dispatch(fetchTender()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InputAdornments);
