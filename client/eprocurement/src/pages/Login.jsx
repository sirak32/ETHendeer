import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React from 'react'
import styled from 'styled-components';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import vid from '../videos/production .mp4'
import { MdGeneratingTokens } from 'react-icons/md';
const Login = () => {
  React.useEffect(()=>{
    const tokens=localStorage.getItem('token')
    if(tokens!==null){
      setLogged(true)
      console.log('tokens ',tokens) 
      // navigate('/officer')

    }
  },[])
  const [logged,setLogged]=React.useState()
    
    const [type, setType] = React.useState("");
    const [values, setValues] = React.useState({
        username: "",
        password: "",
        showPassword: false, 
      });
      const navigate=useNavigate()
    const handleTypeChange = (event) => {
      setType(event.target.value);
    };
    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values)
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      const handleSubmit=(e)=>{
          e.preventDefault();

    axios.post('http://localhost:5001/officer-login', {
        username: values.username,
        password: values.password
      })
      .then(function (response) {
          // <Navigate to='/officer'/>
        // alert(response.data.succes);
        if(response.data.succes){
setLogged(true)
alert(response.data.token);
localStorage.setItem('token', response.data.token);
          // navigate('/officer')
        }
        else {
          setLogged(false)

        }
        // window.location='http://localhost:3000/officer'
      })
      .catch((e)=>console.log(e.response.status))
    //  
        //   alert(`username - ${values.username} \npassword -  ${values.password}`)
        //   console.log(values.username)
      }
  return (
      <form onSubmit={handleSubmit}>
{/* <video  loop autoPlay>
        <source
          src={vid}
          type="video/mp4"
          />
        Your browser does not support the video tag. */}
          {/* </video> */}
          {logged&& navigate('/officer')}
      <Container>
    <Wrapper>
        <TextField 
                sx={{ m: 1, width: "15vw" }}
                onChange={handleChange("username")}
                
                name="userName"
                color="success"
                label="Enter User Name"
                // id="outlined-start-adornment"
                />{" "}
          <FormControl sx={{ m: 1, width: "15vw" }} variant="outlined">
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
              {!logged&& <Alert severity="error">Incorrect Credetials: Fill it Correctly</Alert>}
          <Button type='submit' sx={{width:'15vw'}} color='primary' variant='contained' size='large'> Login</Button>
    </Wrapper>
              </Container>
                        </form>
  )
}
const Wrapper=styled.div`
display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 50vw;
  gap:3rem;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  padding-top:10rem;
`;

const loginApi=(e)=>{
    //  console.log(e.target[0].value,e.target[1].value)
  }
export default Login

