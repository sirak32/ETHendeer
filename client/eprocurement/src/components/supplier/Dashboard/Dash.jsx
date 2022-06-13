import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import styled from 'styled-components';
// import React,{useState} from 'react'
export default function Dash(props) {
  // const [no,setNo]=useState(props.number)
  return (
    <Wrapper>
          <Card sx={{ maxWidth: 500  }}>
      <CardActionArea>
        <CardContent className={props.color}>
          <Typography  align='center' gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography className='text-white' align='center' variant="h1" color="text.secondary">
          {props.number}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions >
        <Button size="small" color="primary">
          More
        </Button>
      </CardActions> */}
    </Card>
    </Wrapper>
  )
}
const Wrapper=styled.div`
background-color:blue;
width :15rem;
border-radius:21rem;
`;