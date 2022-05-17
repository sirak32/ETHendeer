import React,{useState} from 'react'
import styled from 'styled-components'
import { darkThemeColor, themeColor } from '../../../utils'
const TabGroup=()=>{
    const [active,setActive]=useState(types[0])
    const changeTab=(clicked)=>{
        setActive(types[types.indexOf(clicked)])
    }
    return (
        <>
            <ButtonGroup>
                {types.map(type=>(
                    <Tab
                    onClick={(e)=>{
                        console.log(e.target.value)
                        changeTab(e.target.value)
                    }}
                    key={type}
                    value={type}
                    active={active===type}
                    >{type}</Tab>
                ))}
            </ButtonGroup>
            <p/>
             <p>Your payment selection: {active} </p>
        </>
    )
}

const Tab = styled.button `
        font-size:1rem ;
        padding: 1rem 60px;
        cursor: pointer;
        opacity:0.7;
        background: white;
        border: 0;
        /* transition-delay: 10s; */
        outline:0;
        ${({active})=>
        active &&
        `
        border-bottom: 0.5rem  solid black;
        opacity: 1;
        `}
    @media screen and (min-width: 320px) and (max-width: 1080px) {

}
`;
const ButtonGroup = styled.div `
        width: 100%;
        display: flex;
        background: #000000;
        border-radius:0.5rem ;
    @media screen and (min-width: 320px) and (max-width: 1080px) {
        
        flex-direction: column;
        margin-bottom: 1rem;
  }

`;
const types=['Active Tenders','Closed Tenders','Add Tenders','Recent Tenders',]
export default TabGroup