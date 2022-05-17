import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MdArrowDropDown } from 'react-icons/md';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: '100%'}}>
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
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='outlined'  size="small">Apply</Button>
        <Button size="small">See More <MdArrowDropDown /></Button>
      </CardActions>
    </Card>
  );
}
