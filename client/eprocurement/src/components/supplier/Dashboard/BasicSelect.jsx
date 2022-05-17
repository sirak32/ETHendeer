import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ maxWidth:'20rem' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.names}</InputLabel>
        <Select
        name={props.type}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Direct</MenuItem>
          <MenuItem value={20}>Limited</MenuItem>
          <MenuItem value={30}>Any Other</MenuItem>
          <MenuItem value={30}>Any Other</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
}


