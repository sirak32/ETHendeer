import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React from 'react'
import styled from 'styled-components';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import vid from '../videos/production .mp4'
import { MdGeneratingTokens } from 'react-icons/md';
import FileBase from 'react-file-base64'
import ParticlesBg from 'particles-bg';
// import axios from 'axios' 
// import base64 from 'base64topdf'
const Login = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);

  const [pdf,setPdf]=React.useState('')
  const navigate=useNavigate()
  React.useEffect(()=>{
    // axios.get('http://localhost:5001/files/8bbe0c2edba7923eef0d954284aed972.png')
    // .then((response)=>{
    //   setPdf(response.data)
    //   console.log(response)
    // })
    const tokens=localStorage.getItem('token')
    const r=localStorage.getItem('role')

    if(tokens!==null){
      setLogged(true)
      console.log('tokens ',tokens) 
      // navigate('/officer')

    }
    if(r==='officer')
    navigate('/officer')
    else if(r==='supplier')
    navigate('/supplier')
    else if(r==='admin')
    navigate('/admin')
    else{}
    
  },[])

  const form=document.getElementById("np")
  // const formData=new FormData(form)
  const [logged,setLogged]=React.useState(true)
    const [role,setRole]=React.useState('')
    const [type, setType] = React.useState("");
    const [values, setValues] = React.useState({
      username: "",
      password: "",
      showPassword: false, 
    });
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
        axios.get('http://localhost:5001/tenders')
.then((result)=>{
  setPdf(result)
})
        if(response.data.succes){
          setLogged(true)
localStorage.setItem('token', response.data.token);
localStorage.setItem('whoId', response.data.user);
localStorage.setItem('role',response.data.role)
localStorage.setItem('user',response.data.username)
setRole(response.data.role)
        }
        else {
          setLogged(false)
        }
      })
      .catch((e)=>{
        alert('Connection Error : Please Ckeck your Connection')
        console.log(e.response.status)
      })

      }

      const doc=""

  return (
      <>
    <form onSubmit={handleSubmit}>
          {(role==='officer')&& navigate('/officer')}
          {(role==='admin')&& navigate('/admin')}
          {(role==='supplier')&& navigate('/supplier')}
          <ParticlesBg type='circle' bg={true} color={'#c9b42c'} />
              <Container >
    <Wrapper>
        <TextField 
                sx={{ m: 1, width: "15vw" }}
                onChange={handleChange("username")}
                
                name="userName"
                color="success"
                label="Enter User Name"
                />{" "}
          <FormControl sx={{ m: 1, width: "15vw" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
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
              {!logged&& <Alert severity="error">Incorrect Username or Password</Alert>}
          <Button type='submit' sx={{width:'15vw'}} color='primary' variant='contained' size='large'> Login</Button>
          <Button href='/' type='button' sx={{width:'15vw'}} color='success' variant='contained' size='large'> Back to Home</Button>

    </Wrapper>
              </Container>
                        </form>




                        {/* <form
                        onSubmit={((e)=>{
                          e.preventDefault()
                          const data = new FormData()
                          data.append("doc", selectedFile);
                          console.log("the cuty i=of ",data)
                          axios.post('http://localhost:5001/upload',data,

                          )
                        })}
                        >  
                        </form> */}
                        </>
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

