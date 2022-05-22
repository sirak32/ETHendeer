import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MdArrowDropDown } from 'react-icons/md';
import { Stack } from '@mui/material';
import Modal from './Modal'
import { Link } from 'react-router-dom';
export default function MediaCard() {
  return (
      
    <Card sx={{ maxWidth: '33%'}}>
        
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
    </Card>
        
  );
}
