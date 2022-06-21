
import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
// import './AccordionDemo.css';

export const AccordionDemo = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onClick = (itemIndex) => {
        let _activeIndex = activeIndex ? [...activeIndex] : [];

        if (_activeIndex.length === 0) {
            _activeIndex.push(itemIndex);
        }
        else {
            const index = _activeIndex.indexOf(itemIndex);
            if (index === -1) {
                _activeIndex.push(itemIndex);
            }
            else {
                _activeIndex.splice(index, 1);
            }
        }

        setActiveIndex(_activeIndex);
    }

    return (
        <Container >

        <div className="accordion-demo ">
            <div className="card">
                <center> <h3 className='align-self-center'>Manual for Officer</h3></center>
                <center> <h6 className='align-self-center'>How to post a tender?</h6></center>

                <Accordion activeIndex={0}>
                <AccordionTab header={<p className='text-2xl'>Step 1</p>}>
                        <p className='text-2xl'>
1. First open your Dashboard.
</p>
                    </AccordionTab>
                    <AccordionTab header={<p className='text-2xl'>Step 2</p>}>
                        <p className='text-2xl'>2. Click on add tender tab.</p>
                    </AccordionTab>
                    <AccordionTab header={<p className='text-2xl'>Step 3</p>}>
                        <p className='text-2xl'>3. Fill tender information on the form with valid data.</p>
                    </AccordionTab>
                    <AccordionTab header={<p className='text-2xl'>Step 4</p>}>
                        <p className='text-2xl'>4. Attach bid document on attachment button.</p>
                    </AccordionTab>
                    <AccordionTab header={<p className='text-2xl'>Step 4</p>}>
                        <p className='text-2xl'>5. Click on "Submit" button. </p>
                    </AccordionTab>
                    <AccordionTab header={<p className='text-2xl'>Step 4</p>}>
                        <p className='text-2xl'>6. Check it on my tenders tab.</p>
                    </AccordionTab>
                </Accordion>
                
            </div>
        </div>
      <center>
            <Link to={'/officer'} style={{textDecoration:'none'}}> 
        <Button label="Back to Home" className="p-button-success mt-4" />
            </Link>
        </center>
        </Container>
    )
}
                 