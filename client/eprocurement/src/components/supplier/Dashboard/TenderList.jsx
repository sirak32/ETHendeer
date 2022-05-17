import React from 'react';
import { FiEdit } from 'react-icons/fi';
import styled from 'styled-components'

const Tenderlist = () => {
    return (
    <div>    <Container>
            {/* <h1>This is header 1</h1> */}
            <TenderNo>This is NUmber</TenderNo>
            <TenderNo>This is Name</TenderNo>
            <TenderNo>Opening Date</TenderNo>
            <TenderNo>Closing Date</TenderNo>
        </Container>
        <Container>
        <TenderNo>RF2030/45</TenderNo>
        <TenderNo>Steel Products</TenderNo>
        <TenderNo>Feb 01-22</TenderNo>
        <TenderNo>Mar 01-22</TenderNo>
        <TenderNo><Button><FiEdit/></Button> </TenderNo>



        </Container>
    </div>
    );
}

const Container=styled.div`
width: 100%;
margin: 1rem;
align-content:center;
display: flex;
/* height: 3.5rem; */
background: white;
justify-content:flex-start;
border-radius:0.5rem;
`;
const TenderNo=styled.div`

border-right:1rem;
padding:0.5rem 1rem;
border-radius:1rem;
`;
const Button=styled.button`
color: primary;
background: #01ff00;
border-radius:1rem;
`;


export default Tenderlist;
