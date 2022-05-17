import styled from "styled-components";
// import Button from "./components/Button";
// import Icon from "./components/Icon";
// import Input from "./components/Input";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Container } from "@mui/material";
import axios from "axios";
function App() {
    
  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";
  return (
    <Container maxWidth="sm">
    <MainContainer>
      <WelcomeText>Welcome</WelcomeText>
      <form onSubmit={loginApi} method='post' action="http://localhost:5001/supplier-login">

      <InputContainer>
        <Input name="username" type="text" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
      </InputContainer>
      <ButtonContainer>
        <Button content="Sign Up" />
      </ButtonContainer>
      <LoginWith>OR LOGIN WITH</LoginWith>
      <HorizontalRule />
      <IconsContainer>
        <Icon color={FacebookBackground}>
          <FaFacebookF />
        </Icon> 
        <Icon color={InstagramBackground}>
          <FaInstagram />
        </Icon>
        <Icon color={TwitterBackground}>
          <FaTwitter />
        </Icon>
      </IconsContainer>
      <ForgotPassword>Forgot Password ?</ForgotPassword>
      </form>
    </MainContainer>
    </Container>

  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  padding:1rem;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.h5`
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

const ForgotPassword = styled.h4`
  cursor: pointer;
`;
const StyledButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
`;
function Button({ content }) {
    return <StyledButton>{content}</StyledButton>;
  }
  function Icon({ color, children }) {
    return <StyledIcon background={color}>{children}</StyledIcon>;
  }
  
  const StyledIcon = styled.div`
    height: 3.5rem;
    width: 3.5rem;
    background: ${(props) => props.background};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4rem;
    color: white;
    cursor: pointer;
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  `;
  function Input({ type, placeholder }) {
    return <StyledInput type={type} placeholder={placeholder} />;
  }
  
  const StyledInput = styled.input`
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border-radius: 2rem;
    width: 80%;
    height: 3rem;
    padding: 1rem;
    margin: 1rem;

    border: none;
    outline: none;
    color: #3c354e;
    font-size: 1rem;
    font-weight: bold;
    &:focus {
      display: inline-block;
      box-shadow: 0 0 0 0.2rem #b9abe0;
      backdrop-filter: blur(12rem);
      border-radius: 2rem;
    }
    &::placeholder {
      color: #b9abe099;
      font-weight: 100;
      font-size: 1rem;
    }
  `;

  const loginApi=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:5001/supplier-login', {
        username: e.target[0].value,
        password: e.target[1].value,
      })
      .then(function (response) {
        console.log(response.status);
      })
      .catch((e)=>console.log(e.response.status))
    //   console.log(e.target[0].value,e.target[1].value)
  }
export default App;