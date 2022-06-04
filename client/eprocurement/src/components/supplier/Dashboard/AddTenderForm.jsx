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
import { Button, Stack, TextareaAutosize } from "@mui/material";
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
const InputAdornments = ({ tenders, fetchTenders }) => {
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Tender Added Successfully', detail:'Tender Added Successfully Descriptions Here', life: 10000});
}

  useEffect(() => {
    // fetchTenders()
  }, []);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      number: "",
      type: "",
      creator: "6295f2a9d4ed395d1c862eb7",
      // publishedDate: null,
      closingDate: "null",
      bidOpenOn: "null",
      termsAndConditions: "",
      // catagory: "",
      // lotNo: "null",
      // minPrice: "",
      // participationFee: "",
      // bidSecurityAmount: "",
    },
    onSubmit: async (data) => {
      // e.preventDefault();
      const dat = new FormData();
      const publishedDate=new Date().toUTCString()
      dat.append("doc", selectedFile);
      const bidOpenOn= new Date(data.bidOpenOn).toUTCString()
      const closingDate=new Date(data.closingDate).toUTCString()
      // console.log("the expected",dat);
      // console.log("spreading ",{...data,creator:"tilikse",bidOpenOn,closingDate,publishedDate})

      // console.log("data",publishedDate)
//       let dateStr = "Fri Apr 20 2020 00:00:00 GMT+0530 (India Standard Time)"
// console.log(new Date(dateStr).toUTCString())
      await axios.post(
        "http://localhost:5001/upload",
        dat
      ).then(async(res)=>{
        console.log('upload success')
        const file=res.data
          await axios.post("http://localhost:5001/tenders/", {...data,creator:"datacreator",bidOpenOn,closingDate,publishedDate,document:file})
          .then(() => {
            // setNo('changed')
            showSuccess()
            formik.resetForm()
          });
        console.log(res.data)
      }).then(()=>fetchTenders());
      
      setFormValue(data);
      console.log("sent tenders", data);
    },
  });
  const [no, setNo] = React.useState("");
  const [type, setType] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [formValues, setFormValue] = React.useState(formDatas);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  console.log("testing the states without dispatching", tenders.tenders);
  return (
    <form
      // onSubmit={async (e) => {
      //   e.preventDefault();
      //   await axios
      //     .post("http://localhost:5001/tenders", formValues)
      //     .then(() => {
      //       // setNo('changed')
      //     });
      //   fetchTenders();
      //   console.log(formValues);
      // }}
      // action="sdghfjgh"
      onSubmit={formik.handleSubmit}
    >
      <Div className="card">
      <span className="p-float-label">
          <InputText
            className="p-float-label p-input-icon-right"
            onChange={formik.handleChange}
            name="title"
            id="title"
            color="success"
            label="Tender Title"
            value={formik.values.title}
            sx={{ m: 1, width: "25ch" }}
          />{" "}
        <label htmlFor="title" className='p-succes'>Title*</label>
      </span>
      <span className="p-float-label">

          <InputText
            onChange={formik.handleChange}
            className="mt-5 w-4"
            name="number"
            id="number"
            value={formik.values.number}
            color="success"
            label="Tender Number"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />
            <label htmlFor="number" className='p-success'>Tender Number*</label>
      </span>

      <span className="p-float-label">
        
          <InputText
            onChange={formik.handleChange}
            name="description"
            className="mt-5 w-4"
            id="description"
            color="success"
            value={formik.values.description}
            label="Tender Description"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />{" "}
                      <label htmlFor="description" className='p-success'>Tender Description*</label>

        </span>       
        
        
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              // sx={{ m: 1, width: "24.5ch" }}
              id="type"
              label="Type"
              // className="mt-5"x  x

              onChange={formik.handleChange}
              value={formik.values.type}
              name="type"
              // onChange={(e) => {
              //   setFormValue({ ...formValues, type: e.target.value });
              // }}
            >
              <MenuItem value="Direct">Goods</MenuItem>
              <MenuItem value="Service">Service</MenuItem>
              <MenuItem value="Construction Works">Construction Works</MenuItem>
              <MenuItem value="Consultancy">Consultancy</MenuItem>
            </Select>
          </FormControl>
        
        
          <span className="p-float-label">
            <InputTextarea
            className="mt-9 pt-5 w-4"
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
        
          <span className="p-float-label">
            <Calendar
              // onChange={(e) => {
              //   setFormValue({ ...formValues, closingDate: e.target.value });
              // }}
              className="mt-5"
              name="bidOpenOn"
              max="2020-02-02"
              min="2020-01-02"
              id="bidOpenOn"
              value={formik.values.bidOpenOn}
              onChange={formik.handleChange}
              dateFormat="dd/mm/yy"
              mask="99/99/9999"
              showIcon
            />
            <label htmlFor="bidOpenOn"> Opening Date</label>
          </span>
          <span className="p-float-label">
            <Calendar
              // onChange={(e) => {
              //   setFormValue({ ...formValues, closingDate: e.target.value });
              // }}
              name="closingDate"
              className="mt-5"

              // max="2020-02-02"
              // min="2020-01-02"
              id="closingDate"
              value={formik.values.closingDate}
              onChange={formik.handleChange}
              dateFormat="dd/mm/yy"
              mask="99/99/9999"
              showIcon
            />
            <label htmlFor="closingDate"> Closing Date</label>
          </span>
          <div className="App mt-5">
            <Button variant="contained" component="label" color="primary">
              {" "}
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
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
          <Stack
            sx={{ margin: "1rem" }}
            alignItems="left"
            spacing={8}
            direction="row"
          >
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
            <Button
              size="large"
              variant="contained"
              color="warning"
              type="reset"
            >
              Clear
            </Button>
            <Button size="large" variant="contained" color="error">
              Exit
            </Button>
          </Stack>
       
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
      
      <Toast ref={toast} />

    </form>
  );
};
const handleForm = (e) => {
  e.preventDefault();
  console.log(e.target[5].value);
  //   axios.post('http://localhost:5001/tenders',{
  //     title: e.target[0].value,
  //     description: e.target[2].value,
  //     number: e.target[1].value,
  //     type: e.target[3].value,
  //     catagory: e.target[4].value,
  //     lotNo: e.target[5].value,
  //     minPrice:e.target[6].value,
  //     publishedDate:e.target[11].value ,
  //     closingDate: e.target[12].value,
  //     bidOpenOn: e.target[13].value,
  //     participationFee: e.target[9].value,
  //     bidSecurityAmount: e.target[7].value,
  //     termsAndConditions: e.target[8].value,

  //   })
};
// const handleFormChange =(e)=>{
// setFormValue({
//   ...formDatas,

// })
// }
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
  // catagory: null,
  // lotNo: null,
  // minPrice: null,
  // participationFee: null,
  // bidSecurityAmount: null,
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
