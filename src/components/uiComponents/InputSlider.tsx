import React, { useEffect, useState } from 'react';
import { InputAdornment, Box, Grid, Slider, TextField, Tooltip, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiInputLabel-shrink, & fieldset': {
      fontSize: '1.1rem'
    }
  },
  tooltipContent: {
    fontSize: '1rem'
  },
  hoverableLabel: {
    textDecoration: 'underline',
    textDecorationStyle: 'dotted',
    textDecorationColor: theme.palette.primary.main,
    textUnderlineOffset: '3px'
  }
}));

const InputSlider = ({
  inputProperty,
  incrementBy = 1,
  label = 'Please provide a label',
  minValue = 0,
  maxValue = 1000,
  start = 0,
  inputAdornment = {},
  isCurrency = false,
  updateState,
  tooltipText,
  ...otherProps
}: {
  inputProperty: string;
  incrementBy?: number;
  label?: string;
  minValue?: number;
  maxValue?: number;
  inputAdornment?: { start?: string; end?: string };
  start?: number;
  isCurrency?: boolean;
  updateState?: Function;
  tooltipText?: string;
}) => {
  const styles = useStyles();
  const [value, setValue] = useState(start as number | string);

  const handleSliderChange = (event: Event, newValue: any) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const withoutCommas = event.target.value.replace(/,/g, '');
    if (Number(withoutCommas)) {
      setValue(Number(withoutCommas));
    } else if (event.target.value === '') {
      setValue(0);
    }
  };

  const handleBlur = () => {
    if (value < minValue) {
      setValue(minValue);
    } else if (value > maxValue) {
      setValue(maxValue);
    }
  };

  useEffect(() => {
    if (updateState) {
      updateState(inputProperty, value);
    }
  }, [value]);

  return (
    <Box sx={{ marginBottom: '.8rem' }}>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <TextField
            className={styles.root}
            id={inputProperty}
            sx={{ mb: 0.5 }}
            label={
              tooltipText ? (
                <Tooltip
                  title={<div className={styles.tooltipContent}>{tooltipText}</div>}
                  arrow
                  placement="right"
                >
                  <div className={styles.hoverableLabel}>{label}</div>
                </Tooltip>
              ) : (
                <div>{label}</div>
              )
            }
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
            value={typeof value === 'number' ? value : Number(value)}
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
