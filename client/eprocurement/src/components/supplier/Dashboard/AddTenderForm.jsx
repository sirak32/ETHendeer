import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import BasicSelect from './BasicSelect';
import { Button, Stack, TextareaAutosize } from '@mui/material';
import {Grid } from '@mui/material'
export default function InputAdornments() {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
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
    <form onSubmit={handleForm} action='sdghfjgh'>
<Grid container spacing={2}>
  <Grid item xs={4}>
  <TextField
          color='success'
            label="Tender Title"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            
          />  </Grid>
  <Grid item xs={4}>
  <TextField
          color='success'
            label="Tender Number"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            
          />  </Grid>
  <Grid item xs={4}>
  <BasicSelect name='Tender Type'/>
  </Grid>
  <Grid item xs={4}>
  <BasicSelect name='Tender Catagory'/>
  </Grid>
  <Grid item xs={4}>
  <TextField
          color='success'
            label="Lot Number"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            
          />  </Grid>
  <Grid item xs={4}>
  <TextField
          color='success'
            label="Minimum Price"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            
          />  </Grid>
  <Grid item xs={4}>
  <TextField
          color='success'
            label="Bid Security Amount"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            
          />
 </Grid>
          <Grid item xs={4}>
          <TextField
          id="outlined-multiline-static"
          label="Terms And Conditions"
          multiline
          rows={4}
          defaultValue="Default Value"
        /> </Grid>
          <Grid item xs={4}>
  <TextField
          color='success'
            label="Bid Fee"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            
          />  </Grid>
          <Grid item xs={4}>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
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
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={values.amount}
              onChange={handleChange('amount')}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
            />
          </FormControl> </Grid>
          <Grid item xs={4}>
          <input value='Closing Date' type='date' max='2020-02-02' min='2020-01-02'/>
  </Grid>
  <Grid item xs={4}>
  <Stack   sx={{margin:'3rem'}} alignItems="left" spacing={15} direction="row">
        <Button size='large' variant='contained' color='primary' type='submit'>Submit</Button>
        <Button size='large' variant='contained' color='warning' type='reset'>Clear</Button>
        <Button size='large' variant='contained' color='error'>Exit</Button>
          </Stack> 
           </Grid>
  
  
</Grid>
      <Box sx={{ display: 'flex', flexWrap: 'wrap',margin:'2rem 0',padding:'2rem',background: "white",borderRadius:'1rem' }}>
        <div>
          
         
          
          <br/>

          
          
          
          
          
          
          
          
        </div>
        <div>
          
          
        </div>
        <div style={{ margin:'2rem'}}>
          
            

        </div>
      </Box>
    </form>
    );
}
const handleForm=(e)=>{
e.preventDefault()
console.log('dfhjkl')
}