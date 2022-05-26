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
import { InputTextarea } from 'primereact/inputtextarea';
 

export default function InputAdornments({ tenders, fetchTenders }) {
  const [no, setNo] = React.useState("");
  const [type, setType] = React.useState("");

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

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await axios
          .post("http://localhost:5001/tenders", formValues)
          .then(() => {
            // setNo('changed')
          });
        fetchTenders();
        console.log(formValues);
      }}
      action="sdghfjgh"
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, title: e.target.value });
            }}
            name="title"
            color="success"
            label="Tender Title"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, number: e.target.value });
            }}
            name="number"
            color="success"
            label="Tender Number"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, description: e.target.value });
            }}
            name="description"
            color="success"
            label="Tender Description"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              sx={{ m: 1, width: "24.5ch" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
              name="type"
              onChange={(e) => {
                setFormValue({ ...formValues, type: e.target.value });
              }}
            >
              <MenuItem value="Direct">Direct</MenuItem>
              <MenuItem value="Direct">Direct</MenuItem>
              <MenuItem value="Direct">Direct</MenuItem>
              <MenuItem value="Direct">Direct</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Catagory</InputLabel>
            <Select
              sx={{ m: 1, width: "24.5ch" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Catagory"
              name="catagory"
              onChange={(e) => {
                setFormValue({ ...formValues, catagory: e.target.value });
              }}
            >
              <MenuItem value="Direct">Direct</MenuItem>
              <MenuItem value="Direct">Direct</MenuItem>
              <MenuItem value="Direct">Direct</MenuItem>
              <MenuItem value="Direct">Direct</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={4}></Grid> */}
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, lotNo: e.target.value });
            }}
            name="lotNo"
            color="success"
            label="Lot Number"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, minPrice: e.target.value });
            }}
            name="minPrice"
            color="success"
            label="Minimum Price"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <span className="p-float-label">
            <InputText
              onChange={(e) => {
                setFormValue({
                  ...formValues,
                  bidSecurityAmount: e.target.value,
                });
              }}
              name="bidSecurityAmount"
              id="bidSecurityAmount"
              autoFocus
              color="success"
              label="Bid Security Amount"
              // id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
            />
            <label htmlFor="bidSecurityAmount">Bid Security Amount*</label>
          </span>
        </Grid>
        <Grid item xs={4}>
        <span className="p-float-label">

          <InputTextarea
          rows={5}
          autoResize
            onChange={(e) => {
              setFormValue({
                ...formValues,
                termsAndConditions: e.target.value,
              });
            }}
            name="termsAndConditions"
            // id="outlined-multiline-static"
            autoFocus
            id="termsAndConditions"
            />{" "}
                        <label htmlFor="termsAndConditions">Terms And Conditions</label>

            </span>
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, participationFee: e.target.value });
            }}
            name="participationFee"
            color="success"
            label="Bid participation Fee"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <div className="App">
            <Button variant="contained" component="label" color="primary">
              {" "}
              <IoAddCircleOutline /> Upload Bid Document
              <input accept=".pdf" type="file" hidden />
            </Button>
          </div>
        </Grid>

        <Grid item xs={4}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              //   id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          {/* <input
            onChange={(e) => {
              setFormValue({ ...formValues, publishedDate: e.target.value });
            }}
            name="publishedDate"
            type="date"
            max="2020-02-02"
            min="2020-01-02"
            
          /> */}
        </Grid>
        <Grid item xs={4}>
          <span className="p-float-label">
            <Calendar
              onChange={(e) => {
                setFormValue({ ...formValues, closingDate: e.target.value });
              }}
              name="bidOpenOn"
              max="2020-02-02"
              min="2020-01-02"
              id="bidOpenOn"
              // value={formik.values.date}
              // onChange={formik.handleChange}
              dateFormat="dd/mm/yy"
              mask="99/99/9999"
              showIcon
            />
            <label htmlFor="bidOpenOn"> Opening Date</label>
          </span>
        </Grid>
        <Grid item xs={4}>
          <span className="p-float-label">
            <Calendar
              onChange={(e) => {
                setFormValue({ ...formValues, closingDate: e.target.value });
              }}
              name="closingDate"
              max="2020-02-02"
              min="2020-01-02"
              id="closingDate"
              // value={formik.values.date}
              // onChange={formik.handleChange}
              dateFormat="dd/mm/yy"
              mask="99/99/9999"
              showIcon
            />
            <label htmlFor="closingDate"> Closing Date</label>
          </span>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
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
        </Grid>
      </Grid>
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
    </form>
  );
}
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
const id = localStorage.getItem("whoId");
console.log("the id is ", id);
const formDatas = {
  title: null,
  description: null,
  number: null,
  type: null,
  catagory: null,
  lotNo: null,
  minPrice: null,
  creator: id,
  publishedDate: null,
  closingDate: null,
  bidOpenOn: null,
  participationFee: null,
  bidSecurityAmount: null,
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
