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
import Container from '@mui/material/Container'

export default function InputAdornments() {
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
      onSubmit={(e) => {
        e.preventDefault();
        axios.post("http://localhost:5001/tenders", formValues);
        console.log(formValues);
      }}
      action="sdghfjgh"
    >
      <Grid sx={{ background: "white", margin:'0 5rem ' }} container spacing={2}>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, title: e.target.value });
            }}
            name="FirstName"
            color="success"
            label="First name"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "30vh" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, number: e.target.value });
            }}
            name="middleName"
            color="success"
            label="Middle Name"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "30vh" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, description: e.target.value });
            }}
            name="last Name"
            color="success"
            label="Last Name"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "30vh" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
            type={"email"}
            onChange={(e) => {
              setFormValue({ ...formValues, description: e.target.value });
            }}
            name="Email"
            color="success"
            label="Email"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "30vh" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
            type={"phoneNumber"}
            onChange={(e) => {
              setFormValue({ ...formValues, description: e.target.value });
            }}
            name="phoneNumber"
            color="success"
            label="Phone Number"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "30vh" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, description: e.target.value });
            }}
            name="City"
            color="success"
            label="city"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "30vh" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, description: e.target.value });
            }}
            name="Subcity"
            color="success"
            label="Subcity"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "30vh" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, description: e.target.value });
            }}
            name="Wereda"
            color="success"
            label="Wereda"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "30vh" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, description: e.target.value });
            }}
            name="Kebele"
            color="success"
            label="Kebele"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "30vh" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, description: e.target.value });
            }}
            name="BusinessType"
            color="success"
            label="Business Type"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "30vh" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, description: e.target.value });
            }}
            name="TinNumber"
            color="success"
            label="Tin Number"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "30vh" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => {
              setFormValue({ ...formValues, description: e.target.value });
            }}
            name="Username"
            color="success"
            label="Username"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "30vh" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ m: 1, width: "30vh" }} variant="outlined">
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
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              sx={{ m: 1, width: "22ch" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gender"
              name="gender"
              onChange={(e) => {
                setFormValue({ ...formValues, type: e.target.value });
              }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
         
        </Grid>
        <Grid item xs={4}>
          
        </Grid>
      </Grid>
      <Container >
      <Stack
            sx={{ margin: "3rem" }}
            alignItems="center"
            spacing={7}
            direction="row"
          >
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              Done
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
              Cancel
            </Button>
          </Stack>
      </Container>
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

const formDatas = {
  title: null,
  description: null,
  number: null,
  type: null,
  catagory: null,
  lotNo: null,
  minPrice: null,
  publishedDate: null,
  closingDate: null,
  bidOpenOn: null,
  participationFee: null,
  bidSecurityAmount: null,
  termsAndConditions: null,
};
