import React, { useState } from 'react';
import { Box, TextField, MenuItem, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DropdownProps } from '../../util/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
  boxContainer: {
    '&:hover': {
      '&& fieldset': {
        border: '2px solid',
        borderColor: theme.palette.primary.dark
      }
    }
  },
  MuiList: {
    root: {
      backgroundColor: 'orange'
    }
  },
  MuiPaper: {
    popover: {
      backgroundColor: 'orange'
    }
  },
  selectItem: {
    backgroundColor: theme.palette.background.default
  }
}));

const Dropdown = ({ dropdownLabel, dropdownPlaceholder, dropdownOptions }: DropdownProps) => {
  const selectData = dropdownOptions;
  const classes = useStyles();
  const [value, setValue] = useState('' as string);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <Box component="form" className={classes.boxContainer}>
      <TextField
        select
        InputLabelProps={{ shrink: true }}
        label={dropdownLabel}
        value={value}
        onChange={handleChange}
        variant="outlined"
        SelectProps={{
          displayEmpty: true,
          MenuProps: { classes: { paper: classes.selectItem } }
        }}
        fullWidth
      >
        <MenuItem disabled value="">
          <em>{dropdownPlaceholder}</em>
        </MenuItem>
        {selectData.map((option: any, index: number) => {
          option.id = index;
          return (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          );
        })}
      </TextField>
    </Box>
  );
};

export default Dropdown;
