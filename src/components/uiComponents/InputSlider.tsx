import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

const InputSlider = ({
  minValue = 0,
  maxValue = 20000,
  ...otherProps
}: {
  minValue?: number;
  maxValue?: number;
}) => {
  const [value, setValue] = useState(30 as number | string);

  const handleSliderChange = (event: Event, newValue: any) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < minValue) {
      setValue(minValue);
    } else if (value > maxValue) {
      setValue(maxValue);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextField
            label="Number of Connections"
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
            fullWidth
            inputProps={{
              step: 5,
              min: minValue || 0,
              max: maxValue || 1000,
              type: 'number',
              'aria-labelledby': 'input-slider'
            }}
          />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={minValue || 0}
            max={maxValue || 1000}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputSlider;
