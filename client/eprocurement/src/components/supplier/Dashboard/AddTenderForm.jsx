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
import axios from 'axios'
export default function InputAdornments() {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

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
    <form onSubmit={handleForm} action="sdghfjgh">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            name="title"
            color="success"
            label="Tender Title"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
          name="number"
            color="success"
            label="Tender Number"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
          name="description"
            color="success"
            label="Tender Description"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <BasicSelect type="type"  names="Tender Type" />
        </Grid>
        <Grid item xs={4}>
          <BasicSelect type="catagory" names="Tender Catagory" />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="lotNo"
            color="success"
            label="Lot Number"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="minPrice"
            color="success"
            label="Minimum Price"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="bidSecurityAmount"
            color="success"
            label="Bid Security Amount"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="termsAndConditions"
            // id="outlined-multiline-static"
            label="Terms And Conditions"
            multiline
            rows={4}
            defaultValue="Default Value"
          />{" "}
        </Grid>
        <Grid item xs={4}>
          <TextField
           name="participationFee"
            color="success"
            label="Bid participation Fee"
            // id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          />{" "}
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
          <input
            name="publishedDate"
            value="Closing Date"
            type="date"
            max="2020-02-02"
            min="2020-01-02"
          />
        </Grid>
        <Grid item xs={4}>
          <input
            name="closingDate"
            value="Closing Date"
            type="date"
            max="2020-02-02"
            min="2020-01-02"
          />
        </Grid>
        <Grid item xs={4}>
          <input
            name="bidOpenOn"
            value="Closing Date"
            type="date"
            max="2020-02-02"
            min="2020-01-02"
          />
        </Grid>
        
        
        <Grid item xs={4}>
          <Stack
            sx={{ margin: "3rem" }}
            alignItems="left"
            spacing={15}
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
      >
      </Box>
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
