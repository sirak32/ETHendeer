import * as React from 'react';
// import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MdArrowDropDown } from 'react-icons/md';
import { Stack } from '@mui/material';
import Modal from './Modal'
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
export default function MediaCard() {
  const header = (
    <img alt="Card" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm8jXlLuWDxu2tZbT08S5ovq5rj5Tqi8LbTA&usqp=CAU" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
);
const footer = (
    <span>
        <Button label="Apply" icon="pi pi-check" onClick={(()=>{setVis(true)})} />
        <Button label="See Detail" icon="pi pi-chevron-circle-down" className="p-button-secondary ml-2"  onClick={(()=>{setVis2(true)})}/>
    </span>

);
const [vis,setVis]=useState(false)
const [vis2,setVis2]=useState(false)

  return (
    <>
    {/* <Card sx={{ maxWidth: '33%'}}>
        
      <CardMedia
        component="img"
        height="140"
        image="https://picsum.photos/id/10/2500/1667"
        alt="green iguana"
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          ብረታ ብረት
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Link to='/apply' >
        <Button sx={{margin:'1rem'}} variant='outlined'  size="small">Apply</Button>
        </Link>
        <Modal><MdArrowDropDown /></Modal> 
      </CardActions>
    </Card> */}
    <div>

            <Card title="ብረታ ብረት" subTitle="Subtitle" style={{ width: '25em' }} footer={footer} header={header}>
                <p className="m-0" style={{lineHeight: '1.5'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                    quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </Card>

            <Dialog modal draggable={false} dismissableMask style={{width:'90rem',height:'300rem'}} visible={vis} onHide={(()=>{setVis(false)})}>
                Apply For This Tender Here 
            </Dialog>
            <Dialog modal draggable={false} dismissableMask style={{width:'90rem',height:'300rem'}} visible={vis2} onHide={(()=>{setVis2(false)})}>
                Tender Details Here
            </Dialog>


        </div>
    </>  
        
  );
}
