import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdSpaceDashboard } from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { FaAddressCard, FaTaxi } from "react-icons/fa";
import { GiTwirlCenter } from "react-icons/gi";
import { BsFillChatTextFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import scrollreveal from "scrollreveal";
import { IoNavigateCircle } from 'react-icons/io5';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Login from './Login'
import { Table } from "@mui/material";
import { useNavigate } from "react-router";
export default function Sidebar(props) {
  const navigate=useNavigate()
  const [currentLink, setCurrentLink] = useState(props.active);
  const [navbarState, setNavbarState] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavbarState(false));
  const menus=['Dashboard','Officers','Suppliers','Account Setting']
  const llinks=['/admin','/admin-officer','/admin-supplier','/admin-profile']
  useEffect(() => {
    const sr = scrollreveal({ 
      origin: "left",
      distance: "80px",
      duration: 300,
      reset: false,
    });

    sr.reveal(
      `
          .brand,
          .links>ul>li:nth-of-type(1),
      .links>ul>li:nth-of-type(2),
      .links>ul>li:nth-of-type(3), 
      .links>ul>li:nth-of-type(4),
      .links>ul>li:nth-of-type(5),
      .links>ul>li:nth-of-type(6),
      .logout
      `,
      {
        opacity: 0,
        interval: 50,
      }
    );
  }, []);

  return (
    <>
      <Section>
        <div className="top">
          <div className="brand" style={{cursor:'pointer'}} onClick={()=>{
            navigate('/')
          }}>
            <IoNavigateCircle />
            <span>ETH-ender</span>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose style={{padding:'0rem 1.5rem'}}
              onClick={() => setNavbarState(false)} />
              ) : (
                <GiHamburgerMenu
                style={{padding:'0rem 1.5rem'}}
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarState(true);
                }}
                />
                )}
          </div>
          <div className="links">
            <ul>
              {menus.map((menI,i)=>(
                <li
                className={currentLink === i ? "active" : "none"}
                onClick={() => {
                  setCurrentLink(i)
                  navigate(llinks[i])
                }}
              >
                <a >
                  {iconChoose(i)}
                  <span> {menI}</span>
                </a>
              </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="logout" onClick={(()=>{
           
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('whoId')
            // navigate('/login')          
        })}>
          <a href="/login">
            <FiLogOut />
            <span className="logout">Logouts</span>
          </a>
        </div>
      </Section>
      <ResponsiveNav state={navbarState} className={navbarState ? "show" : ""}>
        <div className="responsive__links">
          <ul>
            <li key={1}
              className={currentLink === 1 ? "active" : "none"}
              onClick={() => setCurrentLink(1)}
              >
              <a href="#">
                <MdSpaceDashboard />
                <span> Dashboard</span>
              </a>
            </li>
            <li key={2}
              className={currentLink === 2 ? "active" : "none"}
              onClick={() => setCurrentLink(2)}
              >
              <a href="#">
                <RiDashboard2Fill />
                <span> Tenders</span>
              </a>
            </li>
            <li key={3}
              className={currentLink === 3 ? "active" : "none"}
              onClick={() => setCurrentLink(3)}
              >
              <a href="#">
                <FaAddressCard />
                <span> Suppliers</span>
              </a>
            </li>
            <li key={4}
              className={currentLink === 4 ? "active" : "none"}
              onClick={() => setCurrentLink(4)}
              >
              <a href="#">
                <Link to="/officer"></Link>
                <GiTwirlCenter />
                <span> Officers</span>
              </a>
            </li>
            <li key={5}
              className={currentLink === 5 ? "active" : "none"}
              onClick={() => setCurrentLink(5)}
              >
              <a href="#">
                <BsFillChatTextFill />
                <span> FAQs</span>
              </a>
            </li>
            <li key={6}
              className={currentLink === 6 ? "active" : "none"}
              onClick={() => setCurrentLink(6)}
              >
              <a href="#">
                <IoSettings />
                <span> Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </ResponsiveNav>
      </>
      
  );
}
const Section = styled.section`
position: fixed;
left: 0;
background-color: #212121;
height: 100vh;
width: 18vw;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
padding: 2rem 0;
gap: 2rem;
.top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    .toggle {
      display: none;
    }
    .brand {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      svg {
        color: #ffc107;
        font-size: 2rem;
      }
      span {
        font-size: 2rem;
        color: #ffc107;
        font-family: "Permanent Marker", cursive;
      }
    }
    .links {
      display: flex;
      justify-content: center;
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          &:hover {
            cursor:pointer;
            background-color: #ffc107;
            a {
              color: black;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
          }
        }
        .active {
          background-color: #ffc107;
          a {
            color: black;
          }
        }
      }
    }
  }

  .logout {
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    &:hover {
      background-color: #da0037;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: white;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  position: fixed;
  right: -10vw;
  top: 0;
  z-index: 10;
  background-color: black;
  height: 100vh;
  width: ${({ state }) => (state ? "60%" : "0%")};
  transition: 0.4s ease-in-out;
  display: flex;
  opacity: 0;
  visibility: hidden;
  padding: 1rem;
  .responsive__links {
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 3rem;
      li {
        padding: 0.6rem 1rem;
        border-radius: 0.6rem;
        &:hover {
          background-color: #ffc107;
          a {
            color: black;
          }
        }
        a {
          text-decoration: none;
          display: flex;
          gap: 1rem;
          color: white;
        }
      }
      .active {
        background-color: #ffc107;
        a {
          color: black;
        }
      }
    }
  }
`;

const iconChoose=(i)=>{
  switch (i) {
    case 0:
      return  <MdSpaceDashboard />
      break;
      case 1: 
        return <GiTwirlCenter />
        break;
        case 2:
      return <RiDashboard2Fill/> 
      break;
      case 3:
      return<FaAddressCard />
      break;
      case 4:
      return <IoSettings /> 
      break;
    default:
      break;
  }
}