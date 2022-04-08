import React, { useState } from 'react';
import { InputAdornment, Box, Grid, Slider, TextField } from '@mui/material';

const InputSlider = ({
  incrementBy = 1,
  label = 'Please provide a label',
  minValue = 0,
  maxValue = 1000,
  start = 0,
  inputAdornment = {},
  isCurrency = false,
  ...otherProps
}: {
  incrementBy?: number;
  label?: string;
  minValue?: number;
  maxValue?: number;
  inputAdornment?: { start?: string; end?: string };
  start?: number;
  isCurrency?: boolean;
}) => {
  const [value, setValue] = useState(start as number | string);

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
    <Box sx={{ width: 250, marginBottom: '.8rem' }}>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <TextField
            sx={{ mb: 0.5 }}
            label={label}
            value={value.toLocaleString()}
            onChange={handleInputChange}
            onBlur={handleBlur}
            fullWidth
            inputProps={{
              step: incrementBy,
              min: minValue,
              max: maxValue,
              'aria-labelledby': 'input-slider',
              pattern: '[0-9,]*'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{inputAdornment.start}</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">{inputAdornment.end}</InputAdornment>
            }}
          />
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={minValue}
            max={maxValue}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputSlider;